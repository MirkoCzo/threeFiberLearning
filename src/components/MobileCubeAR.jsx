import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three';
import { OrbitControls } from "@react-three/drei";
import { ARButton, Controllers, Hands, RayGrab, XR } from '@react-three/xr';

const RotatingResizingCube = ({ texture, rotation, scale, position }) => {
  const meshRef = useRef();
  

  useFrame(() => {
    meshRef.current.rotation.x = rotation.x;
    meshRef.current.rotation.y = rotation.y;
    meshRef.current.scale.set(scale, scale, scale);
    meshRef.current.position.set(position.x, position.y, position.z);
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const MobileCubeAR = () => {
  const texture = useLoader(TextureLoader, '/diamond_ore.png');
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [lastTouch, setLastTouch] = useState({});
  const [isCubeGrabbed, setIsCubeGrabbed] = useState(false);
  const doubleTapDelay = 300;
  const [doubleTapMessage, setDoubleTapMessage] = useState("");

  const handleTouchStart = (event) => {
    const now = new Date().getTime();
    if (event.touches.length === 1 && lastTouch.time && (now - lastTouch.time < doubleTapDelay)) {
      setIsCubeGrabbed(!isCubeGrabbed);
      setDoubleTapMessage(isCubeGrabbed ? "" : "Double Tap Activé!");
    } else {
      setLastTouch({
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
        time: now,
      });
    }
  };

  const handleTouchMove = (event) => {
    // Détecte le nombre de doigts sur l'écran
    if (event.touches.length === 1) {
        const touch = event.touches[0];
        if (isCubeGrabbed) {
            // Gère le déplacement du cube
            const dx = (touch.pageX - lastTouch.x) * 0.01;
            const dy = (lastTouch.y - touch.pageY) * 0.01; // Inversion pour correspondre à l'axe Y
            setPosition(prev => ({
                ...prev,
                x: prev.x + dx,
                y: prev.y + dy,
            }));
        } else {
            // Gère la rotation du cube
            const deltaRotation = {
                x: (touch.pageY - lastTouch.y) * 0.01, // Rotation autour de l'axe X basée sur le mouvement vertical
                y: (touch.pageX - lastTouch.x) * 0.01, // Rotation autour de l'axe Y basée sur le mouvement horizontal
            };
            setRotation(prevRotation => ({
                x: prevRotation.x + deltaRotation.x,
                y: prevRotation.y + deltaRotation.y,
            }));
        }
        // Mise à jour des coordonnées pour le prochain mouvement
        setLastTouch({ x: touch.pageX, y: touch.pageY });
    } else if (event.touches.length === 2) {
        // Gère le redimensionnement du cube avec deux doigts
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const newDistance = Math.sqrt(
            Math.pow(touch1.pageX - touch2.pageX, 2) +
            Math.pow(touch1.pageY - touch2.pageY, 2)
        );
        if (lastTouch.distance) {
            const scaleChange = (newDistance - lastTouch.distance) * 0.001; // Ajustez la sensibilité si nécessaire
            setScale(prevScale => Math.max(0.1, prevScale + scaleChange));
        }
        // Mise à jour de la distance pour le prochain mouvement
        setLastTouch({ ...lastTouch, distance: newDistance });
    }
};


  const handleTouchEnd = () => {
      setIsCubeGrabbed(false);
      setDoubleTapMessage("");
  };

  const reset = () => {
    setPosition({ x: 0, y: 0, z: 0 });
    setScale(1);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div>
      <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <ARButton />
        <Canvas style={{ width: '100vw', height: '75vh' }}>
          <OrbitControls/>
          <XR>
            <Controllers rayMaterial={{color:"blue"}}/>
            <Hands/>
            <ambientLight/>
            <RayGrab>
            <RotatingResizingCube position={position} texture={texture} rotation={rotation} scale={scale} />
            </RayGrab>
          </XR>
        </Canvas>
        <div style={{ textAlign: 'center' }}>
          <button onClick={reset}>Réinitialiser le Cube</button>
          {doubleTapMessage && <p>{doubleTapMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default MobileCubeAR;
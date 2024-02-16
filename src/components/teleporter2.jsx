import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ARCanvas, ARButton, XR, VRButton, Hands } from '@react-three/xr';
import { useEffect, useRef, useState } from 'react';
import { Box, Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";

const ButtonVR = ({ position, onClick, buttonText }) => {
  return (
    <Interactive onSelect={onClick}>
      <mesh position={position}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
      <Text position={[position[0], position[1] + 0.3, position[2]]} anchorX="center" anchorY="middle" fontSize={0.05}>
        {buttonText}
      </Text>
    </Interactive>
  );
};

const Navbar = ({ children }) => {
  const ref = useRef();
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.position.x = camera.position.x;
      ref.current.position.y = camera.position.y;
      ref.current.position.z = camera.position.z -0.38; // Ajustez cette valeur pour que la barre de navigation soit toujours devant la caméra
    }
  });

  return (
    <group ref={ref}>
      {children}
    </group>
  );
};

const Image360 = () => {
  const [imageUrl, setImageUrl] = useState("/salon2.jpg");

  const handleButtonClick = (url) => {
    setImageUrl(url);
  };

  return (
    <>
      <VRButton sessionInit={{ optionalFeatures:  ['hand-tracking']}}/>
      <Canvas>
        <XR>
          <Hands/>
          <ambientLight />
          <ImageAR url={imageUrl} />
          <Navbar>
            <ButtonVR position={[-0.3, -0.2, 0]} onClick={() => handleButtonClick("/salon.jpg")} buttonText="TP Salon"/>
            <ButtonVR position={[0, -0.2, 0]} onClick={() => handleButtonClick("/plage.jpg")} buttonText="TP Plage"/>
            <ButtonVR position={[0.3, -0.2, 0]} onClick={() => handleButtonClick("/montagne.jpg")} buttonText="TP Montagne"/>
          </Navbar>
        </XR>
      </Canvas>
    </>
  );
};

const ImageAR = ({ url }) => {
  const texture = new THREE.TextureLoader().load(url);

  return (
    <mesh>
      <sphereGeometry args={[5, 40, 40]} attach="geometry" />
      <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

export default Image360;

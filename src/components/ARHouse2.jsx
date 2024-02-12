import { useGLTF,Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ARButton, XR, useHitTest } from "@react-three/xr";
import React, { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from 'three'; 

const Model = ({ scale, rotation, position }) => {
  const model = useGLTF("/house.glb");
  const modelRef = useRef();
  const { camera } = useThree();
  const [hitPosition, setHitPosition] = useState(null); // État pour stocker les coordonnées du point touché

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = rotation.x;
      modelRef.current.rotation.y = rotation.y;
      modelRef.current.position.set(position.x, position.y, position.z);
      modelRef.current.scale.set(scale, scale, scale);
    }
  });
  useHitTest((hitMatrix, hit) => {
    if (hit && modelRef.current) {
      const newHitPosition = new THREE.Vector3();
    
      // Copy position from hitMatrix to update modelRef position
      newHitPosition.setFromMatrixPosition(hitMatrix);
      
      // Set the position of the modelRef to match the hit object
      modelRef.current.position.copy(newHitPosition);
    
      setHitPosition(newHitPosition);
    }
  });
  
  
  
  
  
  return (
    <>
      {hitPosition && (
        <Text
          position={[1,2,-3]} 
          fontSize={0.3} // Adjust font size as needed
          color="green"
          anchorX="middle"
          anchorY="middle"
        >
          Hit Position: {hitPosition.x.toFixed(2)}, {hitPosition.y.toFixed(2)}, {hitPosition.z.toFixed(2)}
        </Text>
      )}

      <primitive
        ref={modelRef}
        object={model.scene}
        scale={scale}
        rotation={[rotation.x, rotation.y, rotation.z]}
        position={position}
      />
    </>
    
  );
};

const ARHouse2 = () => {
  const [scale, setScale] = useState(0.13);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 1, z: -3 });

  return (
    <>
      <ARButton />
      <Canvas style={{ width: "100vh", height: "75vh" }} sessioninit={{ requiredFeatures: ['hit-test', 'plane-detection', 'vertical-plane-detection']  }}>
        <XR>
          <ambientLight intensity={0.8}/>
          <Model scale={scale} rotation={rotation} position={position} />
        </XR>
      </Canvas>
    </>
  );
};

export default ARHouse2;

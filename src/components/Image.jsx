import * as THREE from 'three';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { ARCanvas, ARButton, XR } from '@react-three/xr';
import { useXREvent } from '@react-three/xr/dist/XREvents';
import { useState } from 'react';


const ImageAR = ({ url, position, scale }) => {
  const texture = new THREE.TextureLoader().load(url);
  
  return (
    <>
    <mesh position={position} scale={scale}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
    </mesh>
    </>
    
  );
};

const Image = () => {

  return (
    <>
      <ARButton />
        <>
        <Canvas>
          <XR>
          <ambientLight />
          <ImageAR url="/diamond_ore.png" position={[0, 0, -1]} scale={[0.5, 0.5, 0.5]} />
          </XR>
        </Canvas>
        </>
    </>
  );
};

export default Image;

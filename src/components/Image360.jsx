import * as THREE from 'three';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { ARCanvas, ARButton, XR, Hands } from '@react-three/xr';
import { useXREvent } from '@react-three/xr/dist/XREvents';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Image360 = () => {
  return (
    <>
      <ARButton />
      <Canvas>
        <XR>
        <Hands/>
          <ambientLight />
          <ImageAR url="/salon2.jpg" />
        </XR>
      </Canvas>
    </>
  );
};

const ImageAR = ({ url }) => {
  const texture = new THREE.TextureLoader().load(url);

  return (
    <>
      <mesh>
        <sphereGeometry args={[5, 40, 40]} attach="geometry" />
        <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
      </mesh>
    </>
  );
};

export default Image360;

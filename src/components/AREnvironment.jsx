import React, { useState } from "react";
import { Environment, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { Controllers, Hands, Interactive, VRButton, XR } from "@react-three/xr";

const ButtonVR = ({ position, onClick, buttonText }) => {
  return (
    <Interactive onSelect={onClick}>
        <mesh position={position} >
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshStandardMaterial color={"red"} />
      </mesh>
      <Text position={[position[0], position[1] + 0.3, position[2]]} anchorX="center" anchorY="middle" fontSize={0.05}>
        {buttonText}
      </Text>
    </Interactive>
    
  );
};

function AREnvironment({ url }) {
  if (url) {
    return (
      <Environment background files={url} />
    );
  }
}

const SwitchEnvironment = () => {
  const [backGroundImage, setBackGroundImage] = useState('/golden_bay_2k.hdr');

  const switchButton = (url) => {
    setBackGroundImage(url);
  }

  return (
    <>
      <VRButton/>
      <Canvas>
        <XR>
          <AREnvironment url={backGroundImage} />
          <Controllers/>
          <ButtonVR position={[-0.3, 1 , -0.2]} onClick={() => switchButton("/bathroom.hdr")} buttonText="TP SDB" />
          <ButtonVR position={[0, 1, -0.2]} onClick={() => switchButton("/cave.hdr")} buttonText="TP cave" />
        </XR>
      </Canvas>
    </>
  );
}

export default SwitchEnvironment;

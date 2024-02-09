import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ARButton, XR, useHitTest } from "@react-three/xr";
import React, { useEffect, useRef,useState } from "react";
import { useThree } from "@react-three/fiber";


const Model = ({ scale, rotation, position }) => {
  const model = useGLTF("/SecondModifiedBatiment.gltf");
  const modelRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = rotation.x;
      modelRef.current.rotation.y = rotation.y;
      modelRef.current.position.set(position.x,position.y,position.z);
      modelRef.current.scale.set(scale,scale,scale);
    }
  });
  // let hitPoint = modelRef;
  // useHitTest((hitMatrix, hit)=>{
  //   hitMatrix.decompose(
  //     hitPoint.current.position,
  //     hitPoint.current.rotation,
  //     hitPoint.current.scale,
  //   )
  // })

  return (
    <primitive
      ref={modelRef}
      object={model.scene}
      scale={scale}
      rotation={[rotation.x, rotation.y, rotation.z]}
      position={position}
    />
  );
};


const ARHouse = () => {
  // Définition de l'état pour la mise à l'échelle, la rotation, et la position
  const [scale, setScale] = useState(0.1);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 1, z: -1 });



  return (
    <>
      <ARButton />
        <Canvas style={{width:"100vh", height:"75vh"}} sessioninit={{requiredFeatures: ['hit-test']}}>
            <XR>
                <ambientLight intensity={0.8}/>
                <directionalLight intensity={2} color={"white"}/>
                    <Model scale={scale} rotation={rotation} position={position} />
                    <directionalLight intensity={2} color={"white"}/>

            </XR>
        </Canvas>
    </>
  );
};

export default ARHouse;

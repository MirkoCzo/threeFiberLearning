import { ScrollControls, Scroll, useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from 'react';

function CameraPositioner(){
    const {camera} = useThree();

    camera.position.set(0,10,10);

    camera.lookAt(0,0,0);
    return null;
}

const ScrollScene = () =>{
    const model = useGLTF("/SecondModifiedBatiment.gltf");
    console.log(model);
    const model2 = useGLTF("/canette/canette.gltf");
    console.log(model2);
    const canetteRef = useRef();

    return(
        <Canvas style={{ height: '100vh' }}>
            <CameraPositioner/>
            <ScrollControls pages={3}>
                <Scroll>
                <pointLight position={[0, -2, 0]} intensity={18} color={"white"} />
                <pointLight position={[0, -11, 1]} intensity={13} color={"white"} />
                <pointLight position={[-1, -11, 1]} intensity={13} color={"white"} />
                <pointLight position={[1, -11, 1]} intensity={13} color={"white"} />
                <ambientLight intensity={1}/>
                  <primitive object={model.scene} position={[0,-2,-5]}/>
                  <primitive object={model2.scene} position={[0,-12,0]} scale={[10,10,10]} rotation={[0,Math.PI,0]}/>
                </Scroll>
                <Scroll html style={{height:"100%",width:"100%"}}>
                <h1>Ma Première maison</h1>
                <h1 style={{position: "absolute" ,top:"150vh", display:"inline-block", left:"50vh"}}>Mes canettes</h1>
                </Scroll>
            </ScrollControls>
        </Canvas>
        
    )
}
export default ScrollScene;
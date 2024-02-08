import React, { useRef } from "react";
import { Canvas, useFrame, useLoader} from "@react-three/fiber";
import { TextureLoader } from 'three';
import { Link } from "react-router-dom";



const Sphere = ({ position, texture }) => {
    const meshRef = useRef();

    useFrame(() => {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[4, 32, 32]} />
            <meshStandardMaterial map={texture}/>
        </mesh>
    );
};


const SphereContainer = ({ position, color }) => {
    const texture = useLoader(TextureLoader, '/football.jpg');
    return (
        <div style={{textAlign : 'center'}}>
            <h1 style={{ textAlign: 'center' }}>My Football Ball</h1>
            <Canvas style={{ width: '100vw', height: '75vh' }}>
                <ambientLight intensity={0.5} />
                <Sphere position={position} texture={texture} />
            </Canvas>
            <Link to="/"><button>Back to Cube</button></Link>
        </div>
       
        
        
    );
};

export default SphereContainer;

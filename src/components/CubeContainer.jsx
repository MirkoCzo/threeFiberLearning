import React, { useRef, useState } from 'react';
import { OrbitControls} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber"; // Ajout de useLoader ici
import { TextureLoader } from 'three';
import { Link } from "react-router-dom";




const RotatingCube = ({ isRotating, texture }) => {
    const meshRef = useRef();


    useFrame(() => {
        if (isRotating) {
            // meshRef.current.rotation.x += 0.01;
            // meshRef.current.rotation.y += 0.01;
        }
    });

    

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2, 2, 2]}/>
            <meshStandardMaterial map={texture}/>
        </mesh>
    );
};

const CubeContainer = () => {
    const texture = useLoader(TextureLoader, '/diamond_ore.png');
    const [isRotating, setIsRotating] = useState(true);

    return (
    
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ textAlign: 'center' }}>My Diamond Cube</h1>
                <Canvas style={{ width: '100vw', height: '75vh' }}>
                    <OrbitControls/>
                    {/*<ambientLight />*/}
                    <directionalLight position={[0,0,2]}/>
                    <RotatingCube isRotating={isRotating} texture={texture}/>
                </Canvas>
                <button onClick={() => setIsRotating(!isRotating)} style={{ marginTop: '20px' }}>
                    {isRotating ? 'Pause' : 'Resume'}
                </button>
                <Link to="/"><button>Go to AR Cube</button></Link>
                <Link to="/sphere"><button>Go to Sphere</button></Link>
        </div>
    );
}

export default CubeContainer;

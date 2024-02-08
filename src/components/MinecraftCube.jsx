import { useLoader, Canvas } from "@react-three/fiber";
import { TextureLoader } from 'three';


const MinecraftCube = () =>{
    const texture = useLoader(TextureLoader,'/diamond_ore.png');
    return (

        <mesh>
            <ambientLight/>
            <boxGeometry />
            <meshStandardMaterial map={texture} />
        </mesh>
    

        
    );

}
export default MinecraftCube;
import { Grid, CameraControls } from "@react-three/drei";
import { useRef } from "react";
import {Canvas} from "@react-three/fiber";
import { button,buttonGroup,useControls } from "leva";
import * as THREE from "three";
const CubeGrid = () =>{
    const cameraControlRef = useRef();

    const {DEG2RAD} = THREE.MathUtils;
    console.log(DEG2RAD);

    const cameraControls = useControls("Camera Controls",{
        horizontalRotation: buttonGroup({
            label: "Horizontal R",
            opts:{
                "45deg": () => cameraControlRef.current.rotate(45*DEG2RAD,0,true),
                "-90deg": () => cameraControlRef.current.rotate(-90*DEG2RAD,0,true),
                "360deg": () => cameraControlRef.current.rotate(360*DEG2RAD,0,true),
            },
        }),
        verticalRotation: buttonGroup({
            label: "Vertical R",
            opts:{
                "45deg": () => cameraControlRef.current.rotate(0,45*DEG2RAD,true),
                "-90deg": () => cameraControlRef.current.rotate(0,-90*DEG2RAD,true),
                "360deg": () => cameraControlRef.current.rotate(0,360*DEG2RAD,true),
            },
        }),
        truckGroup:buttonGroup({
            label:"Truck R",
            opts:{
                "Left": () => cameraControlRef.current.truck(-1,0,true),
                "Right": () => cameraControlRef.current.truck(1,0,true),
                "Up": () => cameraControlRef.current.truck(0,-1,true),
                "Down": () => cameraControlRef.current.truck(0,1,true)
            }
        }),
        Zoom: buttonGroup({
            "Zoom in":()=> cameraControlRef.current.zoom(0.25,true),
            "Zoom out":()=> cameraControlRef.current.zoom(-0.25,true),
        })
    });

    return(
        <Canvas style={{ width: '100vw', height: '75vh' }}>
        <Grid 
        args={[10,10]}
        />
        <CameraControls ref={cameraControlRef} smoothTime={0.25}/>

        <mesh>
            <boxGeometry/>
            <meshBasicMaterial color={"orange"}/>
        </mesh>
        </Canvas>
    );

}
export default CubeGrid;
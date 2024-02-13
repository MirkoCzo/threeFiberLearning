import React, { Suspense} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CubeContainer from "./components/CubeContainer";
import SphereContainer from "./components/SphereContainer"; 
import CubeContainerAR from "./components/MobileCubeAR";
import CubeGrid from "./components/CubeGrid";
import ScrollScene from "./components/ScrollScene";
import ARHouse from "./components/ARHouse";
import XRScene from "./components/XRScene";
import ARCube from "./components/ARCube";
import ARHouse2 from "./components/ARHouse2";
import TestHitTest from "./components/TestHitTest";
import Image from "./components/Image";
import Image360 from "./components/Image360";
import Teleporter from "./components/Teleporter";
import LightHouse from "./components/ARLightHouse";
import ARReticle from "./components/ARReticle.tsx";
import ARReticleThree from "./components/ARReticleThree.tsx";
import ARReticleThree2 from "./components/ARReticleThree2.jsx";

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<CubeContainerAR />} />
            <Route path="/sphere" element={<SphereContainer position={[0, 0, -4]} />} />
            <Route path="/gridCube" element={<CubeGrid/>}/>
            <Route path="/scroll" element={<ScrollScene/>}/>
            <Route path="/ARHouse" element={<ARHouse/>}/> 
            <Route path="/XRScene" element={<XRScene/>}/>
            <Route path="/ARCube" element={<ARCube/>}/>
            <Route path="/MinecraftCube" element={<CubeContainer/>}/>
            <Route path="/ARHouse2" element={<ARHouse2/>}/>
            {/* <Route path="/test" element={<TestHitTest/>}/> */}
            <Route path="/image" element={<Image/>}/>
            <Route path="/image360" element={<Image360/>}/>
            <Route path="/teleporter" element={<Teleporter/>}/>
            <Route path="/lightHouse" element={<LightHouse/>}/>
            <Route path="/ARReticle" element={<ARReticle/>}/>
            <Route path="/ARReticleThree" element={<ARReticleThree/>}/>
            {/* fonctionnel */}
            <Route path="/test2" element={<ARReticleThree2/>}/> 
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

// import React, { useEffect, useRef } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { MeshBasicMaterial, RingGeometry, Mesh } from 'three';
// import { ARButton, XR, useXR } from '@react-three/xr';
// import * as THREE from 'three';

// function Reticle() {
//   const { scene,camera } = useThree();
//   const { session } = useXR();

//   const xrRefSpace = useRef<XRReferenceSpace | null>(null);
//   const reticleRef = useRef<Mesh>();
//   const viewerSpace = useRef<XRReferenceSpace | null>(null);


  

//   useEffect(() => {
//     if(session)
//     {
//         session.requestReferenceSpace('local').then((refSpace) => {
//         xrRefSpace.current = refSpace;
//         });
//     }
//     const material = new MeshBasicMaterial();
//     const geometry = new RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2);
//     const reticle = new Mesh(geometry, material);  
//     reticleRef.current = reticle;


//   }, [session]);
//   useFrame(() => {
//     if (camera && reticleRef.current) {
//         const raycaster = new THREE.Raycaster(); // Créer un rayon à parti de la position et de la direction de la caméra
//         const rayOrigin = new THREE.Vector2(0,0);
//         raycaster.setFromCamera(rayOrigin, camera);
//         // Utiliser Array.from() pour convertir scene.children en un tableau d'objets Object3D pour l'utiliser dans  intersectObjects
//         const childrenArray = Array.from(scene.children) as THREE.Object3D[];
//         const intersects = raycaster.intersectObjects(childrenArray,true); // Intersection entre le rayon et les objets
//         if (intersects.length > 0) {
//             // Trouver l'objet intersecté le plus proche de la caméra
//             const intersection = intersects[0];
//             let closestIntersection = intersection;
//             let closestDistance = intersection.distance;
      
//             for (let i = 1; i < intersects.length; i++) {
//               if (intersects[i].distance < closestDistance) {
//                 closestIntersection = intersects[i];
//                 closestDistance = intersects[i].distance;
//               }
//             }
      
//             // Mettre à jour la position du réticule
//             reticleRef.current.position.copy(closestIntersection.point);
//           }
//         }
//   });

//   return null;
// }
  


// const ARReticle = () =>{
//   return (
//     <>
//     <ARButton/>
//     <Canvas>
//         <XR>
//             <Reticle />
//         </XR>
//     </Canvas>
//     </>
    
//   );
// }

// export default ARReticle;


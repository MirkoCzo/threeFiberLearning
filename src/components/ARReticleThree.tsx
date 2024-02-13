// import React, { useEffect } from 'react';
// import * as THREE from 'three';
// import { ARButton } from 'three/examples/jsm/webxr/ARButton';

// const ARReticleThree = () => {
//     let camera;
//     let scene;
//     let renderer;
//     let controller;
//     let reticle;

//     let hitTestSource = null;
//     let hitTestSourceRequested = false;

//     useEffect(() => {
//         init();
//         renderer.setAnimationLoop(render);

//         return () => {
//             renderer.setAnimationLoop(null);
//         };
//     }, []);

//     const init = () => {
//         renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setPixelRatio(window.devicePixelRatio);
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.xr.enabled = true;

//         const arOverlayElement = document.getElementById('arOverlay');
//         const arButton = ARButton.createButton(renderer, {
//             requiredFeatures: ['hit-test'],
//             optionalFeatures: ['dom-overlay'],
//             domOverlay: { root: arOverlayElement || document.body }
//         });

//         document.body.appendChild(arButton);

//         scene = new THREE.Scene();
//         camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

//         const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
//         light.position.set(0.5, 1, 0.25);
//         scene.add(light);

//         reticle = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial());
//         reticle.matrixAutoUpdate = false;
//         reticle.visible = false;
//         scene.add(reticle);
//         reticle.add(new THREE.AxesHelper(0.5));
//         reticle.add(new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), new THREE.MeshBasicMaterial()));

//         controller = renderer.xr.getController(0);
//         scene.add(controller);

//         scene.add(new THREE.AxesHelper(1));
//     };

//     const render = (timestamp, frame) => {
//         if (frame) {
//             const referenceSpace = renderer.xr.getReferenceSpace();
//             const session = renderer.xr.getSession();

//             if (hitTestSourceRequested === false) {
//                 session.requestReferenceSpace('viewer').then(referenceSpace => {
//                     session.requestHitTestSource({ space: referenceSpace }).then(source => {
//                         hitTestSource = source;
//                     });
//                 });
//                 session.addEventListener('end', () => {
//                     hitTestSourceRequested = false;
//                     hitTestSource = null;
//                 });
//                 hitTestSourceRequested = true;
//             }

//             if (hitTestSource) {
//                 const hitTestResults = frame.getHitTestResults(hitTestSource);
//                 if (hitTestResults.length) {
//                     const hit = hitTestResults[0];
//                     reticle.visible = true;
//                     reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);

//                     // TODO apply some additional rotation here
//                 } else {
//                     reticle.visible = false;
//                 }
//             }
//         }
//         renderer.render(scene, camera);
//     };

//     return null; // or whatever you want your component to render
// };

// export default ARReticleThree;

import * as THREE from 'three';
            import { ARButton } from 'three/addons/webxr/ARButton.js';
            import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
            let container;
            let camera, scene, renderer;
            let controller;
            let reticle;
            let hitTestSource = null;
            let hitTestSourceRequested = false;
            let model; 
            init();
            animate();
            
            function init() {
                container = document.createElement( 'div' );
                document.body.appendChild( container );
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );
                const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 3 );
                light.position.set( 0.5, 1, 0.25 );
                scene.add( light );
                //
                renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.xr.enabled = true;
                container.appendChild( renderer.domElement );
                //
                document.body.appendChild( ARButton.createButton( renderer, { requiredFeatures: [ 'local','hit-test'] } ) );
                //
                const loader = new GLTFLoader();
                loader.load('House.glb', function (gltf) {
                    model = gltf.scene;
                });
            
                function onSelect() {
                    if (reticle.visible && model) {
                        const modelClone = model.clone();
                        reticle.matrix.decompose(modelClone.position, modelClone.quaternion, modelClone.scale);
                        modelClone.scale.set(0.07, 0.07, 0.07);
                        scene.add(modelClone);
                    }
                }
                controller = renderer.xr.getController( 0 );
                controller.addEventListener( 'select', onSelect );
                scene.add( controller );
                reticle = new THREE.Mesh(
                    new THREE.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
                    new THREE.MeshBasicMaterial()
                );
                reticle.matrixAutoUpdate = false;
                reticle.visible = false;
                scene.add( reticle );
                //
                window.addEventListener( 'resize', onWindowResize );
            }
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            }
            //
            function animate() {
                renderer.setAnimationLoop( render );
            }
            function render( timestamp, frame ) {
                if ( frame ) {
                    const referenceSpace = renderer.xr.getReferenceSpace();
                    const session = renderer.xr.getSession();
                    if ( hitTestSourceRequested === false ) {
                        session.requestReferenceSpace( 'viewer' ).then( function ( referenceSpace ) {
                            session.requestHitTestSource( { space: referenceSpace } ).then( function ( source ) {
                                hitTestSource = source;
                            } );
                        } );
                        session.addEventListener( 'end', function () {
                            hitTestSourceRequested = false;
                            hitTestSource = null;
                        } );
                        hitTestSourceRequested = true;
                    }
                    if ( hitTestSource ) {
                        const hitTestResults = frame.getHitTestResults( hitTestSource );
                        if ( hitTestResults.length ) {
                            const hit = hitTestResults[ 0 ];
                            reticle.visible = true;
                            reticle.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );
                        } else {
                            reticle.visible = false;
                        }
                    }
                }
                renderer.render( scene, camera );
            }
const TestHitTest = () =>{
    <init/>
}
export default TestHitTest;
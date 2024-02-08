import { VRButton, ARButton, XR, Controllers, Hands, useXR, Interactive, useXRFrame, RayGrab, useHitTest } from '@react-three/xr'
import { Canvas, useFrame, Matrix4 } from '@react-three/fiber'
import MinecraftCube from './MinecraftCube';
import { useState } from 'react';
import { Text } from "@react-three/drei";
import { BoxGeometry, MeshBasicMaterial, Mesh, Vector3 } from 'three';



function CubeAnimator() {
  const textPosition = [0, 2, -2]; 

  const useHands = () => {
    // Cette fonction devrait retourner les données des mains récupérées depuis le casque AR.
    const { leftHand, rightHand } = useXR(); // Exemple hypothétique
    return { leftHand, rightHand };
  };

  const { leftHand, rightHand } = useHands(); // Récupération des données des mains
  const [distBetweenHands,setDistBetweenHands] = useState(0);

  const { player } = useXR(); //add

  const [modelPosition, setModelPosition] = useState([0,1,-1]);
  const [modelRotation, setModelRotation] = useState([0,0,0]);
  const [modelScale , setModelScale] = useState(0.4)

  const [cubeBiggerScale, setCubeBiggerScale] = useState(2,2,2);
  const [cubeSmallerScale, setCuberSmallerScale] = useState(0.5,0.5,0.5);

  const [cubeRotateLeft, setCubeRotateLeft] = useState([-1,0,0]);

  const [modelNeedToGetBigger, setModelNeedToGetBigger] = useState(false);
  const [modelNeedToGetSmaller, setModelNeedToGetSmaller] = useState(false);
  const [modelNeedToRotate, setModelNeedToRotate] = useState(false);

  const [previousDistance, setPreviousDistance] = useState(null);


  const [message,setMessage] = useState("");



  const [scalingSpeed] = useState(0.05);
  const [turningSpeed] = useState(0.05);
  const [travelingSpeed] = useState(0.05);

  const handleSelectStartBiggerCube = () =>{
    if(!modelNeedToGetSmaller) setModelNeedToGetBigger(true);
  }

  const handleSelectEndBiggerCube = () =>{
    if(!modelNeedToGetSmaller) setModelNeedToGetBigger(false);
  }
  const handleSelectStartSmallerCube = () =>{
    if(!modelNeedToGetBigger) setModelNeedToGetSmaller(true);
  }
  const handleSelectEndSmallerCube = () =>{
    if(!modelNeedToGetBigger) setModelNeedToGetSmaller(false);
  }


  useFrame((state, delta) => {
  
    if (leftHand && rightHand) {
      const leftPosition = leftHand.joints['wrist'].position;
      const rightPosition = rightHand.joints['wrist'].position;
  
      // Calculer la distance actuelle entre les deux mains
      const currentDistance = Math.sqrt(
        Math.pow(rightPosition.x - leftPosition.x, 2) +
        Math.pow(rightPosition.y - leftPosition.y, 2) +
        Math.pow(rightPosition.z - leftPosition.z, 2)
      );
      setDistBetweenHands(currentDistance);
      if (previousDistance != null) {
        // Déterminer si les mains s'éloignent ou se rapprochent
        const distanceChange = currentDistance - previousDistance;
  
        // Ajuster l'échelle du cube en fonction du changement de distance
        if (distanceChange > 0.01) { // Les mains s'éloignent, agrandir le cube
          setModelScale((prevScale) => Math.min(prevScale + scalingSpeed * delta, cubeBiggerScale));
        } else if (distanceChange < -0.01) { // Les mains se rapprochent, rétrécir le cube
          setModelScale((prevScale) => Math.max(prevScale - scalingSpeed * delta, cubeSmallerScale));
        }
      }
  
      // Mettre à jour la distance précédente pour la prochaine frame
      setPreviousDistance(currentDistance);
    } else {
      // Réinitialiser la distance précédente si une ou les deux mains ne sont pas détectées
      setPreviousDistance(null);
    }

    if (modelNeedToGetBigger) {
      setModelScale((prevScale) => prevScale + scalingSpeed * delta);
    }
    if (modelNeedToGetSmaller) {
      setModelScale((prevScale) => prevScale - scalingSpeed * delta);
    }
    if (modelNeedToRotate) {
      setModelRotation((prevRotation) => [
        prevRotation[0] + turningSpeed * delta,
        prevRotation[1] + turningSpeed * delta,
        prevRotation[2],
      ]);
    }
    if (detectPinch(leftHand)) {
      setMessage("Pincement détecté avec la main gauche !");
    } else if (detectPinch(rightHand)) {
      setMessage("Pincement détecté avec la main droite !");
    } else {
      setMessage("Pas de pincement et distance: "+distBetweenHands);
    }
    
  },[message],[distBetweenHands]);

  function detectPinch(hand) { //Ne fonctionne pas 
    if (!hand || !hand.joints || !hand.joints['thumb-tip'] || !hand.joints['index-finger-tip']) {
      return false; 
    }
    const thumbTip = hand.joints['thumb-tip'].position;
    const indexTip = hand.joints['index-finger-tip'].position;
  
    // Calculer la distance euclidienne
    const distance = Math.sqrt(
      Math.pow(indexTip.x - thumbTip.x, 2) +
      Math.pow(indexTip.y - thumbTip.y, 2) +
      Math.pow(indexTip.z - thumbTip.z, 2)
    );
  
    
    return distance < 0.02; 
  }

  

  return ( 
    <>
      <Interactive onSelectStart={handleSelectStartBiggerCube} onSelectEnd={handleSelectEndBiggerCube} onBlur={handleSelectEndBiggerCube}>
        <RayGrab>
          <mesh position={modelPosition} scale={modelScale} rotation={modelRotation}>
          <MinecraftCube />
          </mesh>
        </RayGrab>
      </Interactive>
      <Text
        position={textPosition}
        fontSize={0.5} // Taille de la police
        color="white" // Couleur du texte
        anchorX="center" // Ancrage horizontal du texte
        anchorY="middle" // Ancrage vertical du texte
      >
        {message} 
      </Text>
    </>
  );
}






function ARCube()
{
  return (
    <>
      <ARButton />
      <Canvas>
        <XR>
          <CubeAnimator />
        </XR>
      </Canvas>
    </>
  );
}
export default ARCube;
import React, { useState, useEffect } from 'react';
import CubeContainer from './CubeContainer';
import CubeContainerAR from './MobileCubeAR';

const XRScene = () => {
    const [selectedMode, setSelectedMode] = useState('');
    const [message,setMessage]=useState("");

    useEffect(() => {
        const checkXRSupport = async () => {
            let suppmessage;
            if (selectedMode === "AR") {
                try {
                    const supportedAr = await navigator.xr.isSessionSupported('immersive-ar');
                    if (supportedAr) {
                        setMessage("Bienvenu sur le mode AR");
                    } else {
                        setMessage("Pas d'AR disponible sur ce device");
                    }
                } catch (error) {
                    console.error("Erreur lors de la vérification du support AR:", error);
                    setMessage("Pas d'AR disponible sur ce device");
                }
            }
            else if(selectedMode === "VR"){
                try
                {
                    const supportedVr = await navigator.xr.isSessionSupported('immersive-vr');
                    if(supportedVr)
                    {
                        setMessage("Bienvenu dans le mode VR");
                    }
                    else
                    {
                        setMessage("Pas de VR disponible avec ce device");
                    }
                }catch(error)
                {
                    setMessage("Pas de VR disponible sur ce device.")
                }
            }
            else if (selectedMode === "inline"){
                try
                {
                    const supportedInline = await navigator.xr.isSessionSupported('inline');
                    if(supportedInline)
                    {
                        setMessage("Bienvenu sur le mode Inline");
                        return <CubeContainer/>;
                    }
                    else
                    {
                        setMessage("Pas de mode Inline disponible sur ce device");
                    }
                }catch(error)
                {
                    setMessage("Pas de mode inline disponible sur ce device");
                }
            }
            
        };

        checkXRSupport();
    }, [selectedMode]); 

    const renderContentBasedOnMode = () => {
        switch (selectedMode) {
            case "AR":
                return <CubeContainerAR/>;
            case "VR":
                return <CubeContainer/>;
            case "inline":
                return null;
            default:
                return null;
        }
    };

    return (
        <div>
            <p>Choisissez le mode</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            <button 
                style={{ padding: '10px 20px', fontSize: '16px' }} 
                onClick={() => setSelectedMode("AR")}>
                AR
            </button>
            <button 
                style={{ padding: '10px 20px', fontSize: '16px' }} 
                onClick={() => setSelectedMode("VR")}>
                VR
            </button>
            <button 
                style={{ padding: '10px 20px', fontSize: '16px' }} 
                onClick={() => setSelectedMode("inline")}>
                Inline
            </button>
        </div>
            
            {selectedMode && <p>Mode sélectionné : {selectedMode}</p>}
            <p>{message}</p>
            {renderContentBasedOnMode()}
        </div>
    );
};

export default XRScene;

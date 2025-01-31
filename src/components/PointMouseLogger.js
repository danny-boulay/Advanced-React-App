import React from "react";

// Composant fonctionnel qui affiche un point aux coordonnées de la souris
const PointMouseLogger = ({mousePosition}) => {
    // Vérifie si mousePosition est null ou undefined, et n'affiche rien dans ce cas
    if (!mousePosition) {
        return null;
    }
    return (
         // Div représentant le point rouge, positionnée selon les coordonnées de la souris
        <div className="point" style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        />
    );
}

export default PointMouseLogger;
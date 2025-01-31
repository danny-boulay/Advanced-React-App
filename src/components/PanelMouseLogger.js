import React from "react";

// Le composant PanelMouseLogger affiche la position de la souris sous forme de texte.
// Il reçoit la prop 'mousePosition' qui contient les coordonnées x et y de la souris.
const PanelMouseLogger = ({mousePosition}) => {    
    if (!mousePosition) {
        return null;
    }
    // Si 'mousePosition' est disponible, le composant rend un bloc de contenu avec les coordonnées x et y.
    return (
        <div>
            <h3>Mouse Position</h3>
            <p>X: {mousePosition.x}</p>
            <p>Y: {mousePosition.y}</p>
        </div>
    );
};

export default PanelMouseLogger;
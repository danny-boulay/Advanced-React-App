import React from "react";

const PanelMouseLogger = ({mousePosition}) => {    
    if (!mousePosition) {
        return null;
    }
    return (
        <div>
            <h3>Mouse Position</h3>
            <p>X: {mousePosition.x}</p>
            <p>Y: {mousePosition.y}</p>
        </div>
    );
};

export default PanelMouseLogger;
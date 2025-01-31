import React from "react";

const PointMouseLogger = ({mousePosition}) => {
    if (!mousePosition) {
        return null;
    }
    return (
        <div className="point" style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        />
    );
}

export default PointMouseLogger;
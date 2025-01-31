import React from "react";
import { useState, useEffect } from "react";

// HOC (Higher Order Component) qui ajoute une fonctionnalité de suivi de la position de la souris à un composant donné.
// 'WrappedComponent' est le composant passé en argument, auquel on ajoutera la gestion de la position de la souris.
const withMousePosition = (WrappedComponent) => {
    return (props) => {
        const [mousePosition, setMousePosition] = useState({
            x: 0,
            y: 0
        });

        // 'useEffect' pour ajouter un écouteur d'événements sur le mouvement de la souris.
        useEffect(() => {
            const handleMouseMove = (e) => {
                setMousePosition({
                    x: e.clientX,
                    y: e.clientY
                });
            }

            // Ajoute un événement 'mousemove' sur l'objet window pour suivre les déplacements de la souris.
            window.addEventListener("mousemove", handleMouseMove);

            // Retourne une fonction de nettoyage pour enlever l'écouteur d'événements quand le composant est démonté.
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            }
        },[]);

        // On retourne le WrappedComponent, en lui passant la position de la souris sous forme de prop 'mousePosition'.
        // Cela permet à ce composant d'accéder à la position de la souris via 'props.mousePosition'.
        return <WrappedComponent {...props} mousePosition={mousePosition} />
    };
}

export default withMousePosition;
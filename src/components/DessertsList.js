import React from "react";
import desserts from "../assets/desserts";

function DessertsList() {
    //Trier les desserts avec moins de 500 calories
    const dessertLessThan500 = desserts.filter((dessert) => dessert.calories < 500 );

    //Trier en ordre croissant de calories
    const dessertSorted = dessertLessThan500.sort((a,b) => a.calories - b.calories);

    // Générer une liste d'éléments <li> pour chaque dessert trié
    return(
        <ul>
            {dessertSorted.map((dessert) =>(
                <li>
                    {dessert.name} - {dessert.calories} cal
                </li>
            ))}
        </ul>
    );
}

export default DessertsList;
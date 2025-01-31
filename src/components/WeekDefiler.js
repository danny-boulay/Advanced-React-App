import { useState, useEffect, useRef, memo } from "react";
/*
Utilisation de memo ici car quand je clickais sur "Afficher le point" 
du HOC withMousePosition ça faisait appel à "Previous work day was: ..."
*/

const WeekDefiler = memo(function WeekDefiler() {
    // Fonction pour obtenir le jour actuel en format texte (ex: "Monday", "Tuesday", ...)
    const getCurrentDay = () => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const today = new Date().getDay(); // Renvoie un chiffre entre 0 (dimanche) et 6 (samedi)
        // On ajuste pour commencer la semaine à lundi (index 0 = Monday)
        return days[(today + 6) % 7]; // L'astuce ici est de faire en sorte que dimanche (0) soit "Monday"
    };

    // Déclare un état 'day' pour stocker le jour actuel de la semaine (l'état initial est défini avec 'getCurrentDay')
    const [day, setDay] = useState(getCurrentDay());

    // Utilisation du custom hook 'usePrevious' pour mémoriser le jour précédent.
    const prevDay = usePrevious(day);

    // Fonction qui met à jour le jour en fonction de l'état actuel.
    const getNextDay = () => {
        if (day === "Monday") {
            setDay("Tuesday")
        } else if (day === "Tuesday") {
            setDay("Wednesday")
        } else if (day === "Wednesday") {
            setDay("Thursday")
        } else if (day === "Thursday") {
            setDay("Friday")
        } else if (day === "Friday") {
            setDay("Monday")
        }
    }

    //Custom hook car cette fonction utilise useEffect qui est un hook de React
    function usePrevious(val) {
        const ref = useRef();

        // useEffect met à jour la référence de la valeur chaque fois que 'val' change.
        useEffect(() => {
            ref.current = val;
        }, [val]);

        // Retourne la valeur précédente de 'val'.
        return ref.current;
    }

    return (
        <div>
            <h1>
                Today is: {day}<br />
                {
                    prevDay && (
                    <span>Previous work day was: {prevDay}</span>
                    )
                }
            </h1>
            <button onClick={getNextDay}>
                Get next day
            </button>
        </div>
    );
});

export default WeekDefiler;

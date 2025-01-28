import { useState, useEffect, useRef } from "react";

function WeekDefiler() {
    // Fonction pour obtenir le jour actuel en format texte (ex: "Monday", "Tuesday", ...)
    const getCurrentDay = () => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const today = new Date().getDay(); // Renvoie un chiffre entre 0 (dimanche) et 6 (samedi)
        // On ajuste pour commencer la semaine à lundi (index 0 = Monday)
        return days[(today + 6) % 7]; // L'astuce ici est de faire en sorte que dimanche (0) soit "Monday"
    };

    const [day, setDay] = useState(getCurrentDay());
    const prevDay = usePrevious(day);

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

        useEffect(() => {
            ref.current = val;
        }, [val]);

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
}

export default WeekDefiler;

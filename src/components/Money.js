import { useEffect, useReducer } from "react";
/*
Ce component existe pour montrer comment utiliser useReducer
Il serait probablement plus pertinent d'utiliser useState ici vu que c'est une donnée primitive (number)
useReducer est plus pertinent pour les objets complexes comme les array et les objets
*/
const reducer = (state, action) => {
    switch (action.type) {
        case "INITIALIZE":
            return { count: action.payload }; // Initialisation avec les données du backend
        case "WORK":
            return { count: state.count + 400 };
        case "SHOPPING":
            return { count: state.count - 80 };
        case "GROCERY":
            return { count: state.count - 50 };
        default:
            return state;
    }
};

const Money = () => {
    const [state, dispatch] = useReducer(reducer, {count: 0 });

    const updateMoney = async (newMoney) => {
        await fetch("http://localhost:3001/api/money", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ money:newMoney}),
        });
    };

    useEffect(() => {
        const fetchMoney = async () => {
            const response = await fetch("http://localhost:3001/api/money");
            const data = await response.json();
            dispatch({ type: "INITIALIZE", payload: data.money });
        };
        fetchMoney();
    }, []);

    return (
        <div>
            <h1>Money: {state.count}</h1>
            <button onClick={() => dispatch({ type: "WORK" })}>Work</button>
            <button onClick={() => dispatch({ type: "SHOPPING" })}>Shopping</button>
            <button onClick={() => dispatch({ type: "GROCERY" })}>Grocery</button>
            <button onClick={() => updateMoney(state.count)}>Save Changes</button>
        </div>
    );
};

export default Money;
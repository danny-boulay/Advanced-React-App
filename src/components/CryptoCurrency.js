import { useState, useEffect } from "react"; 

// Composant pour afficher les données de la monnaie Bitcoin en utilisant un API externe (source qui vient de Coindesk)
function CryptoCurrency() {
    const [btcData, setBtcData] = useState(null); // Hook pour stocker les données de la monnaie Bitcoin

    const fetchData = () => {
        fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then((res) => res.json()) // Conversion de la réponse en JSON
            .then((data) => setBtcData(data.bpi.USD)) // Mise à jour de l'état local avec les données de la monnaie Bitcoin
            .catch((err) => console.error("Erreur lors du chargement des données de la monnaie Bitcoin :", err));
    }; // Le tableau vide signifie que cet effet s'exécutera uniquement au premier rendu

    useEffect(() => {
        fetchData(); // Appel de la fonction fetchData au montage du composant

        const interval = setInterval(() => {
            fetchData(); // Appel de la fonction fetchData toutes les 60 secondes
        }, 60000); // Actualisation toutes les 60 secondes

        return () => clearInterval(interval); // Nettoyage de l'intervalle lorsque le composant est démonté

    }, []); // Le tableau vide signifie que cet effet s'exécutera uniquement au premier rendu

    return (
        <div>
            <h1>Current BTC/USD data</h1>
            {btcData ? (
                <p>{btcData.rate} {btcData.code}</p>
            ) : (
                <p>Loading...</p> // Affichage de "Loading..." tant que les données ne sont pas chargées (utile pour les réseaux lents)
            )} 
        </div>
    );
}

export default CryptoCurrency;
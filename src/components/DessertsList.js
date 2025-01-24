import React, {useEffect, useState} from "react";

function DessertsList() {
    const [desserts, setDesserts] = useState([]); // État pour stocker la liste des desserts récupérés depuis le serveur
    const [newDessert, setNewDessert] = useState({name:"", calories: ""}); // État pour gérer les valeurs du formulaire (nom et calories du nouveau dessert)

    // ** Chargement initial des desserts ** (Effet exécuté une seule fois au montage du composant)
    useEffect(() => {
        fetch("http://localhost:3001/api/desserts")
            .then((res) => res.json()) // Conversion de la réponse GET en JSON
            .then((data) => setDesserts(data)) // Mise à jour de l'état local avec les desserts récupérés
            .catch((err) => console.error("Erreur lors du chargement des desserts :", err));
    }, []); // Le tableau vide signifie que cet effet s'exécute uniquement au premier rendu

    //Gérer les changements dans les inputs
    const handleInputChange = (e) => {
        const {name,value} = e.target; // Récupération du nom de l'input (name) et de sa valeur
        setNewDessert({...newDessert, [name]: value}); // Mise à jour de l'état du formulaire en conservant les autres champs
    };

    // Ajouter un nouveau dessert à la liste
    const handleAddDessert = (e) => {
        e.preventDefault(); // Empêche le rafraîchissement de la page

    if (!newDessert.name || !newDessert.calories) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Création d'un nouvel objet dessert à ajouter
    const newDessertEntry = {
        id: Date.now(), // Utilisation de l'heure actuelle comme ID unique
        name: newDessert.name,
        calories: parseInt(newDessert.calories, 10), // Conversion en entier
        createdAt: new Date().toISOString(), // Date de création au format ISO
    };
    console.log("Nouveau dessert :", newDessertEntry);

    // Scroll to the ref before sending the request
    //scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    
    // Envoi du dessert au serveur via une requête POST
    fetch("http://localhost:3001/api/desserts", {
        method: "POST", // Type de requête (ajout)
        headers: { "Content-Type": "application/json" },  // Spécifie le format des données envoyées
        body: JSON.stringify(newDessertEntry), // Convertit l'objet en texte JSON
    })
    .then((res) => {
        if (res.ok) {
          console.log("Dessert ajouté avec succès !");
          setDesserts([...desserts, newDessertEntry]); // Ajoute le nouveau dessert à la liste locale (sans recharger depuis le serveur)
        }  else {
          console.error("Erreur lors de l'ajout du dessert :", res.status);
        }
    })
    .catch((err) => console.error("Erreur lors de l'ajout du dessert :", err));
    };

    //Trier les desserts avec moins de 500 calories
    const dessertLessThan500 = desserts.filter((dessert) => dessert.calories < 500 );
  
    //Trier en ordre croissant de calories
    const dessertSorted = dessertLessThan500.sort((a,b) => a.calories - b.calories);

    // Générer une liste d'éléments <li> pour chaque dessert trié
    return (
        <div className="DessertsList">
          <h1>Liste de Desserts avec peu de calories</h1>
          {/* Formulaire pour ajouter un dessert */}
          <form onSubmit={handleAddDessert}>
            <input
              type="text"
              name="name"
              placeholder="Nom du dessert"
              value={newDessert.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="calories"
              placeholder="Calories"
              value={newDessert.calories}
              onChange={handleInputChange}
            />
            <button disabled={!newDessert.name || !newDessert.calories} type="submit">Ajouter Dessert</button>
          </form>
  
          {/* Liste des desserts triés */}
          <ul>
            {dessertSorted.map((dessert) => (
              <li key={dessert.id}>
                {dessert.name} - {dessert.calories} cal (Ajouté le :{" "}
                {new Date(dessert.createdAt).toLocaleDateString()})
              </li>
            ))}
          </ul>
        </div>
      );
}

export default DessertsList;
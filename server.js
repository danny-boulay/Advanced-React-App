const express = require("express"); // Importation du framework Express pour créer et gérer un serveur web facilement
const fs = require("fs"); // Importation du module natif 'fs' (file system) pour lire et écrire dans des fichiers
const app = express(); // Création d'une instance de l'application Express
const cors = require("cors"); // Importation de CORS pour autoriser les requêtes provenant d'autres origines

// Autoriser uniquement les requêtes venant de localhost:3000 (ton frontend React)
app.use(cors({
  origin: "http://localhost:3000"  // Change cette URL si nécessaire
}));

// Définition du port sur lequel le serveur va écouter (3001)
const PORT = 3001;

// Middleware pour parser le JSON (Cela permet à Express de comprendre les données envoyées au format JSON dans les requêtes POST/PUT)
app.use(express.json());

// Chemin vers le fichier JSON contenant les desserts
const path = require("path");
const filePath = path.join(__dirname, "public", "assets", "desserts.json");

// Route **GET** pour récupérer les desserts
app.get("/api/desserts", (req, res) => {
  // Lecture du fichier contenant les desserts
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      // Retourner une réponse avec le code d'erreur 500 (erreur serveur)
      return res.status(500).send("Erreur lors de la lecture des desserts.");
    }
    // Si tout va bien, envoyer les données au format JSON au client
    res.json(JSON.parse(data)); // `JSON.parse` convertit le texte en objet JavaScript
  });
});

// Route **POST** pour ajouter un dessert
app.post("/api/desserts", (req, res) => {
  // Le nouveau dessert est envoyé dans le corps de la requête (req.body)
  const newDessert = req.body;
  console.log("Données reçues :", newDessert); // Log les données reçues

  // Lecture de la liste existante des desserts dans le fichier JSON
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erreur de lecture :", err);
      return res.status(500).send("Erreur lors de la lecture des desserts.");
    }

    // Conversion des données du fichier JSON en tableau d'objets JavaScript
    const desserts = JSON.parse(data);

    // Ajout du nouveau dessert au tableau
    desserts.push(newDessert);

    // Écriture du tableau mis à jour dans le fichier JSON
    fs.writeFile(filePath, JSON.stringify(desserts, null, 2), (err) => {
      if (err) {
        console.error("Erreur d'écriture :", err);
        return res.status(500).send("Erreur lors de l'écriture des desserts.");
      }
      console.log("Dessert ajouté :", newDessert);
      res.status(201).send("Dessert ajouté !");
    });
  });
});

// Démarrage du serveur sur le port spécifié
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

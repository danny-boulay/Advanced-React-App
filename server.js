const express = require("express"); // Importation du framework Express pour créer et gérer un serveur web facilement
const fs = require("fs"); // Importation du module natif 'fs' (file system) pour lire et écrire dans des fichiers
const app = express(); // Création d'une instance de l'application Express
const cors = require("cors"); // Importation de CORS pour autoriser les requêtes provenant d'autres origines

// Autoriser uniquement les requêtes venant de localhost:3000 (ton frontend React)
app.use(cors({
  origin: "http://localhost:3000"  // Peut changer l'URL si nécessaire
}));

// Définition du port sur lequel le serveur va écouter (3001)
const PORT = 3001;

// Middleware pour parser le JSON (Cela permet à Express de comprendre les données envoyées au format JSON dans les requêtes POST/PUT)
app.use(express.json());

// Chemin vers les fichiers JSON
const path = require("path");
const dessertsFilePath = path.join(__dirname, "public", "assets", "desserts.json");
const moneyFilePath = path.join(__dirname, "public", "assets", "money.json");

// Route **GET** pour récupérer les desserts
app.get("/api/desserts", (req, res) => {
  fs.readFile(dessertsFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Erreur lors de la lecture des desserts.");
    res.json(JSON.parse(data)); // `JSON.parse` convertit le texte en objet JavaScript
  });
});

// Route **POST** pour ajouter un dessert
app.post("/api/desserts", (req, res) => {
  // Le nouveau dessert est envoyé dans le corps de la requête (req.body)
  const newDessert = req.body;

  // Lecture de la liste existante des desserts dans le fichier JSON
  fs.readFile(dessertsFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Erreur lors de la lecture des desserts.");

    // Conversion des données du fichier JSON en tableau d'objets JavaScript
    const desserts = JSON.parse(data);

    // Ajout du nouveau dessert au tableau
    desserts.push(newDessert);

    // Écriture du tableau mis à jour dans le fichier JSON
    fs.writeFile(dessertsFilePath, JSON.stringify(desserts, null, 2), (err) => {
      if (err) return res.status(500).send("Erreur lors de l'écriture des desserts.");
      res.status(201).send("Dessert ajouté !");
    });
  });
});

// Route **GET** pour récupérer la monnaie
app.get("/api/money", (req, res) => {
  fs.readFile(moneyFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Erreur lors de la lecture de la monnaie.");
    res.json(JSON.parse(data)); // `JSON.parse` convertit le texte en objet JavaScript
  });
});

//Route **POST** pour mettre à jour la monnaie
app.post("/api/money", (req, res) => {
  // La nouvelle monnaie est envoyé dans le corps de la requête (req.body)
  const newMoney = req.body;

  // Lecture de la monnaie existante dans le fichier JSON
  fs.readFile(moneyFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Erreur lors de la lecture de la monnaie.");

    // Conversion des données du fichier JSON en objet JavaScript
    const money = JSON.parse(data);

    // Mise à jour de la monnaie
    money.money = newMoney.money;

    //Écriture de la monnaie mise à jour dans le fichier JSON
    fs.writeFile(moneyFilePath, JSON.stringify(money, null, 2), (err) => {
      if (err) return res.status(500).send("Erreur lors de l'écriture de la monnaie.");
      res.status(201).send("Monnaie mise à jour !");
    })
  })
})

// Démarrage du serveur sur le port spécifié
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

// Importation des modules nécessaires
const express = require("express");
const mysql = require("mysql2");

// Créer une app express
const app = express();

// Connexion MySQL
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'user_db',
});

// Connexion à la base de données
connexion.connect((err) => { 
    if (err) {
        console.error("Erreur pendant la connexion :", err.message);
        process.exit(1);
    }
    console.log("Connexion réussie !");
});

app.use(express.json()); // Middleware pour parser le JSON


// Route d'origine
app.get("/", (req, res) => {
    res.send("Bienvenue sur notre API :)");
});

// Route pour récupérer la liste des utilisateurs
app.get("/api/users", (req, res) => {
    const query = "SELECT * FROM users";

    connexion.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
        }
        res.status(200).json(results);
    });
});

// Route pour ajouter un utilisateur
app.post("/api/users", (req, res) => {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password || !age) {
        return res.status(400).json({ message: "Il manque une donnée" });
    }

    const query = "INSERT INTO users (name, email, password, age) VALUES (?, ?, ?, ?)";
    const values = [name, email, password, age];

    connexion.query(query, values, (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur", error });
        }

        res.status(201).json({
            id: result.insertId,
            name,
            email,
            age,
        });
    });
});

// Route pour mettre à jour un utilisateur
app.put("/api/users/:id", (req, res) => {
    const userId = Number(req.params.id);

    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ message: "ID d'utilisateur invalide ou manquant" });
    }

    const { name, email, age } = req.body;
    const query = "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";
    const values = [name || null, email || null, age || null, userId];

    connexion.query(query, values, (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé !" });
        }

        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
    });
});

// Route pour supprimer un utilisateur
app.delete("/api/users/:id", (req, res) => {
    const userId = Number(req.params.id);

    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ message: "ID d'utilisateur invalide ou manquant." });
    }

    const query = "DELETE FROM users WHERE id = ?";
    connexion.query(query, [userId], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé !" });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    });
});

// Définition du port et démarrage du serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
//Importation du module express
const express = require ("express");
const mysql = require ("mysql2");

//Créer une app express
const app = express();

//connexion mysql
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'user_db',
});

connexion.connect((err) => {
    if (err) {
        console.error("Erreur lors de la connexion avec mysql :", err.message);
        process.exit(1);
    }
    console.log("Connexion avec la base de donnée réussie");
})
app.use(express.json());

// DATA USERS

const users = [
    {
        id: 1,
        name: "Meïssane",
        email: "meissane@gmail.com",
        age: 19,
    },

    {
        id: 2,
        name: "Elsa",
        email: "elsa@gmail.com",
        age: 20,
    },

    {
        id: 3,
        name: "Hugo",
        email: "hugo@gmail.com",
        age: 19,
    }
]

//routes
//route d'origine
app.get("/", (req, res) => {
    res.send("Bienvenue sur notre API :)");
});

//route pour récupérer la liste des utilisateurs
app.get("/api/users", (req, res) => {
    res.json(users);
});


// Ajouter un utilisateur 

app.post ("/api/users", (req, res) => {
    const { name,email,password,age } = req.body;

    if ( !name || !email || !password || !age) {
        return res.status(400).json({message : "Il manque une donnée."});
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        age,
    };
// Ajouter l'utilisateur à la liste
    users.push(newUser);

    res.status(201).json(newUser);
});

// Mettre à jour un utilisateur 

app.put("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id); //Extraire l'id de l'utilisateur depuis les param de la req
    const existingUser = users.find((user) => user.id === userId); //Trouver l'utilisateur correspondant à l'ID de la req
 
    if (existingUser) {
        existingUser.name = req.body.name || existingUser.name;
        existingUser.email = req.body.email || existingUser.email;
        existingUser.age = req.body.age || existingUser.age;
        res.json(existingUser);
    } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
    }
});

//route pour supprimer un utilisateur
app.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: "un ID d'utilisateur requis" });
    }

    const query = 'DELETE FROM users WHERE id = ?';

    connexion.query(query, [userId], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Erreur de suppression", error });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé !" });
        }

        res.status(200).json({ message: "Utilisateur supprimé :/"});
    });
});





//définition du port et démarrage du serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
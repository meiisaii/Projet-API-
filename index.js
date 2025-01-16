//Importation du module express
const express = require ("express");
const mysql = require ("mysql2");

//Créer une app express
const app = express();

//Définition du port
const port = 3000;

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
//













// Ajouter un utilisateur 

app.post ("/api/users", (req, res) => {
    const { name,email,password } = req.body;

    if ( !name || !email || !password ) {
        return res.status(400).json({message : "Il manque une donnée."});
    }

// Ajouter l'utilisateur à la liste
    users.push(newUser);

});
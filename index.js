const express = require ("express");
const mysql = require ("mysql2");

const app = express();

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


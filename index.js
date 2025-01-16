const express = require ("express");
const mysql = require ("mysql2");

const app = express();

const port = 3000;

app.use(express.json());

// DATA USERS

const users = [
    {
        id: 1,
        name: "Valentine",
        email: "valentine@gmail.com",
        age: 20,
    },

    {
        id: 2,
        name: "Jason",
        email: "jason@gmail.com",
        age: 26,
    },

    {
        id: 3,
        name: "Sacha",
        email: "sacha@gmail.com",
        age: 22,
    }
]


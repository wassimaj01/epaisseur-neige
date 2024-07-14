const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 3001;

// Activer CORS
app.use(cors()); 
app.use(express.json()); // Middleware pour parser le JSON

// Configuration du client PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'neige',
  password: 'wassim2001',
  port: 5432,
});

// Se connecter à la base de données
client.connect()
  .then(() => console.log('Connecté à PostgreSQL'))
  .catch(err => console.error('Erreur de connexion', err.stack));

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

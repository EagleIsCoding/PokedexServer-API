/**
* Serveur Backend Pokedex
*/

// Définir l'emplacement des fichiers bases de données
const POKEDEX_SRC = "./DATA/pokedex.json";
// Définir l'emplacement des images
const IMAGES_SRC = "./FILES/images";
// Définir un port
const PORT = 5001;
// ************************************************
// Lancer un serveur express sur un port défini
const fs = require('fs');

// npm install express
const express = require('express');
const app = express();
// Lancement du serveur et attendre
app.listen(
 PORT,
 '172.16.193.1',
 () => {
 console.log('Server Pokedex is listening on ' + PORT);
 }
);

app.use('/images', express.static(IMAGES_SRC)); // servir les images statiques 

app.get('/all', (req, res) => { // route par défaut
	fs.readFile(POKEDEX_SRC, 'utf8', (err, data) => {
		if (err) {
			console.error('Error during file read:', err);
			res.status(500).send('Server error');
			return; 
		}

		// Convertir le JSON en objet JS 
		const pokedex = JSON.parse(data);

		// Envoyer tout le contenu du pokedex en réponse
		res.json(pokedex);
	});
});

app.get('/hasard', (req, res) => { // route pour un pokémon au hasard
    fs.readFile(POKEDEX_SRC, 'utf8', (err, data) => {
        if (err) {
            console.error('Error during file read:', err);
            res.status(500).send('Server error');
            return;
        }

        const pokedex = JSON.parse(data);
        const minId = 0;
        const maxId = pokedex.length - 1;
        console.log(maxId);
        const randomIndex = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
        const randomPokemon = pokedex[randomIndex];
        res.json(randomPokemon);
    });
});

const path = require('path'); // module path pour gérer les chemins de fichiers
app.get('/', (req, res) => { // route racine pour servir le fichier index.html
    res.sendFile(path.join(__dirname, '../FRONTEND/index.html'));
});

app.get('/pokemon/:data', (req, res) => { // route pour un pokémon par son id ou son nom en anglais
    console.log(req.params.data);
    const data = req.params.data;
    if (/^\d+$/.test(data)) { // Vérifier si data correspond au pattern d'un entier positif
        const pokemonId = parseInt(data, 10); // Convertir en nombre entier
        fs.readFile(POKEDEX_SRC, 'utf8', (err, data) => {
            if (err) {
                console.error('Error during file read:', err);
                res.status(500).send('Server error');
                return;
            }
            const pokedex = JSON.parse(data);
            const pokemon = pokedex.find(p => p.id === pokemonId);
            if (pokemon) {
                res.json(pokemon);
            } else {
                res.status(404).send('Pokemon not found');
            }
        });
    } else { // Sinon, traiter data comme un nom de Pokémon
        const pokemonName = data; // Récupérer le nom du Pokémon
        fs.readFile(POKEDEX_SRC, 'utf8', (err, data) => {
            if (err) {
                console.error('Error during file read:', err);
                res.status(500).send('Server error');
                return;
            }
            const pokedex = JSON.parse(data);
            const pokemon = pokedex.find(p => p.name.english.toLowerCase() === pokemonName.toLowerCase());
            if (pokemon) {
                res.json(pokemon);
            } else {
                res.status(404).send('Pokemon not found');
            }
        });
    }
});

app.get('/type/:type', (req, res) => { // route pour les pokémons par type 
    const typeParam = req.params.type.toLowerCase();
    fs.readFile(POKEDEX_SRC, 'utf8', (err, data) => {
        if (err) {
            console.error('Error during file read:', err);
            res.status(500).send('Server error');
            return;
        }
        const pokedex = JSON.parse(data);
        const filteredPokemons = pokedex.filter(p =>
            Array.isArray(p.type) && // vérifier que p.type est un tableau
            p.type.length > 0 && // vérifier que le tableau n'est pas vide
            p.type.some(t => t.toLowerCase() === typeParam) // utiliser some() pour vérifier si au moins un type correspond
        );
        if (filteredPokemons.length === 0) {
            res.status(404).send('No pokemon found for the specified type');
            return;
        }
        res.json(filteredPokemons);
    });
});


// Servir tout le dossier frontend (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, '../FRONTEND')));
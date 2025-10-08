/**
* Serveur Backend Pokedex
*/
//console.log ("Hello World!");
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
)

app.get('/', (req, res) => { // route par défaut
	fs.readFile(POKEDEX_SRC, 'utf8', (err, data) => {
		if (err) {
			console.error('Erreur lors de la lecture du fichier :', err);
			res.status(500).send('Erreur serveur');
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
            console.error('Erreur lors de la lecture du fichier :', err);
            res.status(500).send('Erreur serveur');
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

app.get('/pokemon/:data', (req, res) => { // route pour un pokémon par son id ou son nom en français
    console.log(req.params.data);
    const data = req.params.data;
    if (/^\d+$/.test(data)) { // Vérifier si data correspond au pattern d'un entier positif
        const pokemonId = parseInt(data, 10); // Convertir en nombre entier
        fs.readFile(POKEDEX_SRC, 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur lors de la lecture du fichier :', err);
                res.status(500).send('Erreur serveur');
                return;
            }
            const pokedex = JSON.parse(data);
            const pokemon = pokedex.find(p => p.id === pokemonId);
            if (pokemon) {
                res.json(pokemon);
            } else {
                res.status(404).send('Pokémon non trouvé');
            }
        });
    } else { // Sinon, traiter data comme un nom de Pokémon
        const pokemonName = data; // Récupérer le nom du Pokémon
        fs.readFile(POKEDEX_SRC, 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur lors de la lecture du fichier :', err);
                res.status(500).send('Erreur serveur');
                return;
            }
            
            const pokedex = JSON.parse(data);
            const pokemon = pokedex.find(p => p.name.french.toLowerCase() === pokemonName.toLowerCase());
            if (pokemon) {
                res.json(pokemon);
            } else {
                res.status(404).send('Pokémon non trouvé');
            }
        });
    }
});
// Fonction pour récupérer un Pokémon aléatoire depuis la route /hasard
async function getRandomPokemon() {
    try {
        const response = await fetch('/hasard'); // Appel de l'API backend
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du Pokémon aléatoire');
        }
        const pokemon = await response.json();
        displayRandomPokemon(pokemon); // Appeler la fonction pour afficher
    } catch (error) {
        console.error(error);
        document.getElementById('random-pokemon').innerText = 'Impossible de charger le Pokémon';
    }
}

// Fonction pour afficher le Pokémon aléatoire dans le div #random-pokemon
function displayRandomPokemon(pokemon) {
    const container = document.getElementById('random-pokemon');
    const formattedId = String(pokemon.id).padStart(3, '0');
    container.innerHTML = `
        <div class="pokemon type-${pokemon.type[0].toLowerCase()}">
            <img src="/images/${formattedId}.png" alt="${pokemon.name.english}">
            <h3>${pokemon.name.english}</h3>
            <p>#${formattedId}</p>
            <p>Type: ${pokemon.type.join(', ')}</p>
            <p>HP: ${pokemon.base.HP}</p>
            <p>Attack: ${pokemon.base.Attack}</p>
            <p>Defense: ${pokemon.base.Defense}</p>
            <p>Sp. Attack: ${pokemon.base['Sp. Attack']}</p>
            <p>Sp. Defense: ${pokemon.base['Sp. Defense']}</p>
            <p>Speed: ${pokemon.base.Speed}</p>
        </div>
    `;
}

getRandomPokemon();
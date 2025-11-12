// Fonction pour récupérer tous les Pokémon depuis la route /all
async function getPokemons() {
    try {
        const response = await fetch('/all');
        if (!response.ok) throw new Error('Erreur lors de la récupération des Pokémon');
        const pokedex = await response.json();

        displayPokemons(pokedex);
    } catch (error) {
        console.error(error);
    }
}

// Fonction pour afficher les Pokémon dans le div #all-pokemons
function displayPokemons(pokemons) {
    const container = document.getElementById('all-pokemons');
    container.innerHTML = ''; // Vider le contenu avant d'afficher
    pokemons.forEach(pokemon => {
        const formattedId = String(pokemon.id).padStart(3, '0');
        const pokeDiv = document.createElement('div');
        pokeDiv.classList.add('pokemon-card', `type-${pokemon.type[0].toLowerCase()}`);

        pokeDiv.innerHTML = `
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
        `;
        container.appendChild(pokeDiv);
    });
}

getPokemons();
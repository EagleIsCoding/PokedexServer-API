function searchPokemon() {
    const data = document.getElementById('search').value;
    fetch(`/pokemon/${data}`)
        .then(res => res.json())
        .then(pokemon => {
            const result = document.getElementById('result');
            const formattedId = String(pokemon.id).padStart(3, '0');
            result.innerHTML = `
                <div class="pokemon type-${pokemon.type[0].toLowerCase()}">
                    <h2>${pokemon.name.english}</h2>
                    <img src="/images/${formattedId}.png" alt="${pokemon.name.english}">
                    <p>Id : ${pokemon.id}</p>
                    <p>Type: ${pokemon.type.join(', ')}</p>
                    <p>HP: ${pokemon.base.HP}</p>
                    <p>Attack: ${pokemon.base.Attack}</p>
                    <p>Defense: ${pokemon.base.Defense}</p>
                    <p>Sp. Attack: ${pokemon.base['Sp. Attack']}</p>
                    <p>Sp. Defense: ${pokemon.base['Sp. Defense']}</p>
                    <p>Speed: ${pokemon.base.Speed}</p>
                </div>
            `;
        })
        .catch(err => alert("Pokemon not found"));
}
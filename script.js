document.getElementById('search-button').addEventListener('click', function() {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
      document.getElementById('pokemon-id').textContent = `#${data.id}`;
      document.getElementById('weight').textContent = `Weight: ${data.weight}`;
      document.getElementById('height').textContent = `Height: ${data.height}`;
      document.getElementById('hp').textContent = `${data.stats[0].base_stat}`;
      document.getElementById('attack').textContent = `${data.stats[1].base_stat}`;
      document.getElementById('defense').textContent = `${data.stats[2].base_stat}`;
      document.getElementById('special-attack').textContent = `${data.stats[3].base_stat}`;
      document.getElementById('special-defense').textContent = `${data.stats[4].base_stat}`;
      document.getElementById('speed').textContent = `${data.stats[5].base_stat}`;

      const sprite = document.getElementById('sprite');
      sprite.src = data.sprites.front_default;
      sprite.style.display = 'block';

      const typesContainer = document.getElementById('types');
      typesContainer.innerHTML = '';
      data.types.forEach(typeInfo => {
        const typeElement = document.createElement('span');
        typeElement.textContent = typeInfo.type.name.toUpperCase();
        typesContainer.appendChild(typeElement);
      });
    })
    .catch(error => {
      alert(error.message);
      document.getElementById('pokemon-name').textContent = '';
      document.getElementById('pokemon-id').textContent = '';
      document.getElementById('weight').textContent = '';
      document.getElementById('height').textContent = '';
      document.getElementById('hp').textContent = '';
      document.getElementById('attack').textContent = '';
      document.getElementById('defense').textContent = '';
      document.getElementById('special-attack').textContent = '';
      document.getElementById('special-defense').textContent = '';
      document.getElementById('speed').textContent = '';
      document.getElementById('sprite').style.display = 'none';
      document.getElementById('types').innerHTML = '';
    });
});

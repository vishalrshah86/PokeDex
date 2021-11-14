let pokemonRepository = (function() {
//added IIFE function
    let pokemonList = [
      {name: "Clefable", height: 1, types: ['grass','speed']},
      {name: 'Pikachu', height: 1.5, types: ['water','speed']},
      {name: 'Sandshrew', height: 2.3, types: ['ice','speed']},
      {name: 'Bulbasaur', height: 0.7, types: ['grass','poison']},
      {name: 'Charizard', height: 1.7, types: ['fire','flying']}
    ];

    function getAll() {
      return pokemonList;
    }

    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
     let pokemonList = document.querySelector(".pokemon-list");
     let listpokemon = document.createElement("li");
     let button = document.createElement("button");
     button.innerText = pokemon.name;
     button.classList.add("poke-button");
     listpokemon.appendChild(button);
     pokemonList.appendChild(listpokemon);
     button.addEventListener("click", function(event) {
      showDetails(pokemon);
     });
    }

    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
    };

})();


  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });

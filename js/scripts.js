let pokemonRepository = (function() {
//added IIFE function
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


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


    function showDetails(pokemon){
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }

    function add(pokemon) {
        if (typeof pokemon === 'object') {
          pokemonList.push(pokemon);
        }
      }


      function getAll() {
        return pokemonList;
      }


    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(fubnction (item) {
          let pokemon = {
            name: iten.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }


    function loadDetails(pokemon) {
       let url = item.detailsUrl;
       return fetch(url).then(function(response) {
           return response.json();
         }).then(function (details) {
           item.imageUrl = details.sprites.front_default;
           item.height = details.height;
           item.types = details.types;
         }).catch(function(e) {
           console.error(e);
         });
     }



    function add(pokemon) {
      pokemonList.push(pokemon);
    }


    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
    };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

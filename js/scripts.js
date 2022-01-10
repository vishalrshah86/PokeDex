let pokemonRepository = (function() {
  //added IIFE function
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';



  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    }
  }



  function getAll() {
    return pokemonList;
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



  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }


  function loadDetails(item) {
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



  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }


  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    modalTitle.empty();
    modalBody.empty();



    //Create a name element to display in the console
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    // Image element
    let imageElement = $('<img class="modal-img" src="" >');
    imageElement.attr('src', pokemon.imageUrl);
    // Height and Types
    let heightElement = $('<p>' + 'height: ' + pokemon.height + '</p>');
    let typesElement = $('<p>' + 'types: ' + pokemon.types + '</p>');


    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);

    $('#pokedex').modal();
  }


  fetch('https://pokeapi.co/api/v2/pokemon/').then(function (response) {
    return response.json();
  }).then(function (pokemonList) {
    console.log(pokemonList);
  }).catch(function () {
  });




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
  document
  .querySelector('.search-pokemon')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    let query = document.querySelector('#myInput').value;
    document.querySelector('.pokemon-list').innerHTML = '';
    if (query === '') {
      pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    } else {
      pokemonRepository.getAll().forEach(function (pokemon) {
        if (pokemon.name.indexOf(query) > -1) {
          pokemonRepository.addListItem(pokemon);
        }
      });
    }
  });


  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

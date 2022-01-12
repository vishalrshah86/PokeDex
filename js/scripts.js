let pokemonRepository = (function() {
  //added IIFE function
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
  let modalContainer = document.querySelector('#modal-container');


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
    let modalTitle = document.querySelector('#modal-title');
    let modalBody = document.querySelector('#modal-body');

    let modal = document.createElement('div');
    modal.classList.add('modal');



    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);


    let namePokemon = document.createElement('h1');
    namePokemon.innerText = pokemon.name;

    let imagePokemon = document.createElement('img');
    imagePokemon.src = pokemon.imageUrl;

    let heightPokemon = document.createElement('p');
    heightPokemon.innerText = 'height: ' + pokemon.height;


    modalTitle.appendChild(namePokemon);
    modalTitle.appendChild(closeButtonElement);
    modalBody.appendChild(imagePokemon);
    modalBody.appendChild(heightPokemon);

    modalContainer.classList.add('is-visible');
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Pokemon', 'This is the modal content!');
  });



  function hideModal() {
    let modalTitle = document.querySelector('#modal-title');
    let modalBody = document.querySelector('#modal-body');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });




  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal,
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

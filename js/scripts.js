let pokemonRepository = (function() {
  //added IIFE function
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
  let modalContainer = document.querySelector('#modal-container');


  function add(pokemon) {
    if (typeof pokemon === 'object') && 'name' in pokemon
  )  {pokemonList.push(pokemon);
  } else {console.log('Pokemon is not correct');
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
  }


  function showModal (pokemon) {
// Get modal createElement
var modal = document.getElementById('simpleModal');
// Get open modal closeButtonElement
var modalBtn = document.getElementById('modalBtn');
// Get close closeButton
var closeBtn = document.getElementByClassName('closeBtn')[0];


// Listen for open Click
modalBtn.addEventListener('click', openModal);
// Listen for close Click
modalBtn.addEventListener('click', closeModal);
// Listen for outside Click
window.addEventListener('click', outsideClick);

// Function to open modalBtn
function openModal(){
  modal.style.display = 'block';
}

// Function to close modalBtn
function closeModal(){
  modal.style.display = 'none';
}

// Function to close modalBtn if oustide click
function outsideClick(){
  if(e.target == modal){
    modal.style.display = 'none';
  }
}
}



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

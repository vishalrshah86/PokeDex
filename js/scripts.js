let pokemonRepository = (function () {
  //added IIFE function
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("introduce a valid object");
    }
  }


  function getAll() {
    return pokemonList;
  }


  function addListItem(pokemon) {
    loadDetails(pokemon).then(function() {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      let pokemonImage = document.createElement("img");
      pokemonImage.setAttribute("alt", "A pokemon picture");
      pokemonImage.classList.add("pokemon-image");
      pokemonImage.src = pokemon.imageUrl;

      let pokemonName =  pokemon.name;

      button.innerText = pokemon.name;
      button.classList.add("tab", "btn", "btn-seconday");
      listItem.classList.add("group-list-item");
      listItem.appendChild(button);
      button.appendChild(pokemonImage);
      pokeList.appendChild(listItem);


      button.addEventListener('click', function () {
        showDetails(pokemon);
      });
    });
  }



  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon, type);
    });
  }

  let modalContainer = document.querySelector(".modal-content");


  // modal using bootstrap
  function showModal (pokemon, type) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();


    let nameElement = $("<h1>" + pokemonName + "</h1>");
    let imageElementFront = $('<img class="modal-img" style="width:75%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:75%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
    let pokemonType = document.createElement("img");
    pokemonType.classList.add("type-image");
    pokemonType.src = "./images/" + type + ".png";


    modalTitle.append(pokemonName);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonType);

    $("#exampleModalCenter").modal();

  }

  // modal in vanilaJS
  /*function showModal(pokemon) {
  let modalContainer = document.querySelector('#modal-container');

  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let pokemonName = document.createElement('h1');
  pokemonName.innerText = pokemon.name;

  let pokemonType = document.createElement('p');
  pokemonType.innerText = 'Type(s): ' + pokemon.types.map((x) => x.type.name).join(', ');

  let pokemonHeight = document.createElement('p');
  pokemonHeight.innerText = 'Height: ' + pokemon.height;


  let pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemon-modal-image');
  pokemonImage.src = pokemon.imageUrl;

  modal.appendChild(closeButtonElement);
  modal.appendChild(pokemonName);
  modal.appendChild(pokemonType);
  modal.appendChild(pokemonHeight);
  modal.appendChild(pokemonImage);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}

function hideModal() {
let modalContainer = document.querySelector('#modal-container');
modalContainer.classList.remove('is-visible');
}

document.querySelector('#show-modal').addEventListener('click', () => {
showModal();
});

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
*/

function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.Url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  });
}


function loadDetails(item) {
  let Url = item.detailsUrl;
  return fetch(Url).then(function (response) {
    return response.json();
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}



return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  //showModal: showModal,
  //  hideModal: hideModal,
};
})();


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

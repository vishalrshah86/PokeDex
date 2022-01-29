let pokemonRepository = (function () {
  //added IIFE function
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#exampleModal');

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Please enter a valid object");
    }
  }


  function getAll() {
    return pokemonList;
  }


  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    listItem.classList.add('listItem-class');
    button.innerText = pokemon.name;
    button.classList.add('button-class');

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    loadDetails(pokemon).then(function () {
      let imageDiv = document.createElement('div');
      let pokemonImage = document.createElement('img');
      pokemonImage.src = pokemon.imageUrl;
      pokemonImage.classList.add('pokemon-image');

      imageDiv.appendChild(pokemonImage);
      button.appendChild(imageDiv);
    })


    button.addEventListener('click', function () {
      showDetails(pokemon, modalContainer);
    });
  }



  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }



  // modal using bootstrap
  function showModal (pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    //let modalHeader = $(".modal-header");


    modalBody.empty();
    modalTitle.empty();

    let pokemonName = $("<h1>" + pokemonName + "</h1>");
    let pokemonImageFront = $('<img class="modal-img" style="width:50%">');
    pokemonImageFront.attr("src", pokemon.imageUrlFront);
    let pokemonImageBack = $('<img class="modal-img" style="width:50%">');
    pokemonImageBack.attr("src", pokemon.imageUrlBack);
    let pokemonHeight = $("<p>" + "height : " + pokemon.height + "</p>");
    let pokemonType = document.createElement("p");
    let typesCon = ''
    pokemon.types.forEach(element => {
      typesCon += `${element.type.name},`
    });
    pokemonType.innerText = 'Type(s): ' + typesCon;


    modalTitle.append(pokemonName);
    modalBody.append(pokemonImageFront);
    modalBody.append(pokemonImageBack);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonType);

    $("#exampleModalCenter").modal();

  }



  $(document).ready(function(){
    $("#search-pokemon").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".button-class").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

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
  showModal: showModal,
  //  hideModal: hideModal,
};
})();


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

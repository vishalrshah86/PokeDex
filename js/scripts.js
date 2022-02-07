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
    let pokemonList = $(".pokemon-list");
    let listItem = $("<li class='listItem-class'></li>");
    let button = $("<button class='button-class'>${pokemon.name}</button>");

    listItem.append(button);
    pokemonList.append(listItem);

    loadDetails(pokemon).then(function () {
      let imageDiv = $('<div></div>');
      let pokemonImage = $('<img>${pokemon.imageUrl}</img>');

      imageDiv.append(pokemonImage);
      button.append(imageDiv);
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

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $("<h1>" + pokemon.name + "</h1>");
    let pokemonImage = $('<img class="modal-img" style="width:50%">');
    pokemonImage.attr("src", pokemon.imageUrl);
    let pokemonHeight = $("<p>" + "height : " + pokemon.height + "</p>");
    let pokemonType = document.createElement("p");
    let typesCon = ''
    pokemon.types.forEach(element => {
      typesCon += `${element.type.name},`
    });
    pokemonType.innerText = 'Type(s): ' + typesCon;

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonType);

    $("#exampleModal").modal();
  }


  $(document).ready(function(){
    $("#search-pokemon").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".button-class").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

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
};
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

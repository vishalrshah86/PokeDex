let pokemonList = [
 {name: "Clefable", height: 1, types: ['grass','speed']},
 {name: 'Pikachu', height: 1.5, types: ['water','speed']},
 {name: 'Sandshrew', height: 2.3, types: ['ice','speed']}
];

for (let i = 0; i < pokemonList.length; i++) {
    // write the Pokémon name on your website’s DOM.
  document.write(pokemonList[i].name +  "(height:" + pokemonList[i].height + ")");

  //Checking if pokemon height is greater than 1.5 m
if (pokemonList[i].height > 1.5) {
 //if pokemon height is greater than 1.6 m, writes "Wow that's big!"
  document.write(" - Wow, that's big!");
  }

 //Adding linebreaks after each pokemon name
  document.write("<br><br>");
  }

let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150";document.querySelector("#exampleModal");function n(t){"object"==typeof t&&"name"in t?e.push(t):console.log("Please enter a valid object")}function o(e){a(e).then(function(){i(e)})}function i(e){let t=$(".modal-body"),n=$(".modal-title");n.empty(),t.empty();let o=$("<h1>"+e.name+"</h1>"),i=$('<img class="modal-img" style="width:50%">');i.attr("src",e.imageUrl);let a=$("<p>height : "+e.height+"</p>"),l=document.createElement("p"),c="";e.types.forEach(e=>{c+=`${e.type.name},`}),l.innerText="Type(s): "+c,n.append(o),t.append(i),t.append(a),t.append(l),$("#exampleModal").modal()}function a(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types}).catch(function(e){console.error(e)})}return $(document).ready(function(){$("#search-pokemon").on("keyup",function(){var e=$(this).val().toLowerCase();$(".button-class").filter(function(){$(this).toggle($(this).text().toLowerCase().indexOf(e)>-1)})})}),{add:n,getAll:function(){return e},addListItem:function(e){let t=$(".pokemon-list"),n=$("<li class= 'listItem-class'></li>"),i=$("<button class= 'button-class'>${pokemon.name}</button>");n.append(i),t.append(n),a(e).then(function(){let e=$("<div></div>"),t=$("<img>${pokemon.imageUrl}</img>");e.append(t),i.append(e)}),i.addEventListener("click",function(){o(e)})},loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:a,showDetails:o,showModal:i}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`
    );
    const data = await res.json();

    // console.table(data.results);

    const allLinks = data.results.map((e) => e.url);

    const fetchAll = (async () => {
      const res = await Promise.all(allLinks.map((u) => fetch(u)));
      const jsons = await Promise.all(res.map((r) => r.json()));

      const pokemon = jsons.map((p) => {
        return {
          id: p.id,
          name: p.name,
          height: p.height,
          hp: p.stats[0].base_stat,
          attack: p.stats[1].base_stat,
          defense: p.stats[2].base_stat,
          speed: p.stats[5].base_stat,
          weight: p.weight,
          types: p.types.map((e) => e.type.name),
          img: p.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
          API: "api",
        };
      });

      localStorage.setItem("pokemons", JSON.stringify(pokemon));
      displayPokemon();
    })();

    fetchAll;
  } catch (error) {
    console.log(error);
  }
};

// **************DISPLAY******************

const displayPokemon = () => {
  let pokemon;

  let apiPokemon = JSON.parse(localStorage.getItem("pokemons"));
  let createdPokemon = JSON.parse(localStorage.getItem("createdPokemon"));
  let filterPokemon = JSON.parse(localStorage.getItem("filterPokemon"));
  let createdPokemonArray = JSON.parse(
    localStorage.getItem("createdPokemonArray")
  );

  if (filterPokemon) pokemon = filterPokemon;
  else if (createdPokemon) pokemon = createdPokemonArray;
  else pokemon = apiPokemon;

  // console.log(pokemon);
  const card = document.getElementById("pokemons_container");
  const pokemonHTMLString = pokemon
    .map(
      (e) => `

  <div class="card_container">
  <div class="card_top">
  <h2>${e.name}</h2>
</div>
    <div class="card_rest">
          <div class="card_rest-img">
                  <img src="${e.img}"/>
            </div>
    <div class="card_rest-info">
    <div class="card_rest-info_details">
    <h3>Attack: ${e.attack}</h3>
    
    <h3>HP: ${e.hp}</h3>
    </div>
    <div class="card_rest-info_types">
    <h3>Types: ${e.types}</h3>
    </div>
    </div>

</div>
  </div>

  `
    )
    .join("");

  card.innerHTML = pokemonHTMLString;
};

// ********************FILTERS************************

function handleOrderName() {
  let type = document.getElementById("handleOrderName").value;

  let apiPokemon = JSON.parse(localStorage.getItem("pokemons"));

  let createdPokemonArray = JSON.parse(
    localStorage.getItem("createdPokemonArray")
  );


  if (createdPokemonArray) filtered = createdPokemonArray;
  else filtered = apiPokemon;

  let videogamesOrder = [];

  if (type === "asc_name") {
    videogamesOrder = filtered.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  } else if (type === "desc_name") {
    videogamesOrder = filtered.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
  }
  // console.log(videogamesOrder);

  localStorage.setItem("filterPokemon", JSON.stringify(videogamesOrder));

  displayPokemon();
}

// ************************************************

function handleOrderAttack() {
  let type = document.getElementById("handleOrderAttack").value;
 

  let apiPokemon = JSON.parse(localStorage.getItem("pokemons"));

  let createdPokemonArray = JSON.parse(
    localStorage.getItem("createdPokemonArray")
  );

  if (createdPokemonArray) filtered = createdPokemonArray;
  else filtered = apiPokemon;


  let videogamesOrder = [];

  if (type === "asc_rating") {
    videogamesOrder = filtered.sort((a, b) => a.attack - b.attack);
  } else if (type === "desc_rating") {
    videogamesOrder = filtered.sort((a, b) => b.attack - a.attack);
  }
  // console.log(videogamesOrder);
  
  localStorage.setItem("filterPokemon", JSON.stringify(videogamesOrder));
  displayPokemon();
}

// *************************************************************

function handleFilter() {
  let type = document.getElementById("handleFilter").value;


  let apiPokemon = JSON.parse(localStorage.getItem("pokemons"));
  
  let createdPokemonArray = JSON.parse(
    localStorage.getItem("createdPokemonArray")
  );

  if (createdPokemonArray) filtered = createdPokemonArray;
  else filtered = apiPokemon;

  // let filtered = JSON.parse(localStorage.getItem("pokemons"));
  let videogamesOrder = [];

  videogamesOrder = filtered.filter((game) => game.types.includes(type));
  // console.log(videogamesOrder);
  // displayPokemon(videogamesOrder)

  localStorage.setItem("filterPokemon", JSON.stringify(videogamesOrder));

  displayPokemon();
}

// *****************************CLEAR FILTER**************************

function clearFilter() {
  localStorage.setItem("filterPokemon", null);
  displayPokemon();
}

// *******************************SOURCE FILTER***************************

function handleCreator() {
  let type = document.getElementById("handleCreator").value;

  // console.log(type);

  let filtered = JSON.parse(localStorage.getItem("createdPokemonArray"));

  let videogamesOrder = [];

  videogamesOrder = filtered.filter((e) => e.API === type);
  // console.log(videogamesOrder);

  localStorage.setItem("filterPokemon", JSON.stringify(videogamesOrder));

  displayPokemon();
}


// ********************************SEARCH********************************

let input = document.getElementById("search_bar");

input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        document.getElementById("inputButton").click();
    }
});


function search() {
  let name = document.getElementById("search_bar").value.toLowerCase();
  document.getElementById("search_bar").value = "";
  

  let filtered = JSON.parse(localStorage.getItem("createdPokemonArray"));

  let videogamesOrder = [];

  videogamesOrder = filtered.filter((e) => e.name.includes(name));
  // console.log(videogamesOrder);

  localStorage.setItem("filterPokemon", JSON.stringify(videogamesOrder));

  displayPokemon();


}

// *****************************GET DATA FORM**************************************


document.querySelector('form')
  .addEventListener('submit',e=>{
    e.preventDefault()
    const data= Object.fromEntries(
      new FormData(e.target)
    )
    let checkboxes = document.getElementsByName("types"); 
    let typesArray = []
    checkboxes.forEach(e=>{
        if(e.checked == true){
            console.log(e.value);
            typesArray.push(e.value)
        }
    })

   const form_values =JSON.parse(JSON.stringify(data))
   console.log(form_values);

const createdPokemon = {
    name: form_values.name,
         
          hp: form_values.hp,
          attack: form_values.attack,
          
          types: typesArray,
          img: "https://res.cloudinary.com/dr8u3dssn/image/upload/v1657991499/pokemon_m8jyk3.png",
          API: "user"

}

   localStorage.setItem("createdPokemon", JSON.stringify(createdPokemon));

   let pokemonsArray = JSON.parse(localStorage.getItem("pokemons"));
   pokemonsArray.unshift(createdPokemon)
   console.log(pokemonsArray);
   localStorage.setItem("createdPokemonArray", JSON.stringify(pokemonsArray));

    alert(form_values)
  })





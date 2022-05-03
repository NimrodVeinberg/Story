//document.getElementById("carrousel").src = "./";

async function getPokemonData() {
  return await fetch("http://localhost:8081/pokemon")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function createDiv(className, parentElement, textContent) {
  const newDiv = document.createElement("div");

  if (className) {
    // debugger;
    for (let i = 0; i < className.length; i++) {
      newDiv.classList.add(`${className[i]}`);
    }
  }
  parentElement
    ? parentElement.appendChild(newDiv)
    : document.body.appendChild(newDiv);
  textContent ? (newDiv.textContent = `${textContent}`) : "";

  return newDiv;
}

// Time bar
function createBarElement() {
  createDiv(["proggress-bar"]);
}

function CreateCardElement(pokemonObjData, cardsDiv) {
  // Should have a parent of div Cards and not body
  const cardContainerDiv = createDiv(["card-container"]);
  createDiv(["top-card-info"], cardContainerDiv, `Hp ${pokemonObjData.hp}`);
  const img = document.createElement("img");
  img.setAttribute("src", pokemonObjData.img);
  cardContainerDiv.appendChild(img);
  createDiv(["pokemon-name"], cardContainerDiv, pokemonObjData.name);
  const pokemonTypeDetails = createDiv(
    ["pokemon-type", "details"],
    cardContainerDiv
  );
  for (let i = 0; i < pokemonObjData?.types.length; i++) {
    createDiv(null, pokemonTypeDetails, [pokemonObjData?.types[i]]);
  }
  const pokemonProperties = createDiv(
    ["pokemon-properties", "details"],
    cardContainerDiv
  );
  const dataProperties = [
    { attack: pokemonObjData.attack },
    { defense: pokemonObjData.defense },
    { speed: pokemonObjData.speed },
  ];
  dataProperties.forEach((element, i) => {
    const propertiesDiv = createDiv(["properties"], pokemonProperties);
    console.log(element);
    createDiv(
      [`properties-${i}`, `font-properties`],
      propertiesDiv,
      Object.values(element)
    );
    createDiv(null, propertiesDiv, `${Object.keys(element)}`);
  });
}

(async function createDomPage() {
  const allCardsDiv = createDiv(["cards"]);
  createBarElement();
  const data = await getPokemonData();
  const dataPokemons = data.data;
  console.log(dataPokemons);
  for (let i = 0; i < dataPokemons.length; i++) {
    CreateCardElement(dataPokemons[i], allCardsDiv);
  }
})();

//document.getElementById("carrousel").src = "./";

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

function CreateCardElement() {
  // Should have a parent of div Cards and not body
  const cardContainerDiv = createDiv(["card-container"]);
  createDiv(["top-card-info"], cardContainerDiv, "Hp 50");
  const img = document.createElement("img");
  img.setAttribute(
    "src",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
  );
  cardContainerDiv.appendChild(img);
  createDiv(["pokemon-name"], cardContainerDiv, "Magneton");
  const pokemonTypeDetails = createDiv(
    ["pokemon-type", "details"],
    cardContainerDiv
  );
  //   cardContainerDiv;
  createDiv(null, pokemonTypeDetails, "electric");
  createDiv(null, pokemonTypeDetails, "steel");
  const pokemonProperties = createDiv(
    ["pokemon-properties", "details"],
    cardContainerDiv
  );
  for (i = 1; i <= 3; i++) {
    const propertiesDiv = createDiv(["properties"], pokemonProperties);
    // Should have different text
    createDiv([`properties-${i}`, `font-properties`], propertiesDiv, "60");
    // Should have different text
    createDiv(null, propertiesDiv, "Attak");
  }
}

(function createDomPage() {
  createBarElement();
  CreateCardElement();
})();

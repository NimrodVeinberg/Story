const enumObject = {
  default: "gray",
  fire: "indianred",
  grass: "aquamarine",
  water: "cornflowerblue",
  electric: "gold",
  flying: "white",
  poison: "crimson",
};

async function getPokemonData() {
  return await fetch("http://localhost:8081/pokemon")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function createDiv(className, parentElement, textContent) {
  const newDiv = document.createElement("div");

  if (className) {
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

// Progress bar
function createBarElement(picturesNumber) {
  const progressBorder = createDiv(["progress-border"]);
  for (let i = 0; i < picturesNumber; i++) {
    // debugger;
    let progressStaticBar = createDiv(["progress-bars"], progressBorder);
    progressStaticBar.style.width = `${100 / picturesNumber}vw`;
  }
  const progressDynamicBar = createDiv(["progress-bar"], progressBorder);
  progressDynamicBar.style.width = `${100 / picturesNumber}vw`;
}

// change the progress bar
function changeProgressBar(picturesNumber) {
  progressBar = document.querySelector(".progress-bar");
  let width = 0;
  let currentPictureNumber = 1;
  function progressBarAnimation() {
    width++;
    if (width >= 100 / picturesNumber) {
      // debugger;
      scrollStory();
      const progressStaticListBars =
        document.querySelectorAll(".progress-bars");
      console.log(progressStaticListBars);
      progressStaticListBars[currentPictureNumber - 1].style.backgroundColor =
        "orange";
      progressBar.style.left = `${
        (100 / picturesNumber) * currentPictureNumber
      }vw`;
      createDiv(["progress-bar-completed"]).style.width = 100 / picturesNumber;
      width = 0;
      currentPictureNumber++;
      if (currentPictureNumber > picturesNumber) {
        clearInterval(progressInterval);
      }
    }
    progressBar.style.width = `${width}%`;
  }
  const progressInterval = setInterval(progressBarAnimation, 190);
}
let moveLeft = 0;

function scrollStory() {
  // let cards = document.querySelector(".cards");
  // let bar = document.querySelector(".card-container");
  let screenWidth = screen.width;
  // console.log(moveLeft);
  moveLeft += screenWidth;
  window.scroll({
    left: moveLeft,
    behavior: "smooth",
  });
  // window.scrollTo(0, document.body.scrollWidth);
  // cards.scrollWidth += 10;
  // cards.scrollRight;
}

function addEventListener() {
  let cards = document.querySelector(".cards");
  cards.addEventListener("click", stopScroll);
  cards.addEventListener("mouseup", mouseUp);
  cards.addEventListener("drag", drag);
  cards.addEventListener("touchstart", touchStart);
  cards.addEventListener("touchEnd", touchEnd);
}

function stopScroll() {
  console.log("stopScroll");
  cards = document.querySelector(".cards");
}

function mouseUp() {
  console.log("mouseUp");
  const cards = document.querySelector(".cards");
}

function drag() {
  console.log("drag");
  // const cards = document.querySelector(".cards");
  // cards.style.align = "start";
}

function touchStart() {
  console.log("touchStart");
}

function touchEnd() {
  console.log("touchEnd");
}

function CreateCardElement(pokemonObjData, cardsDiv) {
  const cardContainerDiv = createDiv(["card-container"], cardsDiv);
  const topCardShape = createDiv(["top-card-shape"], cardContainerDiv);
  const cardColor = enumObject[pokemonObjData?.types[0]]
    ? enumObject[pokemonObjData?.types[0]]
    : enumObject["default"];
  topCardShape.style.backgroundColor = cardColor;
  cardContainerDiv.style.borderColor = cardColor;
  createDiv(["top-card-info"], cardContainerDiv, `Hp ${pokemonObjData.hp}`);
  const img = document.createElement("img");
  img.setAttribute("src", pokemonObjData.img);
  cardContainerDiv.appendChild(img);
  createDiv(
    ["pokemon-name", "font-properties"],
    cardContainerDiv,
    pokemonObjData.name
  );
  const pokemonTypeDetails = createDiv(["details"], cardContainerDiv);
  for (let i = 0; i < pokemonObjData?.types.length; i++) {
    createDiv(["pokemon-type"], pokemonTypeDetails, [
      pokemonObjData?.types[i],
    ]).style.backgroundColor = cardColor;
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
    createDiv(
      [`properties-${i}`, `font-properties`],
      propertiesDiv,
      Object.values(element)
    );
    createDiv(["bottom-properties"], propertiesDiv, `${Object.keys(element)}`);
  });
}
(async function createDomPage() {
  const allCardsDiv = createDiv(["cards"]);
  // var cardsWidth = window.innerWidth * 14;
  // allCardsDiv.style.width = `${cardsWidth}px`;
  const { data } = await getPokemonData();
  const dataPokemons = data;
  createBarElement(dataPokemons.length);
  changeProgressBar(dataPokemons.length);
  addEventListener();
  for (let i = 0; i < dataPokemons.length; i++) {
    CreateCardElement(dataPokemons[i], allCardsDiv);
  }
})();

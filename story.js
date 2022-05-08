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
  console.log(picturesNumber);
  for (let i = 0; i < picturesNumber; i++) {
    // debugger;
    let progressBar = createDiv(["progress-bars"], progressBorder);
    progressBar.style.width = `${100 / picturesNumber}vw`;
  }
  const progressBar = createDiv(["progress-bar"], progressBorder);
  progressBar.style.width = `${100 / picturesNumber}vw`;
  // createDiv(["progress-bar"], progressBorder);
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
      progressBar.style.left = `${(100 / 13) * currentPictureNumber}vw`;
      width = 0;
      currentPictureNumber++;
      // clearInterval(progressBarAnimation);
    }
    progressBar.style.width = `${width}%`;
  }
  setInterval(progressBarAnimation, 50);
}
let moveLeft = 0;

function scrollStory() {
  // let cards = document.querySelector(".cards");
  // let bar = document.querySelector(".card-container");
  let screenWidth = screen.width;
  // console.log(moveLeft);
  moveLeft += screenWidth;
  // debugger;
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
  cards.addEventListener("touchstart", touchStart);
}

// let cardPos;

function stopScroll() {
  console.log("stopScroll");
  cards = document.querySelector(".cards");
  // cardPos = cards.getBoundingClientRect();
  // console.log(cardPos);
}

function mouseUp() {
  console.log("mouseUp");
  const cards = document.querySelector(".cards");
  // cards.style.top = cardPos.top;
  // cards.style.x = cardPos.x;
  // cards.style.y = cardPos.y;
}

function dragOver() {
  console.log("dragOver");
  const cards = document.querySelector(".cards");
  cards.style.align = "start";
}

function touchStart() {}

function CreateCardElement(pokemonObjData, cardsDiv) {
  // debugger;
  const cardContainerDiv = createDiv(["card-container"], cardsDiv);
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

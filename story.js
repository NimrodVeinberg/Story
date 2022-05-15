var stopInterval = false;
const enumObject = {
  default: "gray",
  fire: "indianred",
  grass: "aquamarine",
  water: "cornflowerblue",
  electric: "gold",
  flying: "white",
  poison: "crimson",
};

function cardIntersctionObserver() {
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const targets = document.querySelectorAll(".card-container");
  console.log(targets);
  for (let i = 0; i < targets.length; i++) {
    let cardObserver = new IntersectionObserver(handleIntersectCard, options);
    cardObserver.observe(targets[i]);
  }
}

function handleIntersectCard(enteries, observer) {
  enteries.forEach((entry) => {
    console.log(entry);
  });
}

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
    if (currentPictureNumber > picturesNumber || stopInterval) {
      clearInterval(progressInterval);
    }
    width++;
    if (width >= 100 / picturesNumber) {
      // debugger;
      scrollStory();
      const progressStaticListBars =
        document.querySelectorAll(".progress-bars");
      progressStaticListBars[currentPictureNumber - 1].style.backgroundColor =
        "orange";
      progressBar.style.left = `${
        (100 / picturesNumber) * currentPictureNumber
      }vw`;
      createDiv(["progress-bar-completed"]).style.width = 100 / picturesNumber;
      width = 0;
      currentPictureNumber++;
    }
    progressBar.style.width = `${width}%`;
  }
  const progressInterval = setInterval(progressBarAnimation, 190);
}
let moveLeft = 0;

function scrollStory() {
  let cards = document.querySelector(".cards");
  let cardContainer = document.querySelector(".card-container");
  // Need to understand why the window
  // let screenWidth = window.innerWidth;
  let screenWidth = cardContainer.clientWidth;
  // window.innerWidth < screen.width ? window.innerWidth : screen.width;
  console.log(moveLeft);
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
  let allCardsContainers = document.querySelectorAll(".card-container");
  allCardsContainers.forEach((element) => {
    console.log(element);

    // cards.addEventListener("click", stopScroll);
    element.addEventListener("dragstart", (e) => e.preventDefault());
    element.addEventListener("touchstart", touchStart);
    element.addEventListener("mousedown", touchStart);
    element.addEventListener("mouseup", touchEnd);
    element.addEventListener("mouseleave", touchEnd);
    element.addEventListener("touchend", touchEnd);
    element.addEventListener("mousemove", mouseMove);
  });
}

function dragStart(e) {
  console.log("dragStart");
  stopInterval = true;
  e.preventDefault();
}

function touchStart() {
  console.log("touchStart");
  stopInterval = true;
}

function mouseMove() {
  console.log("touchStart");
  stopInterval = true;
}

function touchEnd() {
  console.log("touchEnd");
}

function CreateCardElement(pokemonObjData, cardsDiv) {
  const cardContainer = createDiv(["card-container"], cardsDiv);
  const cardDiv = createDiv(["card"], cardContainer);
  const topCardShape = createDiv(["top-card-shape"], cardDiv);
  const cardColor = enumObject[pokemonObjData?.types[0]]
    ? enumObject[pokemonObjData?.types[0]]
    : enumObject["default"];
  topCardShape.style.backgroundColor = cardColor;
  cardDiv.style.borderColor = cardColor;
  createDiv(["top-card-info"], cardDiv, `Hp ${pokemonObjData.hp}`);
  const img = document.createElement("img");
  img.setAttribute("src", pokemonObjData.img);
  cardDiv.appendChild(img);
  createDiv(["pokemon-name", "font-properties"], cardDiv, pokemonObjData.name);
  const pokemonTypeDetails = createDiv(["details"], cardDiv);
  for (let i = 0; i < pokemonObjData?.types.length; i++) {
    createDiv(["pokemon-type"], pokemonTypeDetails, [
      pokemonObjData?.types[i],
    ]).style.backgroundColor = cardColor;
  }
  const pokemonProperties = createDiv(
    ["pokemon-properties", "details"],
    cardDiv
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
  for (let i = 0; i < dataPokemons.length; i++) {
    CreateCardElement(dataPokemons[i], allCardsDiv);
  }
  addEventListener();
  cardIntersctionObserver();
})();

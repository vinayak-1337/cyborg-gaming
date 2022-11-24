const mobileNavOpen = document.querySelector("#mobile-nav-open");
const mobileNavClose = document.querySelector("#mobile-nav-close");
const headerRight = document.querySelector("#header__right");
const gameList = document.querySelector("#game-list");

mobileNavOpen.addEventListener("click", () => {
  headerRight.style.width = "130px";
});

mobileNavClose.addEventListener("click", () => {
  headerRight.style.width = "0";
});

async function fetchGamesData() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a4f8b06da6msh92455035e1ac775p15e6eejsnad144ad41e61",
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(
      "https://rawg-video-games-database.p.rapidapi.com/games?key=cf5e35876a3546608b18bd8bc95faa6a&page_size=40&ordering=-rating",
      options
    );
    const data = await response.json();
    addItemToList(data.results);
  } catch (error) {
    console.log(error);
  }
}

function createElementWithClass(tagName, ...className) {
  const element = document.createElement(tagName);
  if (typeof className === "string") {
    element.classList.add(className);
  } else {
    element.classList.add(...className);
  }
  return element;
}
function createElementWithId(tagName, idName) {
  const element = document.createElement(tagName);
  element.setAttribute("id", idName);
  return element;
}

function renderGameList(data) {
  const gameData = data.slice(0, 8);

  function gameCard({ name, background_image, genres }) {
    const gameItem = createElementWithClass("div", "game-item");
    const gameImg = document.createElement("img");
    const gameContent = createElementWithClass("div", "game-content");
    const gameContentLeft = createElementWithClass("div", "game-content-left");
    const gameTitle = createElementWithClass("h4", "game-title");
    const gamePublisher = createElementWithClass("p", "game-publisher");
    const gameContentRight = createElementWithClass(
      "div",
      "game-content-right"
    );
    const gameWishlist = createElementWithClass("p", "game-wishlist");
    const wishlistIcon = createElementWithClass("i", "fa-regular", "fa-heart");
    const gamePlayed = createElementWithClass("p", "game-played");
    const playedIcon = createElementWithClass(
      "i",
      "fa-regular",
      "fa-circle-check"
    );

    gameImg.setAttribute("src", background_image);
    gameTitle.innerText = name;
    gamePublisher.innerText = genres[0].name;
    gameContentLeft.append(gameTitle, gamePublisher);
    gameWishlist.append(wishlistIcon, " Wishlist");
    gamePlayed.append(playedIcon, " Played");
    gameContentRight.append(gameWishlist, gamePlayed);
    // gameContent.append(gameContentLeft, gameContentRight);

    gameItem.append(gameImg, gameContentLeft, gameContentRight);
    gameList.append(gameItem);
  }
  gameData.forEach(gameCard);
}

fetchGamesData();

const mobileNavOpen = document.querySelector("#mobile-nav-open");
const mobileNavClose = document.querySelector("#mobile-nav-close");
const headerRight = document.querySelector("#header__right");
const popularList = document.querySelector("#popular-list");
const homeTab = document.querySelector("#home-tab");
const profileTab = document.querySelector("#profile-tab");
const wishlist = document.querySelector("#wishlist");
const gamingLibrary = document.querySelector("#game-played");
const browseTab = document.querySelector("#browse-tab");

let localWishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];
let localPlayedGames = JSON.parse(sessionStorage.getItem("playedGames")) || [];

let localWishlist = JSON.parse(sessionStorage.getItem("wishlist")) || [];
let localPlayedGames = JSON.parse(sessionStorage.getItem("gamePlayed")) || [];

mobileNavOpen.addEventListener("click", () => {
  headerRight.style.transform = "scaleX(1)";
  headerRight.style.transformOrigin = "left";
  document.body.style.overflow = "hidden";
});

mobileNavClose.addEventListener("click", () => {
  headerRight.style.transform = "scaleX(0)";
  headerRight.style.transformOrigin = "right";
  document.body.style.overflow = "auto";
});

if (window.innerWidth < 993) {
  headerRight.addEventListener("click", () => {
    headerRight.style.transform = "scaleX(0)";
    headerRight.style.transformOrigin = "right";
    document.body.style.overflow = "auto";
  });
}

function openPage(e, page) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.style.display = "none";
  });
  const tabs = document.querySelectorAll(".nav-link");
  tabs.forEach((tab) => {
    tab.className = tab.className.replace("active-nav", "");
  });
  document.getElementById(page).style.display = "block";
  e.currentTarget.className += " active-nav";
}

homeTab.addEventListener("click", (e) => openPage(e, "home-page"));
browseTab.addEventListener("click", (e) => openPage(e, "browse-page"));
profileTab.addEventListener("click", (e) => {
  openPage(e, "profile-page");
  wishlist.innerText = "";
  gamingLibrary.innerText = "";
  if (!localWishlist.length) {
    wishlist.innerText = "No games right now";
  } else {
    renderGameList(localWishlist, wishlist);
  }
  renderGameList(localPlayedGames, gamingLibrary);
  updateWishlistCount();
});

async function fetchGamesData(order = "", size = 8) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a4f8b06da6msh92455035e1ac775p15e6eejsnad144ad41e61",
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(
      `https://rawg-video-games-database.p.rapidapi.com/games?key=cf5e35876a3546608b18bd8bc95faa6a&page_size=${size}&ordering=${order}`,
      options
    );
    const data = await response.json();
    // renderGameList(data.results, popularList);
    return data.results;
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

function updateWishlistCount() {
  const wishlistCount = document.querySelector("#wishlist-count");
  const gameCount = document.querySelector("#game-count");

  wishlistCount.innerText = localWishlist.length;
  gameCount.innerText = localPlayedGames.length;
}

function renderGameList(data, listContainer) {
  const gameData = data;

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
    const gamePlayed = createElementWithClass("p", "game-played");

    const isFoundInWishlist = localWishlist.find((game) => {
      return game.name === name;
    });
    let wishlistIcon;
    if (isFoundInWishlist) {
      wishlistIcon = createElementWithClass("i", "fa-solid", "fa-heart");
    } else {
      wishlistIcon = createElementWithClass("i", "fa-regular", "fa-heart");
    }
    const isFoundInPlayed = localPlayedGames.find((game) => {
      return game.name === name;
    });
    let playedIcon;
    if (isFoundInPlayed) {
      playedIcon = createElementWithClass("i", "fa-solid", "fa-circle-check");
    } else {
      playedIcon = createElementWithClass("i", "fa-regular", "fa-circle-check");
    }

    gameWishlist.addEventListener("click", () => {
      const icon = gameWishlist.children[0];
      icon.classList.toggle("fa-regular");
      icon.classList.toggle("fa-solid");
      if (localWishlist.length) {
        // check if wishlist include game
        const isFoundInWishlist = localWishlist.find((game) => {
          return game.name === name;
        });
        if (isFoundInWishlist) {
          const newLocalWishlist = localWishlist.filter((item) => {
            return item.name !== name;
          });
          localWishlist = [...newLocalWishlist];
        } else {
          localWishlist.push({
            name,
            background_image,
            genres,
          });
        }
      } else {
        const game = {
          name,
          background_image,
          genres,
        };
        localWishlist.push(game);
      }
      sessionStorage.setItem("wishlist", JSON.stringify(localWishlist));
      updateWishlistCount();
    });
    gamePlayed.addEventListener("click", () => {
      const icon = gamePlayed.children[0];
      icon.classList.toggle("fa-regular");
      icon.classList.toggle("fa-solid");
      if (localPlayedGames.length) {
        // check if game list include game
        const isFoundInPlayed = localPlayedGames.find((game) => {
          return game.name === name;
        });
        if (isFoundInPlayed) {
          const newLocalPlayedList = localPlayedGames.filter((item) => {
            return item.name !== name;
          });
          localPlayedGames = [...newLocalPlayedList];
        } else {
          localPlayedGames.push({
            name,
            background_image,
            genres,
          });
        }
      } else {
        const game = {
          name,
          background_image,
          genres,
        };
        localPlayedGames.push(game);
      }
      sessionStorage.setItem("playedGames", JSON.stringify(localPlayedGames));
      updateWishlistCount();
    });

    gameImg.setAttribute("src", background_image);
    gameTitle.innerText = name;
    gamePublisher.innerText = genres[0].name;
    gameContentLeft.append(gameTitle, gamePublisher);
    gameWishlist.append(wishlistIcon, " Wishlist");
    gamePlayed.append(playedIcon, " Played");
    gameContentRight.append(gameWishlist, gamePlayed);

    gameItem.append(gameImg, gameContentLeft, gameContentRight);
    listContainer.append(gameItem);
  }
  gameData.forEach(gameCard);
}

// fetchGamesData();

(async function () {
  const mostPopularData = await fetchGamesData("-rating", 8);
  renderGameList(mostPopularData, popularList);
  const gameLibraryData = await fetchGamesData("", 40);
  const gameLibraryContainer = document.querySelector("#game-library-list");
  renderGameList(gameLibraryData, gameLibraryContainer);
})();

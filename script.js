const resultsNav = document.getElementById("resultsNav");
const favouriteNav = document.getElementById("favNav");
const imageContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

const count = 1;
const apiKey = "DEMO_KEY";
const apiUrl =
  `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favourites = {};

function createDOMNodes(page) {
  const currentArray = page === "results"
    ? resultsArray
    : Object.values(favourites);
  console.log("Current Array", page, currentArray);
  currentArray.forEach((result) => {
    //Card
    const card = document.createElement("div");
    card.classList.add("card");
    //Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";
    //Image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    //Card Body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    //Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    //Save Text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add to Favourites";
    saveText.setAttribute("onclick", `saveFavourite("${result.url}")`);
    //Card Text
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    // Footer
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    //Date
    const date = document.createElement("strong");
    date.textContent = result.date;
    //Copyright
    const copyrightResult = result.copyright === undefined
      ? ""
      : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;
    //Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imageContainer.appendChild(card);
  });
}

function updateDOM(page) {
  if (localStorage.getItem("nasaFavourites")) {
    favourites = JSON.parse(localStorage.getItem("nasaFavourites"));
    console.log(favourites);
  }
  createDOMNodes(page);
}

// Get Images from NASA API
async function getNASAPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM("favourites");
  } catch (error) {
    //Catch Error Here
    console.log(error);
  }
}

function saveFavourite(itemUrl) {
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favourites[itemUrl]) {
      favourites[itemUrl] = item;
    }
    saveConfirmed.hidden = false;
    setTimeout(() => {
      saveConfirmed.hidden = true;
    }, 2000);
    localStorage.setItem("nasaFavourites", JSON.stringify(favourites));
  });
}

getNASAPictures();

const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl =
  `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${count}`;

let resultsArray = [];
// Get Images from NASA API
async function getNASAPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
  } catch (error) {
    //Catch Error Here
    console.log(error);
  }
}

getNASAPictures();

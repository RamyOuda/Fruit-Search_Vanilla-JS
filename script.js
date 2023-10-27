import { fruit } from "./fruit.js";

// Access DOM
const inputElement = document.querySelector("input");
const buttonElement = document.querySelector("button");
const ulElement = document.querySelector("ul");
const suggestionsElement = document.querySelector(".suggestions");

// Event Handlers
window.onload = resizeSuggestions;
window.onresize = resizeSuggestions;
buttonElement.onclick = reset;
inputElement.onkeyup = updateSuggestions;

// Update LIs in UL
function updateSuggestions() {
  clearSuggestions();

  const searchText = inputElement.value;

  if (searchText) {
    fruit.forEach((fruit) => {
      const upperSearchText = searchText.toUpperCase();
      const upperFruit = fruit.toUpperCase();

      if (upperFruit.includes(upperSearchText)) {
        const newLiElement = document.createElement("li");
        const boldFruit = formatFruit(fruit, searchText);

        newLiElement.innerHTML = boldFruit;
        newLiElement.onclick = () => selectSuggestion(fruit);

        suggestionsElement.style.padding = "16px";

        ulElement.append(newLiElement);
      }
    });
  }
}

// Bold the fruit text based on input - https://stackoverflow.com/a/47676769
function formatFruit(fruit, searchText) {
  return fruit.replace(new RegExp(searchText, "gi"), (str) => `<b>${str}</b>`);
}

// Set the suggestions element to have the same width as the input
function resizeSuggestions() {
  suggestionsElement.style.width = inputElement.offsetWidth + "px";
}

// Update input & suggestions when an LI is clicked
function selectSuggestion(fruit) {
  inputElement.value = fruit;
  clearSuggestions();
  searchImages(fruit);
}

// Clear the suggestions list
function clearSuggestions() {
  ulElement.innerHTML = "";
  suggestionsElement.style.padding = "0";
}

// Clear input and suggestions
function reset() {
  inputElement.value = "";
  updateSuggestions();
}

// Search selected fruit images on Google
function searchImages(fruit) {
  setTimeout(() => {
    window.open(`https://www.google.com/search?tbm=isch&q=${fruit}`, "_blank");
  }, 500);
}

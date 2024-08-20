
const main = document.getElementById("main");
const character = document.querySelector(".character");
const searchInput = document.getElementById("search");

let characterArray = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  console.log(value);
  characterArray.forEach((character) => {
    const isVisible = character.name.toLowerCase().includes(value);
    character.element.classList.toggle("hide", !isVisible);
  });
});

getCharacters();

function getCharacters() {
  fetch("https://aacw-harrypotter-backend-api.onrender.com/characters")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showCharacters(data);
    });
}

function showCharacters(data) {
  main.innerHTML = "";

  characterArray = data.map((character) => {
    const { name, image, alternate_names, species, gender, house, dateOfBirth, wiki } = character;
    const characterEl = document.createElement("div");
    characterEl.classList.add("character");

    characterEl.innerHTML = `
<div class="character-inner">
            <div class="front">
              <img src=${image} alt="a picture of a wizard" />
              <div class="character-info">
                <h3>${name}</h3>
              </div>
            </div>
            <div class="back">
              <h2>${name}</h2>
              <h3>Alt Names:</h3>
              <p>${alternate_names}</p>
              <h3>Species:</h3>
              <p>${species}</p>
              <h3>Gender:</h3>
              <p>${gender}</p>
              <h3>House:</h3>
              <p>${house}</p>
              <h3>Date of Birth:</h3>
              <p>${dateOfBirth}</p>

              <span id="learn"><a href="${wiki}" target="_blank">Learn More ></a></span>

            </div>
          </div>
        </div>
        `;

    main.appendChild(characterEl);
    return { name: character.name, element: characterEl };
  });
}

function handleError(imgElement) {
  imgElement.src = "images/wizard-icon.jpeg";
}

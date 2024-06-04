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
    const { name, image } = character;
    const characterEl = document.createElement("div");
    characterEl.classList.add("character");

    characterEl.innerHTML = `
        <div class="character-inner">
            <div class="front">
                <img src="${image}" alt="a picture of a ${name}">
                <div class="character-info">
                    <h3>${name}</h3>
                </div>
                </div>
                <div class="back">
                <h3>Back of the card</h3>
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

const main = document.getElementById('main');
const character = document.querySelector('.character');
const searchInput = document.getElementById('search');

let characterArray = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value)
    characterArray.forEach((character) => {
        const isVisible = character.name.toLowerCase().includes(value);
        character.element.classList.toggle("hide", !isVisible)
    })
})

getCharacters()

function getCharacters() {
    fetch("https://potterhead-api.vercel.app/api/characters").then(res=>res.json())
    .then(data=>{
        console.log(data)
        showCharacters(data)
    })
}

function showCharacters(data) {
    main.innerHTML='';

    characterArray = data.map(character => {
        const {name, image} = character
        const characterEl =document.createElement('div')
        characterEl.classList.add('character')
        characterEl.classList.add('front')

        characterEl.innerHTML=`
        <img src="${image}" alt="an image of ${name}" onerror="handleError(this)"/>
        <div class="character-info">
        <h3>${name}</h3>
        </div>
        `

        const characterBack =document.createElement('div')
        characterBack.classList.add('character')
        characterBack.classList.add('back')
        characterBack.innerHTML= `
        <h1>Back of the Card</h3>
        `
        main.appendChild(characterEl)
        main.appendChild(characterBack)
        return {name:character.name, element:characterEl}
    });
} 

function handleError(imgElement) {
    imgElement.src="images/wizard-icon.jpeg"
}

let allPokemons = []; 

let currentIndex = 1;



async function fetchMultiplePokemon(start, end) {
    let pokemons = []; 
    let container = document.getElementById("main");
    let pokemonHTML = "";
    showLoadingSpinner()

    for (let i = start; i <= end; i++) {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            let data = await response.json();
            pokemons.push(data); 
            allPokemons.push(data);
            console.log(`✅ Pokémon ${i} geladen:`, data.name);
            pokemonHTML += createPokemonCard(data, i);
        } catch (error) {
            console.error(`❌ Fehler bei Pokémon ${i}:`, error);
        }
    }
    container.innerHTML += pokemonHTML; 
    hideLoadingSpinner()
    document.querySelector(".load-more").style.display = "block";

    console.log("Alle geladenen Pokémon:", pokemons);
}




function showNextPokemon(i) {
    let container = document.getElementById("overlay");

    if (i < allPokemons.length) {
        let nextPokemon = allPokemons[i]; 
        container.innerHTML = getOverlayCard(i + 1, nextPokemon);
    }
    else {loadMorePokemon()}
}

function showLastPokemon(i) {
    let container = document.getElementById("overlay");

    if (i > 1) {  
        let previousPokemon = allPokemons[i - 2];  
        container.innerHTML = getOverlayCard(i - 1, previousPokemon);
    }

}

function init() {
    fetchMultiplePokemon(currentIndex, currentIndex + 19);

}


async function loadMorePokemon() {

    const loadMoreButton = document.querySelector('.load-more'); 


    loadMoreButton.disabled = true;
    
    showLoadingSpinner(); 

    currentIndex += 20; 
    await fetchMultiplePokemon(currentIndex, currentIndex + 19); 

    hideLoadingSpinner(); 


    
    loadMoreButton.disabled = false;
}


function showCard(i) {
    let container = document.getElementById("overlay");

    // Zugriff auf das Pokémon aus allPokemons
    const data = allPokemons[i - 1];  // Index anpassen (i - 1, da Array bei 0 beginnt)

    let pokemonHTML = getOverlayCard(i, data);  // Hier gehst du von der Funktion aus, die das Overlay generiert
    container.innerHTML = pokemonHTML;
    toggleDnone();
}


function toggleDnone() {
    let element = document.getElementById("overlay");  
    let currentDisplay = window.getComputedStyle(element).display;
    toggleScrollbar () 

    if (currentDisplay === "none") {
        element.style.display = "flex";

    } else {
        element.style.display = "none";
    }
    
}


function toggleScrollbar () {
let element = document.querySelector("body")
let currentOverflow = window.getComputedStyle(element).overflow;

if(currentOverflow === "hidden"){
element.style.overflow = "auto";
}
else {
    element.style.overflow = "hidden"
}

}




function filterPokemon() {
    let searchValue = document.getElementById("searchBar").value.toLowerCase();
    let allCards = document.querySelectorAll(".standard-card");

    if (searchValue.length < 3) {
        allCards.forEach(card => card.style.display = "flex"); 
        return;
    }

    allCards.forEach(card => {
        let pokemonName = card.querySelector(".card-header p:nth-child(2)").innerText.toLowerCase();
        if (pokemonName.includes(searchValue)) {
            card.style.display = "flex"; 
        } else {
            card.style.display = "none"; 
        }
    }); 
}
function showLoadingSpinner() {
    document.getElementById("loading-spinner").style.display = "block";
}

function hideLoadingSpinner() {
    document.getElementById("loading-spinner").style.display = "none";
}


function showDiv(divNumber) {
    const allDivs = document.querySelectorAll('.stat-info');
    allDivs.forEach(div => div.classList.add('d-none'));

    const selectedDiv = document.getElementById('stats' + divNumber);
    selectedDiv.classList.remove('d-none');
}


function addUnderline (number) {
    const allDivs=document.querySelectorAll('.nav-element');
    allDivs.forEach(div => div.classList.remove('underline-red'))

    const selectedDiv = document.getElementById("nav" + number)
    selectedDiv.classList.add ('underline-red')
}

function innerDivClick(event) {
    event.stopPropagation(); 
   
}



async function fetchEvolutionChain(pokemonName) {
    try {
        showEvolutionLoadingSpinner()
        const speciesUrl = await getSpeciesUrl(pokemonName);
        
        const evolutionChainUrl = await getEvolutionChainUrl(speciesUrl);
        
        const evolutionNames = await getEvolutionNames(evolutionChainUrl);
        
        const evolutionHTML = await generateEvolutionHTML(evolutionNames);

        document.getElementById("evolution-container").innerHTML = evolutionHTML;

    } catch (error) {
        console.error("❌ Fehler beim Abrufen der Evolution:", error);
    }
    hideEvolutionLoadingSpinner()
}

async function getSpeciesUrl(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    return data.species.url;
}

async function getEvolutionChainUrl(speciesUrl) {
    const response = await fetch(speciesUrl);
    const data = await response.json();
    return data.evolution_chain.url;
}

// 🔹 Funktion: Extrahiere die Namen der Evolutionen aus der Evolution-Chain
async function getEvolutionNames(evolutionChainUrl) {
    const response = await fetch(evolutionChainUrl);
    const data = await response.json();
    
    let evolutionChain = [];
    let evoStage = data.chain;

    // Durchlaufe die Evolution und speichere die Namen der Pokémon
    while (evoStage) {
        evolutionChain.push(evoStage.species.name);  // Speichere den Namen der Evolution
        evoStage = evoStage.evolves_to.length > 0 ? evoStage.evolves_to[0] : null;  // Gehe zur nächsten Evolutionsstufe
    }

    return evolutionChain;
}


async function generateEvolutionHTML(evolutionChain) {
    if (evolutionChain.length === 0) {
        return "<p>Keine Evolution verfügbar.</p>";
    }

    let evolutionHTML = "";
    

    for (let i = 0; i < evolutionChain.length; i++) {
        const pokemonData = await getPokemonData(evolutionChain[i]);  
        evolutionHTML += createEvolutionFigure(pokemonData);  

        if (i < evolutionChain.length - 1) {
            evolutionHTML += `<span style='font-size:20px;'>&#8667;</span>`;
        }
    }

    return evolutionHTML;
}


async function getPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.json(); 
}


function createEvolutionFigure(pokemonData) {
    return `
        <figure>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <figcaption>${capitalize(pokemonData.name)}</figcaption>
        </figure>`;
}


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function showEvolutionLoadingSpinner() {
    document.getElementById("evolution-spinner").style.display = "block";
}

function hideEvolutionLoadingSpinner() {
    document.getElementById("evolution-spinner").style.display = "none";
}


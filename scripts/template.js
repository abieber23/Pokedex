

    function createPokemonCard(data, i) {

        const jsonData = encodeURIComponent(JSON.stringify(data));

        const secondType = data.types[1] ? data.types[1].type.name : null;
        return ` 
            <div class="standard-card" onclick="showCard(${i})">
                <div class="card-header">
                    <p>#${i}</p>
                    <p>${data.name.toUpperCase()}</p>
                </div>

                <div class="card-content  ${data.types[0].type.name}">
                    <img src="${data.sprites.front_default}" alt="BIld" srcset="">
                </div>
                <div class="card-info">
                    <p class="oval ${data.types[0].type.name}">${data.types[0].type.name}</p>
                    ${secondType ? `<p class="oval ${secondType}">${secondType}</p>` : ""}
                </div>
            </div>

        `;
    }
    


function getOverlayCard(i, data) {

    const secondType = data.types[1] ? data.types[1].type.name : null;

    return ` 
    <div class="overlay-card" onclick="innerDivClick(event)">

                    
    <div class="overlay-card-header">
        <p>#${i}</p>
        <p>${data.name.toUpperCase()}</p>
        <button class="close" type="button" onclick="toggleDnone()">&#x2716;</button>
    </div>
    <div class="overlay-card-content ${data.types[0].type.name}">
        <img src="${data.sprites.front_default}" alt="BILD" srcset="">
    </div>
    <div class="overlay-card-info">
    <p class="oval ${data.types[0].type.name}">${data.types[0].type.name}</p>
    ${secondType ? `<p class="oval ${secondType}">${secondType}</p>` : ""}
    </div>

    <div class="nav-card">

        <div id="nav1" class="nav-element underline-red" onclick="showDiv(1), addUnderline (1)">
            <p>main</p>
        </div>

        <div id="nav2" class="nav-element" onclick="showDiv(2), addUnderline (2)">
            <p>stats</p>
        </div>

        <div id="nav3" class="nav-element" onclick="showDiv(3), addUnderline (3),  fetchEvolutionChain('${data.name}')">
            <p>evo chain</p>
        </div>



    </div>

    <div class="stat-info" id="stats1">

    <div class="stats">
    <div>
        <label for="height">Height:</label>
        <span id="height">${data.height / 10} m</span>
    </div>
    <div>
        <label for="weight">Weight:</label>
        <span id="weight">${data.weight} Kg</span>
    </div>
    <div>
        <label for="base-experience">Base experience:</label>
        <span id="base-experience">${data.base_experience} XP</span>
    </div>
    <div>
        <label for="abilities">Abilities:</label>
        <span id="abilities">${data.abilities.map(ability => ability.ability.name).join(", ")}</span>
    </div>
</div>


    </div>
    <div class="stat-info  d-none"" id="stats2">
    <div class="progress-bar">
    <div>
        <label for="hp">${data.stats[0].stat.name.toUpperCase()}</label>
        <progress id="hp" value="${data.stats[0].base_stat}" max="100"> 32% </progress>
    </div>
    <div>
        <label for="attack">${data.stats[1].stat.name.toUpperCase()}</label>
        <progress id="attack" value="${data.stats[1].base_stat}" max="100"> 32% </progress>
    </div>
    <div>
        <label for="defense">${data.stats[2].stat.name.toUpperCase()}</label>
        <progress id="defense" value="${data.stats[2].base_stat}" max="100"> 32% </progress>
    </div>
    <div>
        <label for="special-attack">${data.stats[3].stat.name.toUpperCase()}</label>
        <progress id="special-attack" value="${data.stats[3].base_stat}" max="100"> 32% </progress>
    </div>
    <div>
        <label for="special-defense">${data.stats[4].stat.name.toUpperCase()}</label>
        <progress id="special-defense" value="${data.stats[4].base_stat}" max="100"> 32% </progress>
    </div>
    <div>
        <label for="speed">${data.stats[5].stat.name.toUpperCase()}</label>
        <progress id="speed" value="${data.stats[5].base_stat}" max="100"> 32% </progress>
    </div>
    </div>

    </div>
    <div class="stat-info d-none" id="stats3">

    <div class="center" id="evolution-container">
    <div id="evolution-spinner" class="spinner" style="display:none;"></div>
    </div>
    </div>

    <div class="buttonsdiv">
    <button class="buttonnext" onclick="showLastPokemon(${i})">PREVIOUS</button>
    <button class="buttonnext" onclick="showNextPokemon(${i})">NEXT</button>
    
    </div>
    `;
}



function createMainStats (i, data){
    console.log(i, data);
}

function createDetailStats (i, data){
    console.log(i, data);
}

function createEvochain (i, data){
    console.log(i, data);
}
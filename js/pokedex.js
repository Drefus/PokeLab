// Lista Pokemon

let $botaoCarregar = $("#carregar");
$botaoCarregar.click(botaoAdicionar)
let numeroInicial = 1;
let numeroFinal = 12;
function botaoAdicionar(){
    numeroInicial += 12;
    numeroFinal += 12;
    fetchPokemonlista(numeroInicial,numeroFinal)
}
const getPokemonurl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

fetchPokemonlista(numeroInicial,numeroFinal)
function fetchPokemonlista(numeroInicial, numeroFinal) {
    const pokemonPromises = []

    for (let i = numeroInicial; i <= numeroFinal; i++) {
        pokemonPromises.push(fetch(getPokemonurl(i)).then(response => response.json()))
    }
    Promise.all(pokemonPromises)
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                let types = [];
                for (const tipo of pokemon.types) {
                types.push(`<td class="${tipo.type.name}">${tipo.type.name}</td>`);
            }
                accumulator += `
                <li class="elemento-lista">
                <img class="lista-imagem" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
                <span class="lista-id">#${("000" + pokemon.id).slice(-3)}</span>
                <h2 class="capitalized">${pokemon.name}</h2>
                <table>
                ${types.toString().replace(",","")}
                </table>
                </li>`
                return accumulator
            }, "")

            const ul = document.querySelector('#lista-pokedex>ul')
            ul.innerHTML += lisPokemons
        })
}
// Pesquisa o Pokemon

let $inputPokemon = $("#input-pokemon");
let $botaoPesquisar = $("#botao-pesquisar");
$botaoPesquisar.click(pesquisarPokemon);
$inputPokemon.keyup(verificarEnter);
function verificarEnter(e){
    if(e.key === "Enter"){
        pesquisarPokemon();
      }
}
function pesquisarPokemon(e) {
    let $inputPokemon = $("#input-pokemon");
    let pokemon = $inputPokemon.val();
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
        dataType: 'json',
        success: function (resposta) {
            let $balaoPokedex = $("#balao-pokedex");
            $balaoPokedex.html('');
            $(`<button id="fechar-pokedex">x</button>`).appendTo($balaoPokedex);
            $(`<h2 class="capitalized">${resposta.name} <span id="pokemon-id">#${("000" + resposta.id).slice(-3)}</span></h2>`).appendTo($balaoPokedex);
            $(`<img src="https://pokeres.bastionbot.org/images/pokemon/${resposta.id}.png">`).appendTo($balaoPokedex);
            $(`<ul id="stats"></ul>`).appendTo($balaoPokedex);
            let $stats = $("#stats");
            $("<li>Status:</li>").appendTo($stats);
            for (const stato of resposta.stats) {
                $(`<li>${stato.stat.name}: ${stato.base_stat}</li>`).appendTo($stats);
            }
            $(`<table class="clear"></table>`).appendTo($balaoPokedex);
            $("<tr><td>Tipos:</td></tr>").appendTo($balaoPokedex);
            $(`<tr id="types"></tr>`).appendTo($balaoPokedex);
            let $types = $('#types');
            for (const tipo of resposta.types) {
                $(`<td class="${tipo.type.name}">${tipo.type.name}</td>`).appendTo($types);
            }
            $(`<table></table>`).appendTo($balaoPokedex);
            $("<tr><td>Caracteristicas:</td></tr>").appendTo($balaoPokedex);
            $(`<tr id="caracteristicas"></tr>`).appendTo($balaoPokedex);
            let $caracteristicas = $('#caracteristicas');
            $(`<td class="fundo-basico">Altura: ${resposta.height/10} m</td>`).appendTo($caracteristicas);
            $(`<td class="fundo-basico">Peso: ${resposta.weight/10} kg</td>`).appendTo($caracteristicas);
            $(`<table></table>`).appendTo($balaoPokedex);
            $("<tr><td>Abilidades:</td></tr>").appendTo($balaoPokedex);
            $(`<tr id="abilidades"></tr>`).appendTo($balaoPokedex);
            let $abilidades = $('#abilidades');
            for (const abilidade of resposta.abilities) {
                $(`<td class="fundo-basico">${abilidade.ability.name}</td>`).appendTo($abilidades);
            }
            $balaoPokedex.css("display","block");
            let $botaoFecharPokedex = $("#fechar-pokedex");
            $botaoFecharPokedex.click(function(){
                $botaoFecharPokedex.click($balaoPokedex.css("display","none"));
            });
        }
    });
}

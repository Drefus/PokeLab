// Lista Pokemon
// Esta função esta bugada assim a lista esta ficando fora de ordem

let $botaoCarregar = $("#carregar");
$botaoCarregar.click(botaoAdicionar)
let numeroInicial = 0;
function botaoAdicionar(){
    numeroInicial += 12;
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${numeroInicial}`,
        dataType: 'json',
        success: adicionarPokedex
      });
}
$.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0',
    dataType: 'json',
    success: adicionarPokedex
  });
function adicionarPokedex(e){
    let pokemons = e.results;
    let lisPokemon = [];
    for (const pokemon of pokemons) {
        $.ajax({
            url: `${pokemon.url}`,
            dataType: 'json',
            success: function(resposta) {
                let $listaPokedexUl = $("#lista-pokedex>ul");
                let types = [];
                for (const tipo of resposta.types) {
                types.push(`<td id="${tipo.type.name}">${tipo.type.name}</td>`);
            }
                $(`<li class="elemento-lista" data-id="${resposta.id}">
                <img id="lista-imagem" src="https://pokeres.bastionbot.org/images/pokemon/${resposta.id}.png">
                <span id="lista-id">#${("000" + resposta.id).slice(-3)}</span>
                <h2>${resposta.name}</h2>
                <table>
                ${types.toString().replace(",","")}
                </table>
                </li>`).appendTo($listaPokedexUl);
            }
          });
    }
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
            $(`<h2>${resposta.name} <span id="pokemon-id">#${("000" + resposta.id).slice(-3)}</span></h2>`).appendTo($balaoPokedex);
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
                $(`<td id="${tipo.type.name}">${tipo.type.name}</td>`).appendTo($types);
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

const arrTiposEl = document.querySelectorAll("#tipos > img");
let balaoEl = document.querySelector("#tipo-balao")
for(tiposEl of arrTiposEl){
    tiposEl.addEventListener("click",mostrarTipo);
}
function mostrarTipo(e){
    let elemento = e.currentTarget;
    let balaoElTitulo = document.querySelector("#tipo-balao>h2");
    let balaoElImagem = document.querySelector("#tipo-balao>img");
    let balaoElParagrafo = document.querySelector("#tipo-balao>p");
    balaoElTitulo.innerHTML = `<h2>${elemento.dataset.tipo}</h2>`;
    balaoElImagem.src = elemento.dataset.img;
    balaoElParagrafo.innerHTML = `<p>${elemento.dataset.info}</p>`;
    balaoEl.style.display = "block";
}
const botaoFecharEl = document.querySelector("#botao-fechar");
botaoFecharEl.addEventListener("click",fecharBalao);
function fecharBalao(){
    balaoEl.style.display = "none";
}


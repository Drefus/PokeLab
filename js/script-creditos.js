
let fecharEl = document.querySelector("#fechar")
let creditosEl = document.querySelector("#creditos")
let botaoCreditos = document.querySelector("#botao-creditos")
botaoCreditos.addEventListener("click",function() {
    creditosEl.style.display = "block";
})
fecharEl.addEventListener("click",function() {
    creditosEl.style.display = "none";
})
let patoImg = document.querySelector("#pato")
let audio = document.querySelector("audio")
patoImg.addEventListener("click",function(){
    audio.src = "imgs/quack.mp3"
    audio.play()
})

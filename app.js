// Pega os elementos do HTML
const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");
const points = document.getElementById("points");
const bnt_restart = document.getElementById("bnt-restart");
const bnt_start = document.getElementById("bnt-start");
const high_score = document.getElementById("high-score");

let loop_game = null;
let jumping = 0; // Indica se o personagem está pulando
let counter = 0; // Contador de pontos
let max_score = localStorage.getItem("high_score") || 0; // Pega a maior pontuação já feita

// Quando a animação do buraco reinicia (chega no final e volta)
hole.addEventListener('animationiteration', () => {
    // Gera um valor aleatório para a posição do buraco (topo negativo)
    var random = -((Math.random() * 300) + 150); // entre -150 e -450
    hole.style.top = random + "px"; // Aplica ao buraco
    counter++; // Aumenta a pontuação
    points.textContent = "Points " + counter;
});

function make_visible() {
    
    block.style.animation = "block 2s infinite linear";
    hole.style.animation = "block 2s infinite linear";
    character.style.display = "block";
    points.style.display = "block";
    high_score.style.display = "block";
    hole.style.display = "block";
}

function make_invisible() {
    block.style.animation = "none";
    hole.style.animation = "none";
    character.style.display = "none";
    points.style.display = "none";
    high_score.style.display = "none";
    hole.style.display = "none";
}

// Inicia o jogo
function start() {

    if (loop_game != null) {
        clearInterval(loop_game);
    }

    bnt_start.style.display = "none";
    make_visible();
    high_score.textContent = "High Score: " + max_score;

    // Executa a cada 10 milissegundos
    loop_game = setInterval(function () {
        // Pega a posição atual do personagem
        let character_top = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

        // Aplica gravidade: se não estiver pulando, personagem cai
        if (jumping == 0) {
            character.style.top = (character_top + 3) + "px";
        }

        // Pega a posição horizontal do bloco
        let block_left = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        // Pega a posição vertical do buraco
        let hole_top = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));

        // Posição invertida do personagem em relação ao fundo do jogo
        let c_top = -(500 - character_top);

        let character_left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));

        // Verifica colisão:
        // 1. Se personagem tocou no chão (passou do fundo);
        // 2. Se personagem está na mesma posição horizontal do bloco; 
        // 3. Se está fora da área do buraco.
        if ((character_top > 480) || ((block_left < 20 + character_left) && (block_left + character_left > -50) && ((c_top < hole_top) || (c_top > hole_top + 150)))) {
            // Fim de jogo
            alert("Game over. Score: " + (counter));
            bnt_restart.style.display = "block";
            clearInterval(loop_game);
            loop_game = null;
            make_invisible();

            // Atualiza a maior pontuação já feita
            if (counter > max_score) {
                max_score = counter;
                localStorage.setItem("high_score", max_score);
            }

        }
    }, 10);
}

// Faz o personagem pular
function jump() {
    jumping = 1; // Indica que está pulando
    let jump_count = 0;

    // Executa a cada 10ms para simular o pulo
    let jump_interval = setInterval(function () {
        // Pega a posição do personagem
        let character_top = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

        // Enquanto não passou do topo e não alcançou altura máxima do pulo
        if ((character_top > 6) && (jump_count < 15)) {
            character.style.top = (character_top - 5) + "px"; // Sobe o personagem
        }

        // Quando atingir o limite do pulo
        if (jump_count > 20) {
            clearInterval(jump_interval); // Para de subir
            jumping = 0; // Permite que ele volte a cair
            jump_count = 0;
        }

        jump_count++; // Conta os passos do pulo
    }, 10);
}

document.addEventListener("keyup", jump);

bnt_start.addEventListener("click", start);

// Reinicia o jogo
function restart() {
    // Resetar personagem e pontuação
    character.style.top = "100px";
    counter = 0;
    points.textContent = "Points " + counter;

    // Ocultar botão de reinício
    bnt_restart.style.display = "none";

    // Começa o jogo
    start();
}

bnt_restart.addEventListener("click", restart);
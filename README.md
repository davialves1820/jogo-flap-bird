# 🕹️ Mini Flappy Game (HTML + CSS + JavaScript)

Um pequeno jogo inspirado no clássico Flappy Bird, onde o jogador controla um personagem que deve evitar obstáculos pulando por buracos em blocos em movimento. Criado inteiramente com HTML, CSS e JavaScript puro, ideal para aprendizado de lógica, animações e manipulação do DOM.

---

## 🚀 Como Jogar

- Clique na tela ou pressione qualquer tecla para o personagem **pular**.
- Evite colidir com os blocos pretos.
- Passe por cada buraco para ganhar pontos.
- O jogo termina se você tocar no chão ou em um bloco.
- Tente bater seu **high score**, que é salvo no `localStorage`.

---

## 🧠 Lógica do Jogo

- O personagem é afetado pela **gravidade** e pode pular para cima.
- Blocos pretos (com buracos brancos) se movem da direita para a esquerda.
- A posição do buraco é gerada aleatoriamente a cada ciclo.
- Pontuação aumenta a cada obstáculo superado.
- O `high score` é persistido no navegador.

---

## 📁 Estrutura de Arquivos

- **index.html**;
- **style.css**;
- **app.js**

---
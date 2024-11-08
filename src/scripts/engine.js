const emojis = [
  "🐱", "🐱", "🦝", "🦝", "🦊", "🦊", "🐶", "🐶", 
  "🐵", "🐵", "🦁", "🦁", "🐯", "🐯", "🐮", "🐮"
];
let openCards = [];
let timer;
let seconds = 0;
let minutes = 0;
let gameInProgress = false;
let gameFinished = false;

let shuffleEmojis = shuffle(emojis);

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function handleClick() {
  if (gameFinished) return; // Impede a interação após o jogo acabar

  if (openCards.length < 2 && !this.classList.contains("boxOpen") && !this.classList.contains("boxMatch")) {
    this.classList.add("boxOpen");
    openCards.push(this);

    // Inicia o timer se for o primeiro clique
    if (!gameInProgress) {
      gameInProgress = true;
      startTimer();
    }

    if (openCards.length == 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];
  checkGameEnd();
}

function checkGameEnd() {
  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    stopTimer();
    gameFinished = true;
    alert(`Você venceu! Tempo total: ${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
  }
}

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    document.getElementById('time').textContent = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetGame() {
  resetTimer();
  shuffleEmojis = shuffle(emojis);
  document.querySelector(".game").innerHTML = ''; // Limpa as cartas antigas

  for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
  }

  openCards = [];
  gameInProgress = false;
  gameFinished = false; // Reseta o estado do jogo
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  minutes = 0;
  document.getElementById('time').textContent = '00:00';
}

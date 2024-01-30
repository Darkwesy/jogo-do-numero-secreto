let drawnedNumbers = [];
const maxRange = 10;
let secretNumber = numberGenerator();
let tryCounts = 1;

function changeText(tag, text) {
  let field = document.querySelector(tag);
  field.innerHTML = text;
  responsiveVoice.speak(text, "Brazilian Portuguese Female", { rate: 1.2 });
}

function guessVerify() {
  let guess = document.querySelector("input").value;
  console.log(secretNumber);
  if (guess == secretNumber) {
    changeText("h1", "Parabens!");
    let guessWord = tryCounts > 1 ? "tentativas" : "tentativa";
    let message = `Você descobriu o número secreto com ${tryCounts} ${guessWord}.`;
    changeText("p", message);
  } else {
    if (guess > secretNumber) {
      changeText("p", "O número secreto é menor.");
    } else {
      changeText("p", "O número secreto é maior.");
    }
    tryCounts++;
    fieldClear();
  }
}

function numberGenerator() {
  let pickedNumber = parseInt(Math.random() * maxRange + 1);
  let drawnedNumberLength = drawnedNumbers.length;

  if (drawnedNumberLength == maxRange) {
    drawnedNumbers = [];
  }

  if (drawnedNumbers.includes(pickedNumber)) {
    return numberGenerator();
  } else {
    drawnedNumbers.push(pickedNumber);
    console.log(drawnedNumbers);
    return pickedNumber;
  }
}

function fieldClear() {
  let guess = document.querySelector('input');
  guess.value = '';
}

function restartGame() {
  initialMessage();
  fieldClear();
  secretNumber = numberGenerator();
  tryCounts = 1;
  document.querySelector("#reiniciar").setAttribute("disabled", true);
}

function initialMessage() {
  changeText("h1", "Jogo do número secreto!");
  changeText("p", `Escolha um número entre 1 e ${maxRange}.`);
}

initialMessage();
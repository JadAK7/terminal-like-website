import {
  helpMap,
  socialsMap,
  noCommandFound,
  bioText,
  riddle,
  asciiArt,
  congratsAscii,
} from "./messages.js";

const root = document.getElementById("root");
const promptText = "ubuntu@chopin:~$";
const textarea = document.getElementById("root");
const previous = document.getElementById("prev");
const pre = document.getElementById("pre");

function startup() {
  pre.textContent = asciiArt;
  const welcome = document.createElement("p");
  previous.appendChild(welcome);
  welcome.textContent = `Welcome to my website!\nType "help" for a list of commands`;
  keyboard();
}

function keyboard() {
  document.addEventListener("keydown", (e) => addLetter(e));
}

function addLetter(e) {
  if (e.key === "Enter") {
    enterCode();
    return;
  }
  if (e.key === "Backspace") {
    textarea.textContent = textarea.textContent.substring(
      0,
      textarea.textContent.length - 1
    );
  }
  if (
    (e.keyCode >= 48 && e.keyCode <= 57) ||
    (e.keyCode >= 65 && e.keyCode <= 90) ||
    e.keyCode === 32
  ) {
    textarea.innerText += e.key;
    return;
  }
  return;
}

function enterCode() {
  let message = textarea.textContent;
  const codeToPrevious = document.createElement("div");
  codeToPrevious.classList.add("previous");
  codeToPrevious.innerText = promptText + " " + message;
  previous.appendChild(codeToPrevious);
  textarea.textContent = "";
  respond(message);
}

function respond(message) {
  switch (message) {
    case "help":
      displayMap(helpMap);
      break;
    case "clear":
      clearConsole();
      break;
    case "socials":
      displayMap(socialsMap);
      break;
    case "bio":
      display(bioText);
      break;
    case "riddle":
      display(riddle);
      break;
    case "secret":
      display("Can you guess the riddle?");
      break;
    case "echo":
      display("CONGRATS!!!");
      congrats();
      break;
    default:
      display(noCommandFound);
      return;
  }
}

function displayMap(map) {
  const fullResponse = document.createElement("div");

  previous.appendChild(fullResponse);

  for (let i = 0; i < map.size; i += 2) {
    setTimeout(() => {
      let response = document.createElement("p");
      fullResponse.appendChild(response);

      let innerCommand = document.createElement("span");
      innerCommand.classList.add("command");
      innerCommand.textContent = map.get(i);

      response.appendChild(innerCommand);
      response.append(map.get(i + 1));
    }, 50 * i);
  }
}

function display(text) {
  let response = document.createElement("p");
  previous.appendChild(response);
  response.style.marginLeft = "1rem";
  response.textContent = text;
  if (text === "CONGRATS!!!") response.classList.add("dance");
}

function clearConsole() {
  textarea.textContent = "";
  previous.textContent = "";
  startup();
}

function congrats() {
  const congratsElement = document.createElement("pre");
  congratsElement.textContent = congratsAscii;
  previous.appendChild(congratsElement);
}

startup();

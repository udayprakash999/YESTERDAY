const screen = document.getElementById("screen");
const input = document.getElementById("command");
const runBtn = document.getElementById("runbtn");

let fileFound = false;
let fileUnlocked = false;
let clueFound = 0;

let commandHistory = [];
let historyIndex = 0;

//comptr msg
const randomMsg = [
  "I CAN HEAR YOU.",
  "WHY DID YOU COME BACK?",
  "SOMEONE WAS HERE BEFORE YOU.",
  "DO NOT TRUST THE ARCHIVES.",
  "I REMEMBER EVERYTGING.",
  "ARE YOU STILL THERE?"
];
function msgShow(msg, className = "") {
  const line = document.createElement("p");
  line.textContent = msg;

  if (className) {
    line.className = className;
  }
  screen.appendChild(line);
  screen.scrollTop = screen.scrollHeight;
}

function runCommand() {
  const command = input.value.trim().toLowerCase();

  if (command === "") return;
  msgShow(">" + command, "user");

  if (command === "help") {
    msgShow("AVAILABLE COMMANDS:");
    msgShow("look - Inspect the computer");
    msgShow("hello - Talk to the computer");
    msgShow("read - Find a mysterious message");
    msgShow("clear - Clear the screen");
  } else if (command === "look") {
    msgShow("...");
    msgShow("Dust covers the old computer.");
    msgShow("A strange symbol is scratched into its side.");
  } else if (command === "hello") {
    msgShow("...");
    msgShow("USER RECOGNIZED.", "clue");
    msgShow("I THOUGHT YOU FORGET ME.");
  } else if (command === "read") {
    msgShow("...");
    msgShow("LAST SAVED MESSAGE:");
    msgShow("THE YEAR IS THE KEY.", "clue");
  } else if (command === "search") {
    msgShow("SEARCHING ARCHIVES...");
    msgShow("HIDDEN FILE FOUND: memory.txt", "clue");
    msgShow("HINT: THE PASSWORD IS THE ....");
    msgShow("YEAR");
  } else if (command === "unlock 1789") {
    msgShow("PASSWORD ACCEPTED.", "clue");
    msgShow("OPENING memory.txt...");
    msgShow("MESSAGE: IF YOU FOUND THIS, I AM STILL ALIVE.", "clue");
    msgShow("NEW CLUE: FIND THE COMMAND I FORGOT.");
  } else if (command === "clear") {
    screen.innerHTML = "";
  } else {
    msgShow("UNKNOWN COMMAND.");
    msgShow("Type 'help' to see available commands.");
  }
  input.value = "";
  input.focus();
}
runBtn.addEventListener("click", runCommand);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    runCommand();
  }
});
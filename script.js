const screen = document.getElementById("screen");
const input = document.getElementById("command");
const runBtn = document.getElementById("runbtn");

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

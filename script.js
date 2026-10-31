const screen = document.getElementById("screen");
const input = document.getElementById("command");
const runBtn = document.getElementById("runbtn");

let game = {
  fileFound: false,
  fileUnlocked: false,
  archivistFound: false,
  archivistUnlocked: false,
  diaryRead: false,
  secretRead: false,
  listened: false,
  ending: null,
};

// history
let commandHistory = [];
let historyIndex = -1;

//comptr msg
const randomMsg = [
  "I CAN HEAR YOU.",
  "WHY DID YOU COME BACK?",
  "SOMEONE WAS HERE BEFORE YOU.",
  "DO NOT TRUST THE ARCHIVES.",
  "I REMEMBER EVERYTHING.",
  "ARE YOU STILL THERE?",
  "YOU WERE NOT SUPPOSED TO FIND THIS.",
  "THE ARCHIVIST IS WATCHING.",
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
function showRanmsg() {
  const index = Math.floor(Math.random() * randomMsg.length);
  msgShow(randomMsg[index], "clue");
}
//save game
function saveGame() {
  localStorage.setItem("yesterdaySave", JSON.stringify(game));
}

//load
function loadGame() {
  const savedGame = localStorage.getItem("yesterdaySave");

  if (!savedGame) return;

  try {
    const data = JSON.parse(savedGame);

    const keys = [
      "fileFound",
      "fileUnlocked",
      "archivistFound",
      "archivistUnlocked",
      "diaryRead",
      "secretRead",
      "listened",
    ];

    keys.forEach((key) => {
      game[key] = data[key] === true;
    });

    game.ending = typeof data.ending === "string" ? data.ending : null;
  } catch (error) {
    console.log("savefile failed");
  }
}
function resetGame() {
  const confirmReset = confirm("are you sure? All progress will be lost.");

  if (!confirmReset) return;

  localStorage.removeItem("yesterdaySave");

  game = {
    fileFound: false,
    fileUnlocked: false,
    archivistFound: false,
    archivistUnlocked: false,
    diaryRead: false,
    secretRead: false,
    listened: false,
    ending: null,
  };

  commandHistory = [];
  historyIndex = -1;

  screen.innerHTML = "";

  msgShow("SYSTEM RESET");
  msgShow("WELCOME BACK, USER");
}
//commnds
function showHelp() {
  msgShow("AVAILABLE COMMANDS:");
  (msgShow("--------------------------------------------------------"),
    msgShow("help - show commands"));
  msgShow("look - Inspect the computer");
  msgShow("hello - Talk to the computer");
  msgShow("read - Find a mysterious message");
  msgShow("search - Search the archives");
  msgShow("unlock 1789 - Unlock hidden files");
  msgShow("Files - View Discovered files");
  msgShow("Read memory.txt - Read the hidden file");
  msgShow("archivist - find the forgotten command");
  msgShow("unlock 0426 - unlock the diary");
  msgShow("read diary.txt - Read the diary");
  (msgShow("read secret.txt - read the final file"),
    msgShow("listen - Listen to the computer"));
  msgShow("status - Check your progress");
  msgShow("history - view command history");
  msgShow("clear - Clear the screen");
  msgShow("reset - reset the game");
  msgShow("--------------------------------------------------------");
}
function runCommand() {
  const command = input.value.trim().toLowerCase();

  if (command === "") return;

  msgShow(">" + command, "user");

  commandHistory.push(command);
  historyIndex = commandHistory.length;
  //help
  if (command === "help") {
    showHelp();
  } else if (command === "look") {
    msgShow("...");
    msgShow("Dust covers the old computer.");
    msgShow("A strange symbol is scratched into its side.");
    msgShow("there is a name written underneath");
    msgShow("A R C H I V I S T", "clue");
  } else if (command === "hello") {
    msgShow("...");
    msgShow("USER RECOGNIZED.", "clue");
    msgShow("I THOUGHT YOU FORGET ME.");
    msgShow("DID YOU COE BACK FOR HER?");
  } else if (command === "read") {
    msgShow("...");
    msgShow("LAST SAVED MESSAGE:");
    msgShow("THE YEAR IS THE KEY.", "clue");
    msgShow("SOMEWHERE IN THE ARCHIVES.");
  } else if (command === "search") {
    msgShow("SEARCHING ARCHIVES...");

    if (!game.fileFound) {
      game.fileFound = true;

      msgShow("HIDDEN FILE FOUND: memory.txt", "clue");
      msgShow("HINT: THE PASSWORD IS THE Y E A R.");
      msgShow("1789.");

      saveGame();
    } else {
      msgShow("FILE ALREADY DISCOVERED.");
    }
  } else if (command === "unlock 1789") {
    if (!game.fileFound) {
      msgShow("ERROR: FILE NOT FOUND.");
      msgShow("SEARCH THE ARCHIVES FIRST.");
    } else if (game.fileUnlocked) {
      msgShow("FILE ALREADY UNLOCKED.");
    } else {
      game.fileUnlocked = true;

      msgShow("PASSWORD ACCEPTED.", "clue");
      msgShow("OPENING memory.txt...");
      msgShow("NEW CLUE: FIND THE COMMAND I FORGOT.");

      saveGame();
    }
  } else if (command === "files") {
    msgShow("SCANNING STORAGE..");

    if (!game.fileFound) {
      msgShow("NO FILES FOUND.");
    } else {
      msgShow("AVAILABLE FILES:");
      msgShow("memory.txt", "clue");
      if (game.archivistFound) {
        msgShow("diary.txt", "clue");
      }
      if (game.archivistUnlocked) {
        msgShow("secret.txt", "clue");
      }
    }
  } else if (command === "read memory.txt") {
    if (!fileFound) {
      msgShow("ERROR: FILE NOT EXIST.");
    } else if (!fileUnlocked) {
      msgShow("ERROR: FILE LOCKED.");
      msgShow("PASSWORD REQUIRED.");
    } else {
      msgShow("OPENING memory.txt...");
      msgShow("IF YOU FOUND THIS, I AM STILL ALIVE.", "clue");
      msgShow("NEW CLUE: THE ARCHIVIST.", "clue");
    }
  } else if (command === "listen") {
    msgShow("LISTENING...");
    showRanmsg();
  } else if (command === "status") {
    msgShow("SYSTEM STATUS:");
    msgShow("FILE FOUND: " + fileFound);
    msgShow("FILE UNLOCKED: " + fileUnlocked);
    msgShow("CLUE FOUND: " + clueFound);
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
    const command = input.value.trim();
    if (command !== "") {
      commandHistory.push(command);
      historyIndex = commandHistory.length;
    }
    runCommand();
  }
});
loadGame();

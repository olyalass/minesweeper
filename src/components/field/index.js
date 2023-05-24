import "./style.scss";
import Tile from "../tile";
import createButton from "../../functions/createButton";
import stepSound from "../../../assets/sounds/step.ogg";
import stickSound from "../../../assets/sounds/stick.ogg";
import canSound from "../../../assets/sounds/can.ogg";
import chipsSound from "../../../assets/sounds/chips.ogg";
import flagSound from "../../../assets/sounds/flag.ogg";
import Table from "../table";

export default class Field {
  constructor() {
    this.item = document.createElement("div");
    this.item.classList.add("field");

    const panel = document.createElement("div");
    panel.classList.add("field__panel");
    this.container = document.createElement("div");
    this.container.classList.add("field__container");

    this.stepsCounter = document.createElement("h3");
    this.stepsCounter.classList.add("field__counter");
    this.steps = 0;
    this.stepsCounter.textContent = `Steps: ${this.steps}`;
    this.restartButton = createButton("Restart");
    this.timeCounter = document.createElement("h3");
    this.timeCounter.classList.add("field__counter");
    this.timeCounter.textContent = "00:00";
    this.soundButton = createButton("Sound off");
    panel.append(
      this.stepsCounter,
      this.restartButton,
      this.soundButton,
      this.timeCounter
    );

    this.board = document.createElement("div");
    this.board.classList.add("field__board");
    const hunter = document.createElement("img");
    hunter.setAttribute("src", require("../../../assets/images/elmer.png"));
    hunter.classList.add("field__hunter");
    const bunny = document.createElement("img");
    bunny.setAttribute("src", require("../../../assets/images/bunny.png"));
    bunny.classList.add("field__bunny");
    this.container.append(hunter, this.board, bunny);

    const soundsObj = {
      step: stepSound,
      stick: stickSound,
      can: canSound,
      chips: chipsSound,
      flag: flagSound,
    };
    Object.keys(soundsObj).forEach((key) => {
      this.createAudio(soundsObj[key], key);
    });

    this.tilesArr = [];
    this.isDark = false;

    this.size = 10;
    this.mines = 10;
    this.generateField(0, 0, this.size, this.mines);
    this.openedTiles = 0;
    this.openedTileXYs = [];
    this.flagedXYs = [];
    this.sound = true;

    const nav = document.createElement("div");
    nav.classList.add("field__panel");
    this.tableButton = document.createElement("button");
    this.tableButton.classList.add("button");
    this.tableButton.textContent = "See results";
    this.saveButton = document.createElement("button");
    this.saveButton.classList.add("button");
    this.saveButton.textContent = "Save the game";
    this.loadButton = document.createElement("button");
    this.loadButton.classList.add("button");
    this.loadButton.textContent = "Load the game";
    this.themeButton = document.createElement("button");
    this.themeButton.classList.add("button");
    this.themeButton.textContent = "Set dark theme";
    this.themeButton.addEventListener("click", () => this.changeTheme());
    nav.append(
      this.themeButton,
      this.saveButton,
      this.loadButton,
      this.tableButton
    );

    this.tableButton.addEventListener("click", () => {
      const table = new Table();
      this.resTable = table.item;
      this.item.append(this.resTable);
      if (this.isDark) {
        table.changeTheme();
      }

      this.resTable.addEventListener("click", () => this.resTable.remove());
    });

    this.soundButton.addEventListener("click", () => {
      if (this.sound) {
        this.sound = false;
        this.soundButton.textContent = "Sound on";
      } else {
        this.sound = true;
        this.soundButton.textContent = "Sound off";
      }
    });

    this.saveButton.addEventListener("click", () => this.saveState());

    this.loadButton.addEventListener("click", () => this.loadGame());

    this.item.append(panel, this.container, nav);

    this.createTiles();

    this.restartButton.addEventListener("click", () => {
      this.restart(this.size, this.mines);
    });
  }

  changeTheme() {
    this.themeHandler();
    this.board.classList.toggle("field__board_dark");
    this.tilesArr.forEach((e) => {
      e.tile.changeTheme();
    });
    if (this.isDark) {
      this.isDark = false;
      this.themeButton.textContent = "Set dark theme";
    } else {
      this.isDark = true;
      this.themeButton.textContent = "Set light theme";
    }
  }

  onThemeChange(handler) {
    this.themeHandler = handler;
  }

  createAudio(sound, id) {
    const audio = new Audio(sound);
    audio.classList.add("sound");
    audio.setAttribute("id", id);
    this.item.append(audio);
  }

  createTiles() {
    this.board.innerHTML = "";
    this.tilesArr = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let tile;
        if (this.array[i][j] === true) {
          tile = new Tile(true, this.array, i, j);
        } else {
          tile = new Tile(false, this.array, i, j);
        }
        if (this.isDark) {
          tile.changeTheme();
        }
        if (this.size === 15) {
          tile.item.classList.add("tile_m");
        }
        if (this.size === 25) {
          tile.item.classList.add("tile_s");
        }
        tile.onStepDone(this.handleStep.bind(this));
        tile.onFlag(this.handleFlag.bind(this));
        this.board.append(tile.item);
        const xy = `${i} ${j}`;
        this.tilesArr.push({ xy: xy, tile: tile });
      }
    }
  }

  generateField(reservedX, reservedY, size, mines) {
    this.size = size;
    this.mines = mines;
    const array = Array.from(Array(this.size), () => new Array(this.size));
    for (let i = 0; i < this.mines; i++) {
      let x = Math.floor(Math.random() * this.size);
      let y = Math.floor(Math.random() * this.size);
      while ((x === reservedX && y === reservedY) || array[x][y]) {
        x = Math.floor(Math.random() * this.size);
        y = Math.floor(Math.random() * this.size);
      }
      array[x][y] = true;
    }
    this.array = array;
    console.log("Cheetsheet: ");
    console.log(this.array);
  }

  handleFlag(x, y, isFlagged) {
    const flagObj = this.tilesArr.find((e) => e.xy === `${x} ${y}`);
    if (isFlagged) {
      this.flagedXYs.push(flagObj.xy);
    } else this.flagedXYs = this.flagedXYs.filter((e) => e !== `${x} ${y}`);
    if (this.sound) {
      flagObj.tile.playSound();
    }
  }

  handleStep(x, y, neigbourMines, wasClicked) {
    this.x = x;
    this.y = y;
    while (this.array[x][y] && this.steps === 0) {
      this.generateField(x, y, this.size, this.mines);
      this.createTiles();
    }

    if (this.steps === 0) {
      this.startTimer(0);
    }

    this.openedTiles += 1;
    const tileObj = this.tilesArr.find((e) => e.xy === `${x} ${y}`);
    tileObj.tile.revealTile();
    this.openedTileXYs.push(tileObj.xy);
    if (this.array[x][y]) {
      setTimeout(() => {
        this.handler(false);
        this.stopTimer();
      }, 1000);
    } else {
      if (this.openedTiles === this.size * this.size - this.mines) {
        this.handler(true, this.steps, this.timeCounter.textContent);
        this.stopTimer();
        this.saveVictory();
      } else {
        if (neigbourMines === 0) {
          if (y > 0) {
            this.tilesArr.find((e) => e.xy === `${x} ${y - 1}`).tile.openTile();
          }
          if (x > 0) {
            this.tilesArr.find((e) => e.xy === `${x - 1} ${y}`).tile.openTile();
          }
          if (y < this.size - 1) {
            this.tilesArr.find((e) => e.xy === `${x} ${y + 1}`).tile.openTile();
          }
          if (x < this.size - 1) {
            this.tilesArr.find((e) => e.xy === `${x + 1} ${y}`).tile.openTile();
          }
        }
      }
    }
    if (wasClicked) {
      if (this.sound) {
        tileObj.tile.playSound();
      }
      if (this.steps === 0) {
        alert(
          "Приветствую! Для удобства проверки чит с  расположением мин выведен в консоль с:"
        );
      }
      this.steps = this.steps + 1;
      this.stepsCounter.textContent = `Steps: ${this.steps}`;
    }
  }

  onGameEnd(handler) {
    this.handler = handler;
  }

  restart(size = this.size, mines = this.mines) {
    this.openedTiles = 0;
    this.generateField(0, 0, size, mines);
    this.createTiles();
    this.steps = 0;
    this.stepsCounter.textContent = `Steps: ${this.steps}`;
    this.stopTimer();
    this.timeCounter.textContent = "00:00";
    this.openedTileXYs = [];
  }

  startTimer(start) {
    this.time = start;
    clearInterval(this.interval);
    this.interval = setInterval(this.countSeconds.bind(this), 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  countSeconds() {
    this.time += 1;
    let secs, mins;
    if (this.time < 60) {
      mins = 0;
      secs = this.time;
    } else {
      secs = this.time % 60;
      mins = Math.floor(this.time / 60);
    }
    if (secs < 10) {
      if (mins < 10) {
        this.timeCounter.textContent = `0${mins}:0${secs}`;
      } else this.timeCounter.textContent = `${mins}:0${secs}`;
    } else {
      if (mins < 10) {
        this.timeCounter.textContent = `0${mins}:${secs}`;
      } else this.timeCounter.textContent = `${mins}:${secs}`;
    }
  }

  saveState() {
    const gameState = JSON.stringify({
      opened: this.openedTileXYs,
      time: this.time,
      steps: this.steps,
      size: this.size,
      array: this.array,
      timeString: this.timeCounter.textContent,
      flaged: this.flagedXYs,
      mines: this.mines,
    });
    localStorage.setItem("game", gameState);
  }

  loadGame() {
    if (
      localStorage.getItem("game") &&
      localStorage.getItem("game") !== "undefined"
    ) {
      const prevGame = JSON.parse(localStorage.getItem("game"));
      this.array = prevGame.array;
      this.time = prevGame.time;
      this.startTimer(this.time);
      this.timeCounter.textContent = prevGame.timeString;
      this.steps = prevGame.steps;
      this.stepsCounter.textContent = `Steps: ${this.steps}`;
      this.size = prevGame.size;
      this.openedTileXYs = prevGame.opened;
      this.flagedXYs = prevGame.flaged;
      this.mines = prevGame.mines;
      this.createTiles();
      this.openedTileXYs.forEach((coords) => {
        const target = this.tilesArr.find((e) => e.xy === coords).tile;
        target.silentRevealTile();
      });
      this.flagedXYs.forEach((coords) => {
        const target = this.tilesArr.find((e) => e.xy === coords).tile;
        target.flag();
      });
    }
  }

  saveVictory() {
    if (!localStorage.getItem("results")) {
      const array = JSON.stringify([
        {
          name: "Name",
          time: "Time",
          steps: "Steps",
          size: "Size",
          mines: "Mines",
        },
        {
          name: "player1",
          time: this.timeCounter.textContent,
          steps: this.steps,
          size: `${this.size}x${this.size}`,
          mines: this.mines,
        },
      ]);
      localStorage.setItem("results", array);
    } else {
      let array = JSON.parse(localStorage.getItem("results"));
      const result = {
        name: "player1",
        time: this.timeCounter.textContent,
        steps: this.steps,
        size: `${this.size}x${this.size}`,
        mines: this.mines,
      };
      array.splice(1, 0, result);
      if (array.length > 11) {
        array = array.slice(0, 11);
      }
      array = JSON.stringify(array);
      localStorage.setItem("results", array);
    }
  }
}

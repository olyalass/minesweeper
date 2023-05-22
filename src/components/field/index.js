import "./style.scss";
import Tile from "../tile";
import createButton from "../../functions/createButton";
import stepSound from "../../../assets/sounds/step.ogg";
import stickSound from "../../../assets/sounds/stick.ogg";
import canSound from "../../../assets/sounds/can.ogg";
import chipsSound from "../../../assets/sounds/chips.ogg";
import flagSound from "../../../assets/sounds/flag.ogg";

export default class Field {
  constructor() {
    this.item = document.createElement("div");
    this.item.classList.add("field");

    const panel = document.createElement("div");
    panel.classList.add("field__panel");
    const container = document.createElement("div");
    container.classList.add("field__container");

    this.stepsCounter = document.createElement("h3");
    this.stepsCounter.classList.add("field__counter");
    this.steps = 0;
    this.stepsCounter.textContent = `Steps: ${this.steps}`;
    this.restartButton = createButton("Restart");
    this.timeCounter = document.createElement("h3");
    this.timeCounter.classList.add("field__counter");
    this.timeCounter.textContent = "00:00";
    panel.append(this.stepsCounter, this.restartButton, this.timeCounter);

    this.board = document.createElement("div");
    this.board.classList.add("field__board");
    const hunter = document.createElement("img");
    hunter.setAttribute("src", require("../../../assets/images/elmer.png"));
    hunter.classList.add("field__hunter");
    const bunny = document.createElement("img");
    bunny.setAttribute("src", require("../../../assets/images/bunny.png"));
    bunny.classList.add("field__bunny");
    container.append(hunter, this.board, bunny);

    this.isStarted = false;
    this.size = 10;
    this.tilesArr = [];
    this.generateField(0, 0);
    this.createTiles();
    this.openedTiles = 0;

    this.item.append(panel, container);

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

    this.restartButton.addEventListener("click", () => {
      this.restart();
    });
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
        tile.onStepDone(this.handleStep.bind(this));
        this.board.append(tile.item);
        const xy = `${i} ${j}`;
        this.tilesArr.push({ xy: xy, tile: tile });
      }
    }
  }

  generateField(reservedX, reservedY) {
    const array = Array.from(Array(this.size), () => new Array(this.size));
    for (let i = 0; i < this.size; i++) {
      let x = Math.floor(Math.random() * this.size);
      let y = Math.floor(Math.random() * this.size);
      while (x === reservedX && y === reservedY) {
        x = Math.floor(Math.random() * this.size);
        y = Math.floor(Math.random() * this.size);
      }
      array[x][y] = true;
    }
    this.array = array;
  }

  handleStep(x, y, neigbourMines, wasClicked) {
    this.x = x;
    this.y = y;
    while (this.array[x][y] && this.steps === 0) {
      this.generateField(x, y);
      this.createTiles();
    }
    if (this.steps === 0) {
      this.startTimer();
    }

    this.openedTiles += 1;
    this.tilesArr.find((e) => e.xy === `${x} ${y}`).tile.revealTile();
    if (this.array[x][y]) {
      setTimeout(() => {
        this.handler(false);
        this.stopTimer();
      }, 1000);
    } else {
      if (this.openedTiles === this.size * (this.size - 1)) {
        this.handler(true, this.steps, this.timeCounter.textContent);
        this.stopTimer();
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
      this.steps = this.steps + 1;
      this.stepsCounter.textContent = `Steps: ${this.steps}`;
    }
  }

  onGameEnd(handler) {
    this.handler = handler;
  }

  restart() {
    this.openedTiles = 0;
    this.generateField(0, 0);
    this.createTiles();
    this.steps = 0;
    this.stepsCounter.textContent = `Steps: ${this.steps}`;
    this.stopTimer();
    this.timeCounter.textContent = "00:00";
  }

  startTimer() {
    this.time = 0;
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
}

import "./style.scss";
import Tile from "../tile";
import createButton from "../../functions/createButton";
import safeSound from "../../../assets/sounds/safe.ogg";
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

    const tile = new Tile();
    const mine = new Tile(false);
    this.board.append(tile.item, mine.item);

    this.item.append(panel, container);

    const soundsObj = {
      safe: safeSound,
      stick: stickSound,
      can: canSound,
      chips: chipsSound,
      flag: flagSound,
    };
    Object.keys(soundsObj).forEach((key) => {
      this.createAudio(soundsObj[key], key);
    });
  }

  createAudio(sound, id) {
    const audio = new Audio(sound);
    audio.classList.add("sound");
    audio.setAttribute("id", id);
    this.item.append(audio);
  }
}

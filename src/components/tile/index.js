import "./style.scss";

export default class Tile {
  constructor(isSafe = true) {
    this.item = document.createElement("div");
    this.item.classList.add("tile");
    const flagImg = document.createElement("img");
    flagImg.setAttribute("src", require("../../../assets/icons/flag.png"));
    flagImg.classList.add("tile__img");

    if (!isSafe) {
      const minesArr = [
        { img: require("../../../assets/icons/can.png"), soundId: "can" },
        { img: require("../../../assets/icons/stick.png"), soundId: "stick" },
        { img: require("../../../assets/icons/chips.png"), soundId: "chips" },
      ];
      const random = Math.floor(Math.random() * 3);
      this.soundId = minesArr[random].soundId;
      this.img = minesArr[random].img;
    }

    this.isOpened = false;

    this.item.addEventListener("click", () => {
      if (!this.isFlagged && !this.isOpened) {
        let audio;
        if (isSafe) {
          audio = document.getElementById("safe");
          this.item.classList.add("tile_opened");
        } else {
          this.item.classList.add("tile_mine");
          audio = document.getElementById(this.soundId);
          const img = document.createElement("img");
          img.classList.add("tile__img");
          img.setAttribute("src", this.img);
          this.item.appendChild(img);
        }
        audio.play();
        this.isOpened = true;
      }
    });
    this.item.addEventListener("contextmenu", (i) => {
      if (!this.isOpened) {
        i.preventDefault();
        let flag = document.getElementById("flag");
        flag.play();
        if (!this.isFlagged) {
          this.item.append(flagImg);
          this.isFlagged = true;
        } else {
          flagImg.remove();
          this.isFlagged = false;
        }
      }
    });
  }
}

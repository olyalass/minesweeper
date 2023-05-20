import "./style.scss";

export default class Tile {
  constructor(isMine, arr, x, y) {
    this.x = x;
    this.y = y;
    this.isMine = isMine;
    this.wasClicked = false;
    this.item = document.createElement("div");
    this.item.classList.add("tile");
    const flagImg = document.createElement("img");
    flagImg.setAttribute("src", require("../../../assets/icons/flag.png"));
    flagImg.classList.add("tile__img");

    if (isMine) {
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
    this.arr = arr;

    this.item.addEventListener("click", () => {
      this.wasClicked = true;
      this.openTile();
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

  openTile() {
    if (!this.isFlagged && !this.isOpened) {
      this.countMines();
      this.handler(this.x, this.y, this.mineCounter, this.wasClicked);
    }
  }

  revealTile() {
    let audio;
    if (!this.isMine) {
      const num = this.showMineCount();
      audio = document.getElementById("step");
      this.item.classList.add("tile_opened");
      this.item.innerHTML = "";
      this.item.append(num);
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

  onStepDone(handler) {
    this.handler = handler;
  }

  countMines() {
    this.mineCounter = 0;
    if (this.x > 0 && this.y > 0 && this.arr[this.x - 1][this.y - 1]) {
      this.mineCounter += 1;
    }
    if (this.x > 0 && this.arr[this.x - 1][this.y]) {
      this.mineCounter += 1;
    }
    if (this.y > 0 && this.arr[this.x][this.y - 1]) {
      this.mineCounter += 1;
    }
    if (
      this.x < this.arr.length - 1 &&
      this.y < this.arr.length - 1 &&
      this.arr[this.x + 1][this.y + 1]
    ) {
      this.mineCounter += 1;
    }
    if (this.x < this.arr.length - 1 && this.arr[this.x + 1][this.y]) {
      this.mineCounter += 1;
    }
    if (this.y < this.arr.length - 1 && this.arr[this.x][this.y + 1]) {
      this.mineCounter += 1;
    }
    if (
      this.x < this.arr.length - 1 &&
      this.y > 0 &&
      this.arr[this.x + 1][this.y - 1]
    ) {
      this.mineCounter += 1;
    }
    if (
      this.x > 0 &&
      this.y < this.arr.length - 1 &&
      this.arr[this.x - 1][this.y + 1]
    ) {
      this.mineCounter += 1;
    }
  }

  showMineCount() {
    const num = document.createElement("p");
    if (this.mineCounter > 0) {
      num.classList.add("tile__num");
      num.textContent = this.mineCounter;
      if (this.mineCounter === 1) {
        num.classList.add("tile__num_one");
      } else if (this.mineCounter === 2) {
        num.classList.add("tile__num_two");
      } else if (this.mineCounter === 3) {
        num.classList.add("tile__num_three");
      } else if (this.mineCounter === 4) {
        num.classList.add("tile__num_four");
      } else if (this.mineCounter === 5) {
        num.classList.add("tile__num_five");
      } else if (this.mineCounter === 6) {
        num.classList.add("tile__num_six");
      } else if (this.mineCounter === 7) {
        num.classList.add("tile__num_seven");
      } else if (this.mineCounter === 8) {
        num.classList.add("tile__num_eight");
      }
    }
    return num;
  }
}

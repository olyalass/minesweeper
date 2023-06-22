import "./style.scss";

export default class Instruction {
  constructor(isDark = false) {
    this.item = document.createElement("div");
    this.item.classList.add("instruction");
    const container = document.createElement("div");
    container.classList.add("instruction__container");
    const title = document.createElement("h2");
    title.classList.add("instruction__title");
    title.textContent = "Rules";
    const text = document.createElement("p");
    text.classList.add("instruction__text");
    text.innerHTML =
      "1. Elmer needs to catch the bunny, but he needs to keep silence. <br> 2.You need to clean all the safe tiles on the field to help Elmer. <br> 3. If you step on the tile with an object, it makes a load sound and bunny notices you. Then you lose. <br> 4. When you open an empty tile which is near to the object, if shows a number of neigbour objects <br> 5. You win, if you open all the empty tiles.";
    const img = document.createElement("img");
    img.classList.add("instruction__img");
    img.setAttribute(
      "src",
      require("../../../assets/images/elmer-fudd-very-quiet.gif")
    );
    this.item.append(container);
    container.append(title, text, img);

    this.item.addEventListener("click", () => this.item.remove());
    if (isDark) {
      container.classList.add("instruction__container_dark");
    }
  }
}

import "./style.scss";
import createButton from "../../functions/createButton";

export default class Footer {
  constructor() {
    this.item = document.createElement("footer");
    this.item.classList.add("footer");
    this.container = document.createElement("div");
    this.container.classList.add("footer__container");
    this.title = document.createElement("h4");
    this.title.classList.add("footer__title");
    this.title.textContent = "Sizes:";
    const buttons = document.createElement("div");
    buttons.classList.add("footer__sizes");
    this.item.append(this.container);
    this.container.append(this.title, buttons);

    const small = createButton("5x5");
    const medium = createButton("10x10");
    const large = createButton("20x20");
    buttons.append(small, medium, large);
  }

  changeTheme() {
    this.item.classList.toggle("footer_dark");
    this.container.classList.toggle("footer__container_dark");
    this.title.classList.toggle("footer__title_dark");
  }
}

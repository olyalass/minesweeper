import "./style.scss";
import createButton from "../../functions/createButton";

export default class Footer {
  constructor(isLight = true) {
    this.item = document.createElement("footer");
    this.item.classList.add("footer");
    const container = document.createElement("div");
    container.classList.add("footer__container");
    const title = document.createElement("h4");
    title.classList.add("footer__title");
    title.textContent = "Sizes:";
    const buttons = document.createElement("div");
    buttons.classList.add("footer__sizes");
    this.item.append(container);
    container.append(title, buttons);

    const small = createButton("5x5");
    const medium = createButton("10x10");
    const large = createButton("20x20");
    buttons.append(small, medium, large);

    if (!isLight) {
      this.item.classList.add("footer_dark");
      container.classList.add("footer__container_dark");
      title.classList.add("footer__title_dark");
      subtitle.classList.add("footer__subtitle_dark");
    }
  }
}

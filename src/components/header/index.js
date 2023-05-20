import "./style.scss";

export default class Header {
  constructor(isLight = true) {
    this.item = document.createElement("header");
    this.item.classList.add("header");
    const container = document.createElement("div");
    container.classList.add("header__container");
    const title = document.createElement("h1");
    title.classList.add("header__title");
    title.textContent = "RABBIT SEASON";
    const subtitle = document.createElement("h2");
    subtitle.classList.add("header__subtitle");
    subtitle.textContent = "MINESWEEPER";
    this.item.append(container);
    container.append(title, subtitle);
    if (!isLight) {
      this.item.classList.add("header_dark");
      container.classList.add("header__container_dark");
      title.classList.add("header__title_dark");
      subtitle.classList.add("header__subtitle_dark");
    }
  }
}

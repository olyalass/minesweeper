import "./style.scss";

export default class Header {
  constructor(isDark) {
    this.item = document.createElement("header");
    this.item.classList.add("header");
    this.container = document.createElement("div");
    this.container.classList.add("header__container");
    this.title = document.createElement("h1");
    this.title.classList.add("header__title");
    this.title.textContent = "RABBIT SEASON";
    this.subtitle = document.createElement("h2");
    this.subtitle.classList.add("header__subtitle");
    this.subtitle.textContent = "MINESWEEPER";
    this.item.append(this.container);
    this.container.append(this.title, this.subtitle);
    if (isDark) {
      this.item.classList.add("header_dark");
      this.container.classList.add("header__container_dark");
      this.title.classList.add("header__title_dark");
      this.subtitle.classList.add("header__subtitle_dark");
    }
  }

  changeTheme() {
    this.item.classList.toggle("header_dark");
    this.container.classList.toggle("header__container_dark");
    this.title.classList.toggle("header__title_dark");
    this.subtitle.classList.toggle("header__subtitle_dark");
  }
}

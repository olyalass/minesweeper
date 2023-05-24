import "./style.scss";
import createButton from "../../functions/createButton";

export default class Footer {
  constructor() {
    this.item = document.createElement("footer");
    this.item.classList.add("footer");
    this.container = document.createElement("div");
    this.container.classList.add("footer__container");
    this.size = document.createElement("div");
    this.size.classList.add("footer__wrap");
    this.title = document.createElement("h4");
    this.title.classList.add("footer__title");
    this.title.textContent = "Size:";
    const buttons = document.createElement("div");
    buttons.classList.add("footer__sizes");
    this.item.append(this.container);
    this.container.append(this.size);
    this.size.append(this.title, buttons);
    this.mines = 10;
    this.size = 10;

    const small = createButton("10x10");
    const medium = createButton("15x15");
    const large = createButton("25x25");
    const sizesArr = [];
    sizesArr.push(small, medium, large);
    sizesArr.forEach((e) => {
      e.addEventListener("click", () => {
        sizesArr.forEach((i) => i.classList.remove("button_active"));
        e.classList.add("button_active");
        if (e.textContent === "15x15") {
          this.size = 15;
        } else if (e.textContent === "25x25") {
          this.size = 25;
        } else {
          this.size = 10;
        }
      });
    });
    buttons.append(small, medium, large);

    const level = document.createElement("div");
    level.classList.add("footer__wrap");
    this.title2 = document.createElement("h4");
    this.title2.classList.add("footer__title");
    this.title2.textContent = "Mines: ";
    this.span = document.createElement("span");
    this.span.classList.add("footer__span");
    this.span.textContent = "10";
    this.title2.append(this.span);
    this.input = document.createElement("input");
    this.input.classList.add("footer__input");
    this.input.setAttribute("type", "range");
    this.input.setAttribute("min", 10);
    this.input.setAttribute("max", 99);
    this.input.setAttribute("value", 10);
    level.append(this.title2, this.input);

    this.submit = document.createElement("button");
    this.submit.classList.add("button");
    this.submit.textContent = "Generate new game";
    this.submit.addEventListener("click", () =>
      this.handler(this.size, this.mines)
    );

    this.container.append(level, this.submit);

    this.input.addEventListener("input", () => {
      this.span.textContent = this.input.value;
      this.mines = this.input.value;
    });
  }

  changeTheme() {
    this.item.classList.toggle("footer_dark");
  }

  onNewField(handler) {
    this.handler = handler;
  }
}

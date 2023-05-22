import "./style.scss";

export default class Table {
  constructor() {
    this.item = document.createElement("div");
    this.item.classList.add("table");

    const container = document.createElement("div");
    container.classList.add("table__container");
  }
}

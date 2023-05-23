import "./style.scss";

export default class Table {
  constructor() {
    this.item = document.createElement("div");
    this.item.classList.add("table");

    this.container = document.createElement("div");
    this.container.classList.add("table__container");
    this.item.append(this.container);

    const title = document.createElement("h2");
    title.classList.add("table__title");
    title.textContent = "Latest results";
    this.container.append(title);
    this.createList();
  }

  changeTheme() {
    this.container.classList.toggle("table__container_dark");
  }

  createList() {
    const list = document.createElement("ul");
    list.classList.add("table__list");
    if (localStorage.getItem("results")) {
      const info = JSON.parse(localStorage.getItem("results"));
      info.forEach((e) => {
        const li = document.createElement("li");
        li.classList.add("table__li");
        const name = document.createElement("span");
        name.classList.add("table__span");
        name.textContent = e.name;
        const time = document.createElement("span");
        time.classList.add("table__span");
        time.textContent = e.time;
        const steps = document.createElement("span");
        steps.classList.add("table__span");
        steps.textContent = e.steps;
        li.append(name, time, steps);
        list.append(li);
      });
    }
    this.container.append(list);
  }
}

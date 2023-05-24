import "./style.scss";
import Header from "./components/header";
import Field from "./components/field";
import Footer from "./components/footer";
import Result from "./components/result";

export default class App {
  constructor() {
    this.item = document.createElement("div");
    this.item.classList.add("app");
    this.header = new Header();
    this.field = new Field();
    this.field.onGameEnd(this.handleGameEnd.bind(this));
    this.footer = new Footer();
    this.item.append(this.header.item, this.field.item, this.footer.item);
    this.field.onThemeChange(this.handleThemeChange.bind(this));
    this.footer.onNewField(this.handleNewParams.bind(this));
  }

  handleGameEnd(isWinner, steps, time) {
    this.result = new Result(isWinner, time, steps);
    this.result.onRestart(this.handleRestart.bind(this));
    this.item.append(this.result.item);
  }

  handleRestart() {
    this.field.restart();
    this.result.item.remove();
  }

  handleNewParams(size, mines) {
    this.field.restart(size, mines);
  }

  handleThemeChange() {
    this.changeTheme();
  }

  changeTheme() {
    this.item.classList.toggle("app_dark");
    this.header.changeTheme();
    this.footer.changeTheme();
  }
}

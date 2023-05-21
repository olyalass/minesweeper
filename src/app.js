import "./style.scss";
import Header from "./components/header";
import Field from "./components/field";
import Footer from "./components/footer";
import Result from "./components/result";

export default class App {
  constructor() {
    this.item = document.createElement("div");
    this.item.classList.add("app");
    const header = new Header();
    this.field = new Field();
    this.field.onGameEnd(this.handleGameEnd.bind(this));
    const footer = new Footer();
    this.item.append(header.item, this.field.item, footer.item);
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
}

import "./style.scss";
import Header from "./components/header";
import Field from "./components/field";
import Footer from "./components/footer";

export default class App {
  constructor() {
    this.item = document.createElement("div");
    this.item.classList.add("app");
    const header = new Header();
    const field = new Field();
    const footer = new Footer();
    this.item.append(header.item, field.item, footer.item);
  }
}

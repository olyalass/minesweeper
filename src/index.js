import "./style.scss";
import App from "./app";

const body = document.querySelector("body");
const app = new App();
body.append(app.item);

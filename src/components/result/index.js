import "./style.scss";

export default class Result {
  constructor(isWinner, time, steps) {
    this.item = document.createElement("div");
    this.item.classList.add("result");
    const container = document.createElement("div");
    container.classList.add("result__container");
    const title = document.createElement("h2");
    title.classList.add("result__title");
    const img = document.createElement("img");
    img.classList.add("result__img");
    this.item.append(container);
    const text = document.createElement("h4");
    text.classList.add("result__text");
    container.append(title, img, text);
    if (isWinner) {
      title.textContent = "You won!";
      img.setAttribute(
        "src",
        require("../../../assets/images/conejo-bugs-bunny.gif")
      );
      text.textContent = `You found all the dangerous objects and caught the wabbit in ${time} and ${steps} moves!`;
    } else {
      title.textContent = "Game over";
      text.textContent =
        "You've been detected! Don't step on objects in future attempts";
      img.setAttribute(
        "src",
        require("../../../assets/images/looney-tunes-elmer.gif")
      );
    }
    this.button = document.createElement("button");
    this.button.classList.add("button");
    this.button.textContent = "Try again";
    container.append(this.button);

    this.button.addEventListener("click", () => this.handler());
  }

  onRestart(handler) {
    this.handler = handler;
  }
}

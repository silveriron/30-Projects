export class Keyboard {
  #containerEl;
  #switchEl;
  #fontEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;
  constructor() {
    this.#assignEl();
    this.#event();
  }

  #assignEl() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #event() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput.bind(this));
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onMouseUp() {
    this.#mouseDown = false;
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    const key = event.target.closest("div.key");
    key.classList.add("active");
    const isActive = !!key?.classList.contains("active");
    const val = key?.dataset.val;
    if (key && isActive && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if (key && isActive && val === "Space") {
      this.#inputEl.value += " ";
    }
    if (key && isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
  }

  #onInput(event) {
    this.#inputEl.value = event.target.value.replace(
      /[ㄱ-ㅎ,|ㅏ-ㅣ|가-힣]/,
      ""
    );
  }

  #onKeyUp(event) {
    this.#keyPress = false;
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove("active");
  }

  #onKeyDown(event) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ,|ㅏ-ㅣ|가-힣]/.test(event.key)
    );
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }
}

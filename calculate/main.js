class Calculate {
  fNum;

  sNum;

  method;

  result;

  inputEl;

  buttonsEl;

  constructor() {
    this.assignEl();
    this.addEvent();
    this.setInput();
  }

  assignEl() {
    this.inputEl = document.getElementById("input");
    this.buttonsEl = document.getElementById("buttons");
  }

  addEvent() {
    this.buttonsEl.addEventListener("click", this.inputValue.bind(this));
  }

  setInput() {
    if (this.fNum) {
      this.inputEl.value = `${this.fNum}${
        this.method ? ` ${this.method} ` : ""
      }${this.sNum ? `${this.sNum} ` : ""}${
        this.result ? ` = ${this.result}` : ""
      }`;
      return;
    }
    this.inputEl.value = 0;
  }

  inputValue(e) {
    const value = e.target.dataset.value;
    if (!value) {
      return;
    }

    if (Number.isInteger(+value)) {
      this.inputNumber(value);
      return;
    }

    if (value === "=") {
      this.getResult();
      return;
    }

    if (value === "C") {
      this.clearInput();
      return;
    }

    if (value === "<") {
      this.deleteNum();
      return;
    }

    this.inputMethod(value);
  }

  deleteNum() {
    if (this.sNum) {
      this.sNum = this.sNum.slice(0, -1);
    } else if (this.fNum && !this.method) {
      this.fNum = this.fNum.slice(0, -1);
    } else if (this.fNum && this.method) {
      this.method = null;
    }

    this.setInput();
  }

  clearInput() {
    this.fNum = this.sNum = this.method = this.result = null;
    this.setInput();
  }

  inputNumber(value) {
    if (this.fNum && this.method) {
      this.sNum ? (this.sNum += value) : (this.sNum = value);
    } else {
      this.fNum ? (this.fNum += value) : (this.fNum = value);
    }

    this.setInput();
  }

  inputMethod(value) {
    if (this.method || !this.fNum) {
      return;
    }
    this.method = value;
    this.setInput();
  }

  getResult() {
    if (this.result || !this.sNum) {
      return;
    }

    const fNum = +this.fNum;
    const sNum = +this.sNum;

    switch (this.method) {
      case "+":
        this.result = fNum + sNum;
        break;
      case "-":
        this.result = fNum - sNum;
        break;
      case "*":
        this.result = fNum * sNum;
        break;
      case "/":
        this.result = fNum / sNum;
    }

    this.setInput();
  }
}

new Calculate();

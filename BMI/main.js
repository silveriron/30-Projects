class Bmi {
  bmi;

  state;

  formEl;

  resultEl;

  meterEl;

  resetBtnEl;

  bmiEl;

  stateEl;

  constructor() {
    this.assignEl();
    this.addEvent();
  }

  assignEl() {
    this.formEl = document.querySelector("form");

    this.resultEl = this.formEl.querySelector(".result");

    this.meterEl = this.formEl.querySelector("meter");

    this.resetBtnEl = this.formEl.querySelector("#reset");

    this.bmiEl = this.formEl.querySelector("#bmi");

    this.stateEl = this.formEl.querySelector("#state");
  }

  addEvent() {
    this.formEl.addEventListener("submit", this.showResult.bind(this));
    this.resetBtnEl.addEventListener("click", this.reset.bind(this));
  }

  reset() {
    this.resultEl.style.display = "none";

    this.bmi = null;

    this.state = null;
  }

  showResult(e) {
    e.preventDefault();

    const w = e.target.w.value;
    const h = e.target.h.value;

    if (isNaN(w) || isNaN(h) || w < 0 || h < 0) {
      alert("invaliad value");
      return;
    }

    this.bmi = w / (h * h);
    this.state = "정상";

    if (bmi >= 23) {
      state = "과체중";
    } else if (bmi < 18.5) {
      state = "저체중";
    }

    this.bmiEl.textContent = this.bmi.toFixed(2);

    this.meterEl.value = this.bmi;

    this.stateEl.textContent = this.state;
    this.stateEl.style.color = this.state === "정상" ? "green" : "red";

    this.resultEl.style.display = "block";
  }
}

new Bmi();

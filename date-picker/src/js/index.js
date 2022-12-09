class DatePicker {
  monthData = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  #calendarDate = {
    data: "",
    date: 0,
    month: 0,
    year: 0,
  };

  selectedDate = {
    data: "",
    date: 0,
    month: 0,
    year: 0,
  };

  datePickerEl;

  dateInputEl;

  calendarEl;

  monthEl;

  contentEl;

  datesEl;

  prevEl;

  nextEl;

  constructor() {
    this.initCalendarDate();
    this.assignEl();
    this.addEvent();
    this.initSelecteDate();
  }

  initSelecteDate() {
    this.selectedDate = { ...this.#calendarDate };
    this.selectDate(this.selectedDate.data);
  }

  initCalendarDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    this.#calendarDate = {
      data,
      date,
      month,
      year,
    };
  }

  selectDate(data) {
    this.dateInputEl.textContent = this.formatDate(data);
    this.dateInputEl.dataset.value = data;
  }

  assignEl() {
    this.datePickerEl = document.querySelector("#date-picker");

    this.dateInputEl = this.datePickerEl.querySelector("#date-input");

    this.calendarEl = this.datePickerEl.querySelector("#calendar");

    this.contentEl = this.datePickerEl.querySelector("#content");

    this.datesEl = this.datePickerEl.querySelector("#dates");

    this.prevEl = this.datePickerEl.querySelector("#prev");

    this.nextEl = this.datePickerEl.querySelector("#next");
  }

  addEvent() {
    this.dateInputEl.addEventListener("click", this.toggleCalendar.bind(this));
    this.nextEl.addEventListener("click", this.moveToNext.bind(this));
    this.prevEl.addEventListener("click", this.moveToPrev.bind(this));
    this.datesEl.addEventListener("click", this.clickDate.bind(this));
  }

  clickDate(e) {
    if (e.target.dataset.date) {
      this.datesEl.querySelector(".selected")?.classList.remove("selected");
      e.target.classList.add("selected");
      const data = new Date(
        this.#calendarDate.year,
        this.#calendarDate.month,
        e.target.dataset.date
      );
      const date = data.getDate();
      const month = data.getMonth();
      const year = data.getFullYear();
      this.selectedDate = {
        data,
        date,
        month,
        year,
      };

      this.selectDate(data);
      this.toggleCalendar();
    }
  }

  formatDate(data) {
    let date = data.getDate();
    if (date < 10) {
      date = `0${date}`;
    }

    let month = data.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }

    const year = data.getFullYear();

    return `${year}/${month}/${date}`;
  }

  moveToNext() {
    this.#calendarDate.month++;
    if (this.#calendarDate.month > 11) {
      this.#calendarDate.year++;
      this.#calendarDate.month = 0;
    }
    this.renderDates();
  }

  moveToPrev() {
    this.#calendarDate.month--;
    if (this.#calendarDate.month < 0) {
      this.#calendarDate.year--;
      this.#calendarDate.month = 11;
    }
    this.renderDates();
  }

  toggleCalendar() {
    if (this.calendarEl.classList.contains("active")) {
      this.#calendarDate = { ...this.selectedDate };
    }
    this.calendarEl.classList.toggle("active");

    this.renderDates();
  }

  markCurrentDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();

    if (
      this.#calendarDate.year === year &&
      this.#calendarDate.month === month
    ) {
      this.datesEl
        .querySelector(`[data-date='${date}']`)
        .classList.add("today");
    }
  }

  updateMonth() {
    this.contentEl.textContent = `${this.#calendarDate.year} ${
      this.monthData[this.#calendarDate.month]
    }`;
  }

  renderDates() {
    this.datesEl.innerHTML = "";
    const numberOfDates = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month + 1,
      0
    ).getDate();

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numberOfDates; i++) {
      const dateEl = document.createElement("div");
      dateEl.classList.add("date");
      dateEl.textContent = i + 1;
      dateEl.dataset.date = i + 1;
      fragment.appendChild(dateEl);
    }
    fragment.firstChild.style.gridColumnStart =
      new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay() +
      1;
    this.datesEl.appendChild(fragment);
    this.colorSaturday();
    this.colorSunday();
    this.markCurrentDate();
    this.markSelectedDate();
    this.updateMonth();
  }

  markSelectedDate() {
    if (
      this.#calendarDate.year === this.selectedDate.year &&
      this.#calendarDate.month === this.selectedDate.month
    ) {
      this.datesEl
        .querySelector(`[data-date='${this.selectedDate.date}']`)
        .classList.add("selected");
    }
  }

  colorSaturday() {
    const saturdayEl = this.datesEl.querySelectorAll(
      `.date:nth-child(7n+${
        7 -
        new Date(this.#calendarDate.year, this.#calendarDate.month, 1).getDay()
      })`
    );

    for (let i = 0; i < saturdayEl.length; i++) {
      saturdayEl[i].style.color = "blue";
    }
  }

  colorSunday() {
    const sundayEl = this.datesEl.querySelectorAll(
      `.date:nth-child(7n+${
        (8 -
          new Date(
            this.#calendarDate.year,
            this.#calendarDate.month,
            1
          ).getDay()) %
        7
      })`
    );

    for (let i = 0; i < sundayEl.length; i++) {
      sundayEl[i].style.color = "red";
    }
  }
}

new DatePicker();

export default class ImageSlider {
  #slideNumber;

  #currentNumber = 0;

  #slideWidth;

  #autoPlay = true;

  #intervalId;

  sliderWrapEl;

  sliderEl;

  nextBtnEl;

  prevBtnEl;

  indicatorWrapEl;

  controlWrapEl;

  constructor() {
    this.assignEl();
    this.initSlideNumber();
    this.initSlideWidth();
    this.addEvent();
    this.createIndicator();
    this.activeIndicator();
    this.initAutoPlay();
  }

  assignEl() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.prevBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap');
  }

  initAutoPlay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  initSlideNumber() {
    this.#slideNumber = this.sliderEl.querySelectorAll('li').length;
  }

  initSlideWidth() {
    this.#slideWidth = this.sliderEl.clientWidth;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.prevBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.indicatorHandler.bind(this),
    );
    this.controlWrapEl.addEventListener(
      'click',
      this.toggleAutoPlay.bind(this),
    );
  }

  toggleAutoPlay(e) {
    if (e.target.dataset.status === 'play') {
      this.#autoPlay = true;
      this.controlWrapEl.classList.add('play');
      this.controlWrapEl.classList.remove('pause');
      this.initAutoPlay();
    } else if (e.target.dataset.status === 'pause') {
      this.#autoPlay = false;
      this.controlWrapEl.classList.add('pause');
      this.controlWrapEl.classList.remove('play');
      clearInterval(this.#intervalId);
    }
  }

  indicatorHandler(e) {
    const position = +e.target.dataset.index;
    if (Number.isInteger(position)) {
      this.#currentNumber = position;
      this.slideMove();
      this.activeIndicator();
    }
  }

  moveToRight() {
    this.#currentNumber += 1;
    if (this.#currentNumber >= this.#slideNumber) {
      this.#currentNumber = 0;
    }
    this.slideMove();
    this.activeIndicator();
  }

  moveToLeft() {
    this.#currentNumber -= 1;
    if (this.#currentNumber < 0) {
      this.#currentNumber = this.#slideNumber - 1;
    }

    this.slideMove();
    this.activeIndicator();
  }

  slideMove() {
    this.sliderEl.style.left = `-${this.#currentNumber * this.#slideWidth}px`;
    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.initAutoPlay();
    }
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNumber; i += 1) {
      const liEl = document.createElement('li');
      liEl.dataset.index = i;
      docFragment.appendChild(liEl);
    }

    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  activeIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`li:nth-child(${this.#currentNumber + 1})`)
      .classList.add('active');
  }
}

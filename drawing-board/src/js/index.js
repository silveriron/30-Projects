class DrawingBoard {
  containerEl;
  toolbarEl;
  brushEl;
  canvasEl;
  brushPanelEl;
  brushPreviewEl;
  eraserEl;
  navigatorEl;
  navImageContainerEl;
  navImageEl;
  undoEl;
  clearEl;
  downloadEl;

  backgroundColor;
  MODE = "none";
  isMouseDown = false;
  context;
  undoArray = [];

  constructor() {
    this.assign();
    this.initContext();
    this.initBackgroundColor();
    this.addEvent();
  }

  assign() {
    this.containerEl = document.getElementById("container");
    this.canvasEl = this.containerEl.querySelector("#canvas");
    this.toolbarEl = this.containerEl.querySelector("#toolbar");
    this.brushEl = this.toolbarEl.querySelector("#brush");
    this.colorPickerEl = this.toolbarEl.querySelector("#colorPicker");
    this.brushPanelEl = this.containerEl.querySelector("#brushPanel");
    this.brushSizeEl = this.brushPanelEl.querySelector("#brushSize");
    this.brushPreviewEl = this.brushPanelEl.querySelector("#brushSizePreview");
    this.eraserEl = this.toolbarEl.querySelector("#eraser");
    this.navigatorEl = this.toolbarEl.querySelector("#navigator");
    this.navImageContainerEl = this.containerEl.querySelector("#imgNav");
    this.navImageEl = this.navImageContainerEl.querySelector("#canvasImg");
    this.undoEl = this.toolbarEl.querySelector("#undo");
    this.clearEl = this.toolbarEl.querySelector("#clear");
    this.downloadEl = this.toolbarEl.querySelector("#download");
  }

  initContext() {
    this.context = this.canvasEl.getContext("2d");
  }

  initBackgroundColor() {
    this.backgroundColor = "#FFF";
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }

  addEvent() {
    this.brushEl.addEventListener("click", this.onClickBrush.bind(this));
    this.canvasEl.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvasEl.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvasEl.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.canvasEl.addEventListener("mouseout", this.onMouseUp.bind(this));
    this.colorPickerEl.addEventListener(
      "input",
      this.onChangePreviewColor.bind(this)
    );
    this.brushSizeEl.addEventListener(
      "input",
      this.onChangePreviewSize.bind(this)
    );
    this.eraserEl.addEventListener("click", this.onClickEraser.bind(this));
    this.navigatorEl.addEventListener("click", this.onNavigator.bind(this));
    this.undoEl.addEventListener("click", this.onClickUndo.bind(this));
    this.clearEl.addEventListener("click", this.onClickClear.bind(this));
    this.downloadEl.addEventListener("click", this.onClickDownload.bind(this));
  }

  onClickDownload() {
    this.downloadEl.href = this.canvasEl.toDataURL("image/jpg", 1);
    this.downloadEl.download = "image.jpg";
  }

  onClickClear() {
    this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    this.undoArray = [];
    this.updateNavImage();
    this.initBackgroundColor();
  }

  onClickUndo() {
    if (this.undoArray.length === 0) return;
    const imagePath = this.undoArray.pop();
    const image = new Image();
    image.onload = () => {
      this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      this.context.drawImage(
        image,
        0,
        0,
        this.canvasEl.width,
        this.canvasEl.height,
        0,
        0,
        this.canvasEl.width,
        this.canvasEl.height
      );
    };

    image.src = imagePath;
  }

  onNavigator() {
    this.navigatorEl.classList.toggle("active");
    this.navImageContainerEl.classList.toggle("hide");
    this.updateNavImage();
  }

  updateNavImage() {
    this.navImageEl.src = this.canvasEl.toDataURL();
  }

  onClickEraser(e) {
    this.MODE = this.MODE === "erase" ? "none" : "erase";
    this.eraserEl.classList.toggle("active");
    this.brushEl.classList.remove("active");
    this.canvasEl.style.cursor =
      this.MODE === "erase" ? "crosshair" : "default";
    this.brushPanelEl.classList.add("hide");
  }

  onChangePreviewColor(e) {
    this.brushPreviewEl.style.backgroundColor = e.target.value;
  }

  onChangePreviewSize(e) {
    this.brushPreviewEl.style.width = `${e.target.value}px`;
    this.brushPreviewEl.style.height = `${e.target.value}px`;
  }

  onMouseDown(e) {
    if (this.MODE === "none") return;
    this.isMouseDown = true;
    const currentPosition = this.getMousePosition(e);
    this.context.beginPath();
    this.context.moveTo(currentPosition.x, currentPosition.y);
    this.context.lineCap = "round";
    if (this.MODE === "brush") {
      this.context.strokeStyle = this.colorPickerEl.value;
      this.context.lineWidth = this.brushSizeEl.value;
    } else {
      this.context.strokeStyle = this.backgroundColor;
      this.context.lineWidth = 15;
    }
    this.undoArray.push(this.canvasEl.toDataURL());
  }

  onMouseMove(e) {
    if (!this.isMouseDown) return;
    const currentPosition = this.getMousePosition(e);
    this.context.lineTo(currentPosition.x, currentPosition.y);
    this.context.stroke();
  }

  onMouseUp() {
    this.isMouseDown = false;
    this.updateNavImage();
  }

  getMousePosition(e) {
    const boundaries = this.canvasEl.getBoundingClientRect();
    return {
      x: e.clientX - boundaries.left,
      y: e.clientY - boundaries.top,
    };
  }

  onClickBrush() {
    this.MODE = this.MODE === "brush" ? "none" : "brush";
    this.brushEl.classList.toggle("active");
    this.canvasEl.style.cursor =
      this.MODE === "brush" ? "crosshair" : "default";
    this.brushPanelEl.classList.toggle("hide");
    this.eraserEl.classList.remove("active");
  }
}

new DrawingBoard();

import { action, autorun, makeObservable, observable } from "mobx";
import { v1 as uuidv1 } from "uuid";

export class MemoModel {
  id = uuidv1();
  content = "";
  x = 0;
  y = 0;
  width = 250;
  height = 300;
  constructor() {
    makeObservable(this, {
      content: observable,
      x: observable,
      y: observable,
      width: observable,
      height: observable,
    });
  }
}

export default class MemoStore {
  memos = [];
  id = "memoStore";
  localStorage = null;

  constructor() {
    makeObservable(this, {
      memos: observable,
      addMemo: action,
      editMemo: action,
      SetWidthHeight: action,
      setPosition: action,
      removeMemo: action,
      loadMemo: action,
    });

    this.initLocalStorage();

    autorun(() => {
      if (this.localStorage) {
        this.localStorage.setItem(this.id, JSON.stringify(this.memos));
      }
    });
  }

  addMemo() {
    this.memos.push(new MemoModel());
  }

  editMemo(id, content) {
    this.memos[this.getIndex(id)].content = content;
  }

  SetWidthHeight(id, width, height) {
    const index = this.getIndex(id);
    this.memos[index].width = width;
    this.memos[index].height = height;
  }

  setPosition(id, x, y) {
    const index = this.getIndex(id);
    this.memos[index].x = x;
    this.memos[index].y = y;
  }

  removeMemo(id) {
    this.memos = this.memos.filter((memo) => memo.id !== id);
  }

  getIndex(id) {
    return this.memos.findIndex((memo) => memo.id === id);
  }

  initLocalStorage() {
    if (window.localStorage[this.id] == null) {
      this.localStorage = window.localStorage;
      this.localStorage.setItem(this.id, JSON.stringify(this.memos));
    } else {
      this.localStorage = window.localStorage;
      this.loadMemo();
    }
  }

  loadMemo() {
    this.memos = JSON.parse(this.localStorage.getItem(this.id));
  }
}

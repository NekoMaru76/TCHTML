export default class Base extends HTMLElement {
  constructor() {
    super();

    this.__data__ = {};
    this.style.display = "none";
  }
  run() {}
};

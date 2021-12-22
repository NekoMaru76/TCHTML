import Base from "./Base.js";

export class Value extends Base {
  constructor() {
    super();
  }
  set value(value) {
    this.__data__.value = value;

    return true;
  }
  run() {
    return this.__data__.value;
  }
  get value() {
    return this.__data__.value;
  }
  toString() {
    const string = new String;

    string.textContent = "";
    string.value = "";

    return string;
  }
  toNumber() {
    const number = new Number;

    number.textContent = "0";
    number.value = 0;

    return number;
  }
};

export class Number extends Value {
  toString() {
    const string = new String;

    string.textContent = `${this}`;
    string.value = window.Number(string.textContent);

    return string;
  }
  toNumber() {
    return this;
  }
  connectedCallback() {
    const child = this.firstChild;

    switch (true) {
      case child.nodeName === "#text": {
        this.value = window.Number(child.textContent);

        break;
      }
      case child instanceof Value: {
        this.value = child.toNumber().run();

        break;
      }
    }
  }
};

export class Undefined extends Value {
  toString() {
    const string = new String;

    string.textContent = "undefined";
    string.value = "undefined";

    return string;
  }
  toNumber() {
    const number = new Number;

    number.textContent = '0';
    number.value = 0;

    return number;
  }
};

export class String extends Value {
  constructor() {
    super();
  }
  toNumber() {
    const number = new Number;

    number.textContent = this.textContent;
    number.value = Number(this.textContent);

    return number;
  }
  toString() {
    return this;
  }
  connectedCallback() {
    const child = this.firstChild;

    switch (true) {
      case child.nodeName === "#text": {
        this.value = child.textContent;

        break;
      }
      case child instanceof Value: {
        this.value = child.toString().run();

        break;
      }
    }
  }
};

import Base from "./Base.js";

export default class Value extends Base {
  constructor() {
    super();
  }
  setValue(value) {
    this.__data__.value = value;

    return this;
  }
  run() {
    return this.__data__.value;
  }
};

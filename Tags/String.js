import Value from "./Value.js";

export default class String extends Value {
  constructor() {
    super();
  }
  run() {
    return this.textContent;
  }
};

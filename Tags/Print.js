import Base from "./Base.js";
import Value from "./Value.js";
import Undefined from "./Undefined.js";
import getValue from "../utils/getValue.js";

export default class Print extends Base {
  constructor() {
    super();
  }
  run(scope) {
    const contents = [];

    for (const child of this.children) {
      if (!(child instanceof Base)) continue;

      contents.push(getValue(scope, child).run());
    }

    console.log(...contents);
  }
};

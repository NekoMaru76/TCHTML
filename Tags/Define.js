import getElement from "../utils/getElement.js";
import Value from "./Value.js";
import Undefined from "./Undefined.js";
import Base from "./Base.js";

export default class Define extends Base {
  constructor() {
    super();
  }
  run(scope) {
    const { variables } = scope;
    const name = this.attributes.name.value;

    if (variables.has(name)) throw new Error(`${name} is already defined`);

    const value = getElement(this.children);

    variables.set(name, (value instanceof Value) ? value : new Undefined);
  }
}

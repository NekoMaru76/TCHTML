import Value from "./Value.js";
import Undefined from "./Undefined.js";
import Base from "./Base.js";

export default class Get extends Base {
  run(scope) {
    const { variables } = scope;
    const name = this.attributes.name.value;

    if (!variables.has(name)) throw new Error(`${name} is not defined`);

    const value = variables.get(name);

    return value instanceof Value ? value : new Undefined;
  }
};

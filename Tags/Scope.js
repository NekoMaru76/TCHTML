import Base from "./Base.js";

export default class Scope extends Base {
  constructor() {
    super();

    this.variables = new Map;
  }
  run() {
    for (const child of this.children) {
      if (!(child instanceof Base)) continue;

      child.run(this);
    }
  }
}

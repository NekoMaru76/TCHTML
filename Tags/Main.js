import Base from "./Base.js";

export default class Main extends Base {
  constructor() {
    super();

    for (const child of this.children) {
      if (!child instanceof Base) continue;

      child.run();
    }
  }
  run() {
    throw new Error(`What the fuck are you doin'?`);
  }
};

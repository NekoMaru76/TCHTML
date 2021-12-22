import { Value, Number, Undefined } from "./Value.js";
import Base from "./Base.js";
import getValue from "../utils/getValue.js";

export class Sum extends Base {
  run(scope) {
    let n = this.children[0] instanceof Base ? this.children[0].toNumber().run() : 0;
    const num = new Number;

    for (let i = 1; i < this.children.length; i++) {
      const child = this.children[i];

      if (!(child instanceof Base)) continue;

      n += child.toNumber().run();
    }

    num.textContent = `${n}`;

    return num;
  }
};

export class Sub extends Base {
  run(scope) {
    let n = this.children[0] instanceof Base ? this.children[0].toNumber().run() : 0;
    const num = new Number;

    for (let i = 1; i < this.children.length; i++) {
      const child = this.children[i];

      if (!(child instanceof Base)) continue;

      n -= child.toNumber().run();
    }

    console.log(n);

    num.textContent = `${n}`;

    return num;
  }
};

export class Mul extends Base {
  run(scope) {
    let n = this.children[0] instanceof Base ? this.children[0].toNumber().run() : 0;
    const num = new Number;

    for (let i = 1; i < this.children.length; i++) {
      const child = this.children[i];

      if (!(child instanceof Base)) continue;

      n *= child.toNumber().run();
    }

    num.textContent = `${n}`;

    return num;
  }
};

export class Div extends Base {
  run(scope) {
    let n = this.children[0] instanceof Base ? this.children[0].toNumber().run() : 0;
    const num = new Number;

    for (let i = 1; i < this.children.length; i++) {
      const child = this.children[i];

      if (!(child instanceof Base)) continue;

      n /= child.toNumber().run();
    }

    num.textContent = `${n}`;

    return num;
  }
};

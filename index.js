import Base from "./Tags/Base.js";
import Print from "./Tags/Print.js";
import Scope from "./Tags/Scope.js";
import Define from "./Tags/Define.js";
import { Value, String, Undefined, Number } from "./Tags/Value.js";
import Get from "./Tags/Get.js";
import Main from "./Tags/Main.js";
import { Sum, Sub, Mul, Div } from "./Tags/Math.js";

import getElement from "./utils/getElement.js";
import getValue from "./utils/getValue.js";

const Elements = {
  Base, Scope, Define, String, Print, Get, Undefined, Value, Number, Sum, Sub, Mul, Div, Main
};
const utils = {
  getElement, getValue
};

for (const [name, Element] of Object.entries(Elements))
  customElements.define(`tchtml-${name.toLowerCase()}`, Element);

export { Elements, utils };

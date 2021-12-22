import Base from "./Tags/Base.js";
import Print from "./Tags/Print.js";
import Scope from "./Tags/Scope.js";
import Define from "./Tags/Define.js";
import String from "./Tags/String.js";
import Value from "./Tags/Value.js";
import Get from "./Tags/Get.js";
import Undefined from "./Tags/Undefined.js";
import Main from "./Tags/Main.js";

import getElement from "./utils/getElement.js";
import getValue from "./utils/getValue.js";

const Elements = {
  Base, Scope, Define, String, Print, Get, Undefined, Value, Main
};
const utils = {
  getElement, getValue
};

for (const [name, Element] of Object.entries(Elements))
  customElements.define(`tchtml-${name.toLowerCase()}`, Element);

export { Elements, utils };

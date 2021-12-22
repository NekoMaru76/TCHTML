import Value from "../Tags/Value.js";
import Undefined from "../Tags/Undefined.js";

export default function getValue(scope, element) {
  const value = element.run(scope);

  return value instanceof Value ? value : new Undefined;
};

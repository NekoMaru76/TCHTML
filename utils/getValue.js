import { Value, Undefined } from "../Tags/Value.js";

export default function getValue(scope, element) {
  const value = element.run(scope);

  return (value instanceof Value) ? value : new Undefined;
};

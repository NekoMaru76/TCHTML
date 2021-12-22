import Base from "../Tags/Base.js";

export default function getElement(children, filter) {
  for (const child of children) {
    if (!child instanceof Base || filter && !filter?.(child)) continue;

    return child;
  }
};

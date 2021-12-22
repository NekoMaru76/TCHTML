class Base extends HTMLElement {
    constructor(){
        super();
        this.__data__ = {
        };
        this.style.display = "none";
    }
    run() {
    }
}
class Value extends Base {
    constructor(){
        super();
    }
    set value(value) {
        this.__data__.value = value;
        return true;
    }
    run() {
        return this.__data__.value;
    }
    get value() {
        return this.__data__.value;
    }
    toString() {
        const string = new String;
        string.textContent = "";
        string.value = "";
        return string;
    }
    toNumber() {
        const number = new Number;
        number.textContent = "0";
        number.value = 0;
        return number;
    }
}
class Number extends Value {
    toString() {
        const string = new String;
        string.textContent = `${this}`;
        string.value = window.Number(string.textContent);
        return string;
    }
    toNumber() {
        return this;
    }
    connectedCallback() {
        const child = this.firstChild;
        switch(true){
            case child.nodeName === "#text":
                {
                    this.value = window.Number(child.textContent);
                    break;
                }
            case child instanceof Value:
                {
                    this.value = child.toNumber().run();
                    break;
                }
        }
    }
}
class Undefined extends Value {
    toString() {
        const string = new String;
        string.textContent = "undefined";
        string.value = "undefined";
        return string;
    }
    toNumber() {
        const number = new Number;
        number.textContent = '0';
        number.value = 0;
        return number;
    }
}
class String extends Value {
    constructor(){
        super();
    }
    toNumber() {
        const number = new Number;
        number.textContent = this.textContent;
        number.value = Number(this.textContent);
        return number;
    }
    toString() {
        return this;
    }
    connectedCallback() {
        const child = this.firstChild;
        switch(true){
            case child.nodeName === "#text":
                {
                    this.value = child.textContent;
                    break;
                }
            case child instanceof Value:
                {
                    this.value = child.toString().run();
                    break;
                }
        }
    }
}
function getValue(scope, element) {
    const value = element.run(scope);
    return value instanceof Value ? value : new Undefined;
}
class Print extends Base {
    constructor(){
        super();
    }
    run(scope) {
        const contents = [];
        for (const child of this.children){
            if (!(child instanceof Base)) continue;
            contents.push(getValue(scope, child).run());
        }
        console.log(...contents);
    }
}
class Scope extends Base {
    constructor(){
        super();
        this.variables = new Map;
    }
    run() {
        for (const child of this.children){
            if (!(child instanceof Base)) continue;
            child.run(this);
        }
    }
}
function getElement(children, filter) {
    for (const child of children){
        if (!child instanceof Base || filter && !filter?.(child)) continue;
        return child;
    }
}
class Define extends Base {
    constructor(){
        super();
    }
    run(scope) {
        const { variables  } = scope;
        const name1 = this.attributes.name.value;
        if (variables.has(name1)) throw new Error(`${name1} is already defined`);
        const value = getElement(this.children);
        variables.set(name1, value instanceof Value ? value : new Undefined);
    }
}
class Get extends Base {
    run(scope) {
        const { variables  } = scope;
        const name2 = this.attributes.name.value;
        if (!variables.has(name2)) throw new Error(`${name2} is not defined`);
        const value = variables.get(name2);
        return value instanceof Value ? value : new Undefined;
    }
}
class Main extends Base {
    constructor(){
        super();
        for (const child of this.children){
            if (!child instanceof Base) continue;
            child.run();
        }
    }
    run() {
        throw new Error(`What the fuck are you doin'?`);
    }
}
class Sum extends Base {
    run(scope) {
        let n = this.children[0] instanceof Base ? this.children[0].toNumber().run(scope) : 0;
        const num = new Number;
        for(let i = 1; i < this.children.length; i++){
            const child = this.children[i];
            if (!(child instanceof Base)) continue;
            n += child.toNumber().run(scope);
        }
        num.textContent = `${n}`;
        return num;
    }
}
class Sub extends Base {
    run(scope) {
        let n = this.children[0] instanceof Base ? this.children[0].toNumber().run(scope) : 0;
        const num = new Number;
        for(let i = 1; i < this.children.length; i++){
            const child = this.children[i];
            if (!(child instanceof Base)) continue;
            n -= child.toNumber().run(scope);
        }
        console.log(n);
        num.textContent = `${n}`;
        return num;
    }
}
class Mul extends Base {
    run(scope) {
        let n = this.children[0] instanceof Base ? this.children[0].toNumber().run(scope) : 0;
        const num = new Number;
        for(let i = 1; i < this.children.length; i++){
            const child = this.children[i];
            if (!(child instanceof Base)) continue;
            n *= child.toNumber().run(scope);
        }
        num.textContent = `${n}`;
        return num;
    }
}
class Div extends Base {
    run(scope) {
        let n = this.children[0] instanceof Base ? this.children[0].toNumber().run(scope) : 0;
        const num = new Number;
        for(let i = 1; i < this.children.length; i++){
            const child = this.children[i];
            if (!(child instanceof Base)) continue;
            n /= child.toNumber().run(scope);
        }
        num.textContent = `${n}`;
        return num;
    }
}
const Elements = {
    Base,
    Scope,
    Define,
    String,
    Print,
    Get,
    Undefined,
    Value,
    Number,
    Sum,
    Sub,
    Mul,
    Div,
    Main
};
const utils = {
    getElement,
    getValue
};
for (const [name, Element] of Object.entries(Elements))customElements.define(`tchtml-${name.toLowerCase()}`, Element);
export { Elements as Elements, utils as utils };

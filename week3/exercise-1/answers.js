function sayHello () {
    return "Hello world!"
}

function isString (input) {
    return typeof input === "string" ? true : false;
}

function isNumber (input) {
    return typeof input === "number" ? true : false;
}

function isArray (input) {
    return Array.isArray(input) ? true : false;
}

function isObject (input) {
    return typeof input === "object" && !Array.isArray(input) && input != null ? true : false;
}

function isFunction (input) {
    return typeof input === "function";
}
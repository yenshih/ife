import { Children } from "react";

const isType = type => element => Object.prototype.toString.call(element) === `[object ${type}]`;

export const isArray = isType("Array");
export const isDate = isType("Date");
export const isFunction = isType("Function");

export const cloneObject = (src) => {
    let tar = new src.constructor();
    for (let key of Object.keys(src)) {
        switch (typeof src[key]) {
            case "number":
            case "string":
            case "boolean": tar[key] = src[key]; break;
            case "object": {
                switch (true) {
                    case isArray(key): tar[key] = [...src[key]]; break;
                    case isDate(key): tar[key] = new Date(src[key].valueOf()); break;
                    default: tar[key] = cloneObject(src[key]);
                }
                break;
            }
        }
    }
    return tar;
};

export const mapChildrenToArray = (children) => {
    const array = [];
    Children.forEach(children, child => array.push(child));
    return array;
}
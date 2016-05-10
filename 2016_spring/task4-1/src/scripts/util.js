import { Children } from "react";

const isInstanceOf = type => element => Object.prototype.toString.call(element) === `[object ${type}]`;

export const isArray = isInstanceOf("Array");
export const isDate = isInstanceOf("Date");
export const isFunction = isInstanceOf("Function");

export const isInteger = num => typeof num === "number" && parseInt(num, 10) === num;

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
};

export const mapHsvToRgb = (h, s, v) => {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const [p, q, t] = [v * (1 - s), v * (1 - f * s), v * (1 - (1 - f) * s)];
    let [r, g, b] = [0, 0, 0];
    switch (i) {
        case 0: [r, g, b] = [v, t, p]; break;
        case 1: [r, g, b] = [q, v, p]; break;
        case 2: [r, g, b] = [p, v, t]; break;
        case 3: [r, g, b] = [p, q, v]; break;
        case 4: [r, g, b] = [t, p, v]; break;
        case 5: [r, g, b] = [v, p, q]; break;
    }
    [r, g, b] = [r, g, b].map(e => Math.floor(e * 256));
    return `rgb(${r}, ${g}, ${b})`;
};
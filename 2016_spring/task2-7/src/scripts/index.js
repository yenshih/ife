import "babel-polyfill";
import EventUtil from "./event";
import RenderDeque from "./render";
import SortDisplay from "./sort";
import delay from "./delay";

class Element {
    constructor(value, state) {
        this.value = value;
        this.state = state;
    }
}

EventUtil.addHandler(window, "load", () => {
    const isNumber = (val) => /^[+-]?\d+(?:\.\d+)?$/g.test(val);
    let form = document.forms[0],
        text = form.elements["input-num"],
        unshiftBtn = form.elements["unshift"],
        pushBtn = form.elements["push"],
        shiftBtn = form.elements["shift"],
        popBtn = form.elements["pop"],
        randomBtn = form.elements["random"],
        sortBtn = form.elements["sort"],
        dequeDisplay = document.getElementById("deque"),
        deque = Array(60).fill(new Element(10, "")),
        formEvent = (event) => {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            if (target === unshiftBtn || target === pushBtn) {
                let val = text.value.trim();
                if (isNumber(val) && deque.length < 60 && val >= 10 && val <= 100) {
                    switch (target) {
                        case unshiftBtn: deque.unshift(new Element(Number(val)), ""); break;
                        case pushBtn: deque.push(new Element(Number(val), "")); break;
                    }
                    dequeDisplay.innerHTML = RenderDeque.render(deque);
                }
            }
            else if (target === shiftBtn || target === popBtn) {
                if (deque.length) {
                    switch (target) {
                        case shiftBtn: deque.shift(); break;
                        case popBtn: deque.pop(); break;
                    }
                    dequeDisplay.innerHTML = RenderDeque.render(deque);
                }
            }
            else if (target === randomBtn) {
                deque = [];
                for (let i = 0; i < 60; i++) {
                    deque.push(new Element(Math.round(10 + Math.random() * 90), ""));
                }
                dequeDisplay.innerHTML = RenderDeque.render(deque);
            }
            else if (target === sortBtn) {
                EventUtil.removeHandler(form, "click", formEvent);
                EventUtil.removeHandler(dequeDisplay, "click", dequeEvent);
                let sort = SortDisplay.sort(deque, 0, deque.length - 1, (x, y) => x.value - y.value),
                    nextState = async () => {
                        let sortStep = sort.next();
                        if (!sortStep.done) {
                            let [step, ...indexs] = sortStep.value;
                            procedure(deque, step, indexs);

                            let sortState = RenderDeque.render(deque);
                            dequeDisplay.innerHTML = sortState;
                            await delay(50);
                            nextState();
                            // setTimeout(nextState, 200);
                        } else {
                            EventUtil.addHandler(form, "click", formEvent);
                            EventUtil.addHandler(dequeDisplay, "click", dequeEvent);
                        }
                    };
                nextState();
            }
        },
        dequeEvent = (event) => {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            Array.from(dequeDisplay.children).forEach((element, index) => {
                if (target === element) {
                    deque.splice(index, 1);
                    dequeDisplay.innerHTML = RenderDeque.render(deque);
                    return;
                }
            });
        };
    EventUtil.addHandler(form, "click", formEvent);
    EventUtil.addHandler(dequeDisplay, "click", dequeEvent);
});

const ClassUtil = {
    addClass(className, newClassName) {
        return className + " " + newClassName;
    },
    removeClass(className, oldClassName) {
        let pattern = new RegExp("(?:^|\\s*)" + oldClassName);
        return className.replace(pattern, "");
    }
}

function procedure (deque, step, indexs) {
    switch (step) {
        case "iterate":
        case "swap":
            deque.forEach((element, index) => {
                if (indexs.includes(index))
                    element.state = ClassUtil.addClass(element.state, step);
                else {
                    element.state = ClassUtil.removeClass(element.state, "iterate");
                    element.state = ClassUtil.removeClass(element.state, "swap");
                }
            })
            break;
        case "mid":
            deque.forEach((element, index) => {
                if (indexs.includes(index))
                    element.state = ClassUtil.addClass(element.state, step);
                else
                    element.state = ClassUtil.removeClass(element.state, step);
            })
            break;
        case "end":
            deque.forEach(element => element.state = "");
    }
}


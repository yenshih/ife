import "babel-polyfill";
import EventUtil from "./event";
import RenderDeque from "./render";

EventUtil.addEventHandler(window, "load", () => {
    let text = document.forms[0].elements["input-num"],
        unshift = document.forms[0].elements["unshift"],
        push = document.forms[0].elements["push"],
        shift = document.forms[0].elements["shift"],
        pop = document.forms[0].elements["pop"],
        dequeDisplay = document.getElementById("deque"),
        deque = [];
    const isNumber = (val) => /^[+-]?\d+(?:\.\d+)?$/g.test(val);
    EventUtil.addEventHandler(unshift, "click", () => {
        let val = text.value.trim();
        if (isNumber(val)) {
            deque.unshift(Number(val));
            dequeDisplay.innerHTML = RenderDeque.render(deque);
            console.log(`unshift ${val}`);
        }
        else {
            console.log("NaN");
        }
    });
    EventUtil.addEventHandler(push, "click", () => {
        let val = text.value.trim();
        if (isNumber(val)) {
            deque.push(Number(val));
            dequeDisplay.innerHTML = RenderDeque.render(deque);
            console.log(`push ${val}`)
        }
        else {
            console.log("NaN");
        }
    });
    EventUtil.addEventHandler(shift, "click", () => {
        if (deque.length) {
            console.log(`shift ${deque.shift()}`);
            dequeDisplay.innerHTML = RenderDeque.render(deque);
        }
    });
    EventUtil.addEventHandler(pop, "click", () => {
        if (deque.length) {
            console.log(`pop ${deque.pop()}`);
            dequeDisplay.innerHTML = RenderDeque.render(deque);
        }
    });
    EventUtil.addEventHandler(dequeDisplay, "click", (event) => {
        event = EventUtil.getEvent(event);
        let target = EventUtil.getTarget(event);
        Array.from(dequeDisplay.children).forEach((element, index) => {
            if (target === element) {
                console.log(`delete ${deque[index]}`);
                deque.splice(index, 1);
                dequeDisplay.innerHTML = RenderDeque.render(deque);
                return;
            }
        });
    });
});
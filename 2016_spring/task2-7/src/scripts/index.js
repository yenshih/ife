import "babel-polyfill";
import EventUtil from "./event";
import RenderDeque from "./render";
import SortDisplay from "./sort";

EventUtil.addHandler(window, "load", () => {
    const isNumber = (val) => /^[+-]?\d+(?:\.\d+)?$/g.test(val);
    let container = document.getElementById("container"),
        form = document.forms[0],
        text = form.elements["input-num"],
        unshiftBtn = form.elements["unshift"],
        pushBtn = form.elements["push"],
        shiftBtn = form.elements["shift"],
        popBtn = form.elements["pop"],
        randomBtn = form.elements["random"],
        sortBtn = form.elements["sort"],
        dequeDisplay = document.getElementById("deque"),
        deque = [], dequeState = new Array(60).fill(""),
        formEvent = (event) => {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            if (target === unshiftBtn || target === pushBtn) {
                let val = text.value.trim();
                if (isNumber(val)) {
                    if (deque.length < 60 && val >= 10 && val <= 100) {
                        switch (target) {
                            case unshiftBtn: deque.unshift(Number(val)); console.log(`unshift ${val}`); break;
                            case pushBtn: deque.push(Number(val)); console.log(`push ${val}`); break;
                        }
                        dequeDisplay.innerHTML = RenderDeque.render(deque, dequeState);
                    }
                    else {
                        console.log("overflow");
                    }
                }
                else {
                    console.log("NaN");
                }
            }
            else if (target === shiftBtn || target === popBtn) {
                if (deque.length) {
                    switch (target) {
                        case shiftBtn: console.log(`shift ${deque.shift()}`); break;
                        case popBtn: console.log(`pop ${deque.pop()}`); break;
                    }
                    dequeDisplay.innerHTML = RenderDeque.render(deque, dequeState);
                }
                else {
                    console.log("overflow");
                }
            }
            else if (target === randomBtn) {
                deque = [];
                for (let i = 0; i < 60; i++) {
                    deque.push(Math.round(10 + Math.random() * 90));
                }
                dequeDisplay.innerHTML = RenderDeque.render(deque, dequeState);
            }
            else if (target === sortBtn) {
                EventUtil.removeHandler(form, "click", formEvent);
                EventUtil.removeHandler(dequeDisplay, "click", dequeEvent);
                let sort = SortDisplay.sort(0, deque.length - 1, deque, dequeState),
                    interval = setInterval(() => {
                        let sortState = sort.next();
                        if (!sortState.done) {
                            dequeDisplay.innerHTML = sortState.value;
                        }
                        else {
                            clearInterval(interval);
                            EventUtil.addHandler(form, "click", formEvent);
                            EventUtil.addHandler(dequeDisplay, "click", dequeEvent);
                        }
                    }, 200);
            }
        },
        dequeEvent = (event) => {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            Array.from(dequeDisplay.children).forEach((element, index) => {
                if (target === element) {
                    console.log(`delete ${deque[index]}`);
                    deque.splice(index, 1);
                    dequeDisplay.innerHTML = RenderDeque.render(deque, dequeState);
                    return;
                }
            });
        };
    EventUtil.addHandler(form, "click", formEvent);
    EventUtil.addHandler(dequeDisplay, "click", dequeEvent);
});
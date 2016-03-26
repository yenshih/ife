import "babel-polyfill";
import EventUtil from "./event";
import RenderDeque from "./render";
import SortDisplay from "./sort";

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
        deque = {
            data: [],
            state: new Array(60).fill("")
        },
        formEvent = (event) => {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            if (target === unshiftBtn || target === pushBtn) {
                let val = text.value.trim();
                if (isNumber(val) && deque.data.length < 60 && val >= 10 && val <= 100) {
                    switch (target) {
                        case unshiftBtn: deque.data.unshift(Number(val)); break;
                        case pushBtn: deque.data.push(Number(val)); break;
                    }
                    dequeDisplay.innerHTML = RenderDeque.render(deque);
                }
            }
            else if (target === shiftBtn || target === popBtn) {
                if (deque.data.length) {
                    switch (target) {
                        case shiftBtn: deque.data.shift(); break;
                        case popBtn: deque.data.pop(); break;
                    }
                    dequeDisplay.innerHTML = RenderDeque.render(deque);
                }
            }
            else if (target === randomBtn) {
                deque.data = [];
                for (let i = 0; i < 60; i++) {
                    deque.data.push(Math.round(10 + Math.random() * 90));
                }
                dequeDisplay.innerHTML = RenderDeque.render(deque);
            }
            else if (target === sortBtn) {
                EventUtil.removeHandler(form, "click", formEvent);
                EventUtil.removeHandler(dequeDisplay, "click", dequeEvent);
                let sort = SortDisplay.sort(0, deque.data.length - 1, deque),
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
                    deque.data.splice(index, 1);
                    dequeDisplay.innerHTML = RenderDeque.render(deque);
                    return;
                }
            });
        };
    EventUtil.addHandler(form, "click", formEvent);
    EventUtil.addHandler(dequeDisplay, "click", dequeEvent);
});
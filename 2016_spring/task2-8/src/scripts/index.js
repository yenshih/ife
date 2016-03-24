import "babel-polyfill";
import EventUtil from "./event";
import RenderDeque from "./render";

EventUtil.addHandler(window, "load", () => {
    let form = document.forms[0],
        text = form.elements["text-input"],
        search = form.elements["search-input"],
        unshiftBtn = form.elements["unshift"],
        pushBtn = form.elements["push"],
        shiftBtn = form.elements["shift"],
        popBtn = form.elements["pop"],
        searchBtn = form.elements["search-btn"],
        dequeDisplay = document.getElementById("deque"),
        deque = [], dequeState = [], contents = [],
        formEvent = (event) => {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            if (target === unshiftBtn || target === pushBtn) {
                contents = text.value.trim().split(/[\n\s\u3000,\uff0c\u3001\u003b\uff1b]+/g);
                if (contents[0]) {
                    switch (target) {
                        case unshiftBtn: contents.forEach((element) => {
                            deque.unshift(element);
                            dequeState.unshift("");
                        }); break;
                        case pushBtn: contents.forEach((element) => {
                            deque.push(element);
                            dequeState.push("");
                        }); break;
                    }
                    dequeDisplay.innerHTML = RenderDeque.render(deque, dequeState);
                }
                text.value = "";
            }
            else if (target === shiftBtn || target === popBtn) {
                if (deque.length) {
                    switch (target) {
                        case shiftBtn: deque.shift(); dequeState.shift(); break;
                        case popBtn: deque.pop(); dequeState.pop(); break;
                    }
                    dequeDisplay.innerHTML = RenderDeque.render(deque, dequeState);
                }
            }
            else if (target === searchBtn) {
                let searchText = search.value.trim();
                deque.forEach((element, index) => dequeState[index] = element.includes(searchText) ? "match" : "");
                dequeDisplay.innerHTML = RenderDeque.render(deque, dequeState);
                search.value = "";
            }
        },
        dequeEvent = (event) => {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            Array.from(dequeDisplay.children).forEach((element, index) => {
                if (target === element) {
                    deque.splice(index, 1);
                    dequeState.splice(index, 1);
                    dequeDisplay.innerHTML = RenderDeque.render(deque, dequeState);
                    return;
                }
            });
        };
    EventUtil.addHandler(form, "click", formEvent);
    EventUtil.addHandler(dequeDisplay, "click", dequeEvent);
});
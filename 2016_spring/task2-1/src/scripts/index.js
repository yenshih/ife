const addEventHandler = (element, type, handler) => {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    }
    else {
        element["on" + type] = handler;
    }
}

addEventHandler(window, "load", () => {
    let button = document.getElementById("aqi-button");
    addEventHandler(button, "click", () => {
        let val = document.getElementById("aqi").value.trim(), display = document.getElementById("aqi-display");
        if (/^\d+$/.test(val)) {
            display.innerHTML = val;
        }
        else {
            display.innerHTML = "请输入合法的数值。";
        }
    });
});
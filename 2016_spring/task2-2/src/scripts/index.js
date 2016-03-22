import "babel-polyfill";

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
    const aqiData = {
        "北京": 90,
        "上海": 50,
        "福州": 10,
        "广州": 50,
        "成都": 90,
        "西安": 100
    };
    let ul = document.createElement("ul");
    for (let [city, aqi] of Object.entries(aqiData)) {
        if (aqi >= 60) {
            let li = document.createElement("li");
            li.innerHTML = `${city}, ${aqi}`;
            ul.appendChild(li);
        }
    }
    document.getElementById("container").appendChild(ul);
});
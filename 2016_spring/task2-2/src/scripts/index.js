import "babel-polyfill";

const addHandler = (element, type, handler) => {
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

addHandler(window, "load", () => {
    const aqiData = {
        "\u5317\u4eac": 90,
        "\u4e0a\u6d77": 50,
        "\u798f\u5dde": 10,
        "\u5e7f\u5dde": 50,
        "\u6210\u90fd": 90,
        "\u897f\u5b89": 100
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
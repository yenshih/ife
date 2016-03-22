import "babel-polyfill";
import EventUtil from "./event";

EventUtil.addEventHandler(window, "load", () => {
    let addBtn = document.getElementById("add-btn"),
        tbody = document.getElementById("tbody"),
        cityInput = document.getElementById("city-input"),
        aqiInput = document.getElementById("aqi-input"),
        hint = document.getElementById("hint"),
        city, aqi,
        checkInput = (event) => {
            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);
            switch(target) {
                case cityInput:
                    city = target.value.trim();
                    target.parentNode.className = /^[A-Za-z\u4e00-\u9fa5]+$/g.test(city) ? "correct" : "error";
                    break;
                case aqiInput:
                    aqi = target.value.trim();
                    target.parentNode.className = /^\d+$/g.test(aqi) ? "correct" : "error";
                    break;
            }
            if (cityInput.parentNode.className === "correct" && aqiInput.parentNode.className === "correct") {
                hint.style.display = "none";
            }
        };
    EventUtil.addEventHandler(cityInput, "blur", checkInput);
    EventUtil.addEventHandler(aqiInput, "blur", checkInput);
    EventUtil.addEventHandler(addBtn, "click", () => {
        if (cityInput.parentNode.className === "correct" && aqiInput.parentNode.className === "correct") {
            let row = `<tr><td>${city}</td><td>${aqi}</td><td><input type="button" value="\u5220\u9664"></tr>`;
            tbody.innerHTML += row;
            if (aqi >= 60) {
                tbody.lastChild.className = "exceed";
            }
        }
        else {
            hint.style.display = "inline";
        }
    });
    EventUtil.addEventHandler(tbody, "click", (event) => {
        event = EventUtil.getEvent(event);
        let target = EventUtil.getTarget(event);
        Array.from(tbody.rows).forEach((element, index) => {
            if (element.cells[2].children[0] === target) {
                tbody.deleteRow(index);
                return;
            }
        });
    });
});
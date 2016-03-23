import "babel-polyfill";
import EventUtil from "./event";
import RenderChart from "./render";
import { aqiSrcData } from "./random";

EventUtil.addEventHandler(window, "load", () => {
    let timeGra = document.getElementById("time-gra"),
        citySelect = document.getElementById("city-select"),
        graRadios = Array.from(document.forms[0].elements["gra"]),
        cityOptions = citySelect.options;
    for (let key of aqiSrcData.keys()) {
        citySelect.add(new Option(key), undefined);
    }
    EventUtil.addEventHandler(timeGra, "click", (event) => {
        event = EventUtil.getEvent(event);
        let target = EventUtil.getTarget(event);
        graRadios.forEach((element) => {
            if (target === element) {
                RenderChart.render(element.value, cityOptions[citySelect.selectedIndex].value);
                return;
            }
        });
    });
    EventUtil.addEventHandler(citySelect, "change", () => {
        graRadios.forEach((element) => {
            if (element.checked) {
                RenderChart.render(element.value, cityOptions[citySelect.selectedIndex].value);
                return;
            }
        });
    });
});
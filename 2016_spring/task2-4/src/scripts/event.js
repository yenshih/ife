const EventUtil = {
    addEventHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = handler;
        }
    },
    getEvent: (event) => event ? event : window.event,
    getTarget: (event) => event.target || event.srcElement
};

export default EventUtil;
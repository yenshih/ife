import "babel-polyfill";
import EventUtil from "./event";
import RenderList from "./render";

EventUtil.addHandler(window, "load", () => {
    class List {
        constructor() {
            this.content = [];
        }
        add(newListItem) {
            if (newListItem && !this.content.includes(newListItem)) {
                if (this.content.length === 10) {
                    this.content.shift();
                }
                this.content.push(newListItem);
            }
        }
        remove(index) {
            this.content.splice(index, 1);
        }
    }
    let tagInput = document.getElementById("tag-input"),
        tagDisplay = document.getElementById("tag-display"),
        hobbyInput = document.getElementById("hobby-input"),
        hobbyBtn = document.getElementById("hobby-btn"),
        hobbyDisplay = document.getElementById("hobby-display"),
        tags = new List(), hobbies = new List();
    EventUtil.addHandler(tagInput, "keyup", (event) => {
        event = EventUtil.getEvent(event);
        let keyCode = event.keyCode;
        if (keyCode === 13 || keyCode === 32 || keyCode === 188) {
            tags.add(keyCode === 188 ? tagInput.value.slice(0, -1).trim() : tagInput.value.trim());
            tagInput.value = "";
            RenderList.render(tagDisplay, tags);
        }
    });
    EventUtil.addHandler(tagDisplay, "click", (event) => {
        event = EventUtil.getEvent(event);
        let target = EventUtil.getTarget(event);
        Array.from(tagDisplay.children).forEach((element, index) => {
            if (target === element) {
                tags.remove(index);
                RenderList.render(tagDisplay, tags);
                return;
            }
        });
    });
    EventUtil.addHandler(hobbyBtn, "click", () => {
        hobbyInput.value.trim().split(/[\n\s\u3000,\uff0c\u3001\u003b\uff1b]+/g).forEach((element) => hobbies.add(element));
        hobbyInput.value = "";
        RenderList.render(hobbyDisplay, hobbies);
    });
});
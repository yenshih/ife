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
    let sortBtn = document.getElementById("sort-btn")
    addEventHandler(sortBtn, "click", () => {
        if (!document.getElementById("dist")) {
            let list = [];
            Array.from(document.querySelectorAll("#src li")).forEach((element, index) => {
                /^(.*)\u7a7a\u6c14\u8d28\u91cf\uff1a<span>(\d+)<\/span>$/g.exec(element.innerHTML);
                list[index]= [RegExp.$1, RegExp.$2];
            });
            let dist = document.createElement("ul");
            dist.setAttribute("id", "dist");
            list.sort((a, b) => b[1] - a[1]).forEach((element, index) => {
                let li = document.createElement("li");
                li.innerHTML = `\u7b2c${index + 1}\u540d\uff1a${element[0]}\u7a7a\u6c14\u8d28\u91cf\uff1a<span>${element[1]}</span>`;
                dist.appendChild(li);
            });
            document.getElementById("container").appendChild(dist);
        }
    });
});
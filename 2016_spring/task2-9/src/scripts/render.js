const RenderList = {
    render(listDisplay, list) {
        let listDOM = "";
        list.content.forEach((element) => listDOM += `<div><span>\u5220\u9664</span>${element}</div>`);
        listDisplay.innerHTML = listDOM;
    }
}

export default RenderList;
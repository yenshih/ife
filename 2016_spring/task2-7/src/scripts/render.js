const RenderDeque = {
    render(deque, dequeState) {
        let dequeDOM = "";
        deque.forEach((element, index) => dequeDOM += `<div title="${element}" class="${dequeState[index]}" style="height: ${element * 5}px;"></div>`);
        return dequeDOM;
    }
};

export default RenderDeque;
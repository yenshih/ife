const RenderDeque = {
    render(deque) {
        let dequeDOM = "";
        deque.data.forEach((element, index) => dequeDOM += `<div title="${element}" class="${deque.state[index]}" style="height: ${element * 5}px;"></div>`);
        return dequeDOM;
    }
};

export default RenderDeque;
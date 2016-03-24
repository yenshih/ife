const RenderDeque = {
    render(deque, dequeState) {
        let dequeDOM = "";
        deque.forEach((element, index) => dequeDOM += `<div class="${dequeState[index]}">${element}</div>`);
        return dequeDOM;
    }
};

export default RenderDeque;
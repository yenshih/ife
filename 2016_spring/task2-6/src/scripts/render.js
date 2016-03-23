const RenderDeque = {
    render(deque) {
        let dequeDOM = "";
        deque.forEach((element) => dequeDOM += `<div>${element}</div>`);
        return dequeDOM;
    }
};

export default RenderDeque;
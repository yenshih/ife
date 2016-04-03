const RenderDeque = {
    render(deque) {
        let list = deque
            .map(_ => `<div title="${_.value}" class="${_.state}" style="height: ${_.value * 5}px;"></div>`);
        return String.prototype.concat.call(...list);
    }
};

export default RenderDeque;
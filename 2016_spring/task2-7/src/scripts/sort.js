import RenderDeque from "./render"

const ClassUtil = {
    addClass(state, index, newClassName) {
        state[index] += " " + newClassName;
    },
    removeClass(state, index, oldClassName) {
        let pattern = new RegExp("(?:^|\\s*)" + oldClassName);
        state[index] = state[index].replace(pattern, "");
    }
}

const SortDisplay = {
    *sort(l, r, deque) {
        let [i, j] = [l, r], n = l + r >> 1, m = deque.data[n];
        ClassUtil.addClass(deque.state, n, "mid");
        yield RenderDeque.render(deque);
        do {
            ClassUtil.addClass(deque.state, i, "iterate");
            ClassUtil.addClass(deque.state, j, "iterate");
            yield RenderDeque.render(deque);
            while (deque.data[i] < m) {
                ClassUtil.removeClass(deque.state, i, "iterate");
                i++;
                ClassUtil.addClass(deque.state, i, "iterate");
                yield RenderDeque.render(deque);
            }
            while (deque.data[j] > m) {
                ClassUtil.removeClass(deque.state, j, "iterate");
                j--;
                ClassUtil.addClass(deque.state, j, "iterate");
                yield RenderDeque.render(deque);
            }
            if (i <= j) {
                ClassUtil.addClass(deque.state, i, "swap");
                ClassUtil.addClass(deque.state, j, "swap");
                ClassUtil.removeClass(deque.state, i, "iterate");
                ClassUtil.removeClass(deque.state, j, "iterate");
                yield RenderDeque.render(deque);
                [deque.data[i], deque.data[j]] = [deque.data[j], deque.data[i]];
                [deque.state[i], deque.state[j]] = [deque.state[j], deque.state[i]];
                yield RenderDeque.render(deque);
                ClassUtil.removeClass(deque.state, i, "swap");
                ClassUtil.removeClass(deque.state, j, "swap");
                i++;
                j--;
            }
        } while (i <= j);
        deque.state.fill("", l, r + 1);
        if (l < j) {
            yield *this.sort(l, j, deque);
        }
        if (i < r) {
            yield *this.sort(i, r, deque);
        }
        deque.state.fill("", l, r + 1);
        yield RenderDeque.render(deque);
    }
}

export default SortDisplay;
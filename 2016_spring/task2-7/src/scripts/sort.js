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
    *sort(l, r, deque, dequeState) {
        let [i, j] = [l, r], n = l + r >> 1, m = deque[n];
        ClassUtil.addClass(dequeState, n, "mid");
        yield RenderDeque.render(deque, dequeState);
        do {
            ClassUtil.addClass(dequeState, i, "iterate");
            ClassUtil.addClass(dequeState, j, "iterate");
            yield RenderDeque.render(deque, dequeState);
            while (deque[i] < m) {
                ClassUtil.removeClass(dequeState, i, "iterate");
                i++;
                ClassUtil.addClass(dequeState, i, "iterate");
                yield RenderDeque.render(deque, dequeState);
            }
            while (deque[j] > m) {
                ClassUtil.removeClass(dequeState, j, "iterate");
                j--;
                ClassUtil.addClass(dequeState, j, "iterate");
                yield RenderDeque.render(deque, dequeState);
            }
            if (i <= j) {
                ClassUtil.addClass(dequeState, i, "swap");
                ClassUtil.addClass(dequeState, j, "swap");
                ClassUtil.removeClass(dequeState, i, "iterate");
                ClassUtil.removeClass(dequeState, j, "iterate");
                yield RenderDeque.render(deque, dequeState);
                [deque[i], deque[j]] = [deque[j], deque[i]];
                [dequeState[i], dequeState[j]] = [dequeState[j], dequeState[i]];
                yield RenderDeque.render(deque, dequeState);
                ClassUtil.removeClass(dequeState, i, "swap");
                ClassUtil.removeClass(dequeState, j, "swap");
                i++;
                j--;
            }
        } while (i <= j);
        dequeState.fill("", l, r + 1);
        if (l < j) {
            yield *this.sort(l, j, deque, dequeState);
        }
        if (i < r) {
            yield *this.sort(i, r, deque, dequeState);
        }
        dequeState.fill("", l, r + 1);
        yield RenderDeque.render(deque, dequeState);
    }
}

export default SortDisplay;
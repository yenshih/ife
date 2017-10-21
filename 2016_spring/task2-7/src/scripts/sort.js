import RenderDeque from "./render"

const SortDisplay = {
    *sort(arr, l, r, compare) {
        let [i, j] = [l, r], n = l + r >> 1, m = arr[n];
        yield ["range", i, j];
        yield ["mid", n];
        do {
            
            yield ["iterate", i, j];
            while (compare(arr[i], m) < 0) {
                yield ["iterate", ++i, j];
            }
            while (compare(arr[j], m) > 0) {
                yield ["iterate", i, --j];
            }
            if (i <= j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                yield ["swap", i++, j--];
            }
        } while (i <= j);
        if (l < j) {
            yield *this.sort(arr, l, j, compare);
        }
        if (i < r) {
            yield *this.sort(arr, i, r, compare);
        }
        yield ["end", l, r];
    }
}

export default SortDisplay;
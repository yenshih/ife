import { handleActions } from "redux-actions";
import * as Types from "../constants/DialogActionTypes";

const initialState = { status: 0 };

const dialog = handleActions({
    [Types.SWITCH_DIALOG](state, action) {
        const status = state.status + 1 & 3;
        return Object.assign({}, state, { status });
    }
}, initialState);

export default dialog;
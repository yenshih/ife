import { handleActions } from "redux-actions";
import * as Types from "../constants/DialogActionTypes";

const initialState = { status: 0, id: "" };

const dialog = handleActions({
    [Types.SWITCH_DIALOG](state, action) {
        const id = action.payload;
        const status = state.status + 1 & 3;
        return Object.assign({}, state, { status, id });
    }
}, initialState);

export default dialog;
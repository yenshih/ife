import * as types from "../constants/DialogActionTypes";

const DialogActions = {
    alertDialog() {
        return { type: types.ALERT_DIALOG }
    },
    displayDialog() {
    	return { type: types.DISPLAY_DIALOG }
    },
    hideDialog() {
        return { type: types.HIDE_DIALOG }
    },
    initDialog() {
        return { type: types.INIT_DIALOG }
    }
};

export default DialogActions;
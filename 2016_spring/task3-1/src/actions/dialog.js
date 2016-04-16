import * as DialogActionTypes from "../constants/DialogActionTypes";

const DialogActions = {
    alertDialog() {
        return { type: DialogActionTypes.ALERT_DIALOG }
    },
    displayDialog() {
        return { type: DialogActionTypes.DISPLAY_DIALOG }
    },
    dragDialog(offsetX, offsetY) {
        return { type: DialogActionTypes.DRAG_DIALOG, offsetX, offsetY }
    },
    hideDialog() {
        return { type: DialogActionTypes.HIDE_DIALOG }
    },
    initDialog() {
        return { type: DialogActionTypes.INIT_DIALOG }
    }
};

export default DialogActions;
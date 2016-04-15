import * as types from "../constants/DialogActionTypes";

const initialState = { enter: false, visible: false, leave: false };

const dialog = (state = initialState, action) => {
    switch(action.type) {
        case types.ALERT_DIALOG:
            return { enter: true, visible: true, leave: false };
        case types.DISPLAY_DIALOG:
            return { enter: false, visible: true, leave: false};
        case types.HIDE_DIALOG:
            return { enter: false, visible: true, leave: true };
        case types.INIT_DIALOG:
            return initialState;
        default:
            return state; 
    }
}

export default dialog;
import * as DialogActionTypes from "../constants/DialogActionTypes";

const initialState = {
    enter: false, visible: false, leave: false, drag: false, offsetX: 0, offsetY: 0
};

const dialog = (state = initialState, action) => {
    switch(action.type) {
        case DialogActionTypes.ALERT_DIALOG:
            return Object.assign({}, state, { enter: true, visible: true, leave: false });
        case DialogActionTypes.DISPLAY_DIALOG:
            return Object.assign({}, state, { enter: false, visible: true, leave: false });
        case DialogActionTypes.DRAG_DIALOG:
            return Object.assign({}, state, { drag: true, offsetX: action.offsetX, offsetY: action.offsetY });
        case DialogActionTypes.HIDE_DIALOG:
            return Object.assign({}, state, { enter: false, visible: true, leave: true });
        case DialogActionTypes.INIT_DIALOG:
            return initialState;
        default:
            return state; 
    }
}

export default dialog;
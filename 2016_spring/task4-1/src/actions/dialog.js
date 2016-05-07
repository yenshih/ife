import { createAction } from "redux-actions";
import * as Types from "../constants/DialogActionTypes";

export const switchDialog = createAction(Types.SWITCH_DIALOG, id => id);
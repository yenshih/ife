import { createAction } from "redux-actions";
import * as Types from "../constants/QuestionnaireActionTypes";

export const addQuestionnaire = createAction(Types.ADD_QUESTIONNAIRE);
export const editQuestionnaire = createAction(Types.EDIT_QUESTIONNAIRE);
export const removeQuestionnaire = createAction(Types.REMOVE_QUESTIONNAIRE);
export const editTitle = createAction(Types.EDIT_TITLE, content => content);
export const confirmTitle = createAction(Types.CONFIRM_TITLE, content => content);
export const chooseType = createAction(Types.CHOOSE_TYPE, (enter, visible, leave) => ({ enter, visible, leave }));
export const addQuestion = createAction(Types.ADD_QUESTION, type => type);
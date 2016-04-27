import { createAction } from "redux-actions";
import { ADD_QUESTIONNAIRE, EDIT_QUESTIONNAIRE, REMOVE_QUESTIONNAIRE } from "../constants/QuestionnaireActionTypes";

export const addQuestionnaire = createAction(ADD_QUESTIONNAIRE);
export const editQuestionnaire = createAction(EDIT_QUESTIONNAIRE);
export const removeQuestionnaire = createAction(REMOVE_QUESTIONNAIRE);
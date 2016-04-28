import { handleActions } from "redux-actions";
import { ADD_QUESTIONNAIRE, EDIT_QUESTIONNAIRE, REMOVE_QUESTIONNAIRE } from "../constants/QuestionnaireActionTypes";

const initialState = localStorage.questionnaires || {
    list: [], editing: { title: "", time: 0 } // list[i] = { title, time, status, questions = { type, selection = [], content ="", data = [] }}
};

const questionnaires = handleActions({
    ADD_QUESTIONNAIRE(state, action) {
        return Object.assign({}, state);
    },
    EDIT_QUESTIONNAIRE(state, action) {
        return Object.assign({}, state);
    },
    REMOVE_QUESTIONNAIRE(state, action) {
        return Object.assign({}, state);
    }
}, initialState);

export default questionnaires;
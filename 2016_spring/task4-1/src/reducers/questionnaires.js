import { handleActions } from "redux-actions";
import * as Types from "../constants/QuestionnaireActionTypes";
import { UNRELEASED, RELEASED, CLOSED } from "../constants/QuestionnaireStatusTypes";
import { RADIO, CHECKBOX, TEXT } from "../constants/QuestionTypes";

const initialState = {
    list: [], editing: {
        questionnaire: -1,
        question: -1,
        title: { typing: false, content: "" },
        time: 0,
        type: { enter: false, visible: false, leave: false }
    } // list[i] = { title, time, status, questions = [{ type, options = [], content ="", data = [] }] }
};

const questionnaires = handleActions({
    [Types.ADD_QUESTIONNAIRE](state, action) {
        const { list, editing } = state;
        list.push({ title: "这里是标题", time: 0, status: UNRELEASED, questions: [] });
        return Object.assign({}, state, { list, editing: { ...editing, questionnaire: list.length - 1 } });
    },
    [Types.EDIT_QUESTIONNAIRE](state, action) {
        return Object.assign({}, state);
    },
    [Types.REMOVE_QUESTIONNAIRE](state, action) {
        return Object.assign({}, state);
    },
    [Types.EDIT_TITLE](state, action) {
        const { editing } = state;
        const content = action.payload;
        return Object.assign({}, state, { editing: { ...editing, title: { typing: true, content } } });
    },
    [Types.CONFIRM_TITLE](state, action) {
        const { list, editing } = state;
        const content = action.payload;
        list[editing.questionnaire].title = content;
        return Object.assign({}, state, { list, editing: { ...editing, title: { typing: false, content: "" } } });
    },
    [Types.ADD_QUESTION](state, action) {
        const { list, editing } = state;
        const type = action.payload;
        list[editing.questionnaire].questions.push(type === TEXT ? { type, content: "", required: false }: { type, options: [] });
        return Object.assign({}, state, { list, editing: { ...editing, question: list[editing.questionnaire].questions.length - 1 } });
    },
    [Types.CHOOSE_TYPE](state, action) {
        const { editing } = state;
        const { enter, visible, leave } = action.payload;
        return Object.assign({}, state, { editing: { ...editing, type: { enter, visible, leave } } });
    }
}, initialState);

export default questionnaires;
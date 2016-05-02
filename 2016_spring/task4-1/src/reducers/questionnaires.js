import { handleActions } from "redux-actions";
import * as Types from "../constants/QuestionnaireActionTypes";
import { UNRELEASED, RELEASED, CLOSED } from "../constants/QuestionnaireStatusTypes";
import { RADIO, CHECKBOX, TEXT } from "../constants/QuestionTypes";

const initialState = localStorage.questionnaires || {
    list: [],
    editing: {
        questionnaire: -1,
        question: -1,
        option: -1,
        text: { typing: false, content: "" },
        time: 0,
        type: { enter: false, visible: false, leave: false }
    } // list[i] = { title, time, status, questions = [{ type, title, options = [], content ="", data = [] }] }
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
    [Types.RELEASE_QUESTIONNAIRE](state, action) {
        const { list, editing } = state;
        list[editing.questionnaire].status = RELEASED;
    },
    [Types.EDIT_TEXT](state, action) {
        const { list, editing } = state;
        const { content, question, option } = action.payload;
        if (question !== -1 && option !== -1 && list[editing.questionnaire].questions[question].type === TEXT) {
            list[editing.questionnaire].questions[question].content = content;
            return Object.assign({}, state, { list, editing });
        }
        else {
            return Object.assign({}, state, { editing: { ...editing, question, option, text: { typing: true, content } } });
        }
    },
    [Types.SAVE_TEXT](state, action) {
        const { list, editing } = state;
        const { questionnaire, question, option } = editing;
        const content = action.payload;
        switch (true) {
            case question === -1: list[questionnaire].title = content; break;
            case option === -1: list[questionnaire].questions[question].title = content; break;
            default: list[questionnaire].questions[question].options[option] = content;
        }
        return Object.assign({}, state, { list, editing: { ...editing, question: -1, option: -1, text: { typing: false, content: "" } } });
    },
    [Types.CHOOSE_TYPE](state, action) {
        const { editing } = state;
        const { enter, visible, leave } = action.payload;
        return Object.assign({}, state, { editing: { ...editing, type: { enter, visible, leave } } });
    },
    [Types.ADD_QUESTION](state, action) {
        const { list, editing } = state;
        const type = action.payload;
        let question;
        switch (type) {
            case RADIO: question = { type, title: "单选题", options: ["选项1", "选项2"] }; break;
            case CHECKBOX: question = { type, title: "多选题", options: ["选项1", "选项2", "选项3", "选项4"] }; break;
            case TEXT: question = { type, title: "文本题", content: "", isRequired: false }; break;
            default: question = {};
        } 
        list[editing.questionnaire].questions.push(question);
        return Object.assign({}, state, { list, editing: { ...editing, question: list[editing.questionnaire].questions.length - 1 } });
    },
    [Types.REMOVE_QUESTION](state, action) {
        const { list, editing: { questionnaire } } = state;
        const question = action.payload;
        list[questionnaire].questions.splice(question, 1);
        return Object.assign({}, state, { list });
    },
    [Types.SHIFT_QUESTION](state, action) {
        const { list, editing: { questionnaire } } = state;
        const { question, direction } = action.payload;
        list[questionnaire].questions.splice(question + direction, 0, list[questionnaire].questions.splice(question, 1)[0]);
        return Object.assign({}, state, { list });
    },
    [Types.COPY_QUESTION](state, action) {
        const { list, editing: { questionnaire } } = state;
        const question = action.payload;
        const copy = Object.assign({}, list[questionnaire].questions[question]);
        if (list[questionnaire].questions[question].type !== TEXT) {
            copy.options = copy.options.slice(0);
        }
        list[questionnaire].questions.splice(question + 1, 0, copy);
        return Object.assign({}, state, { list });
    },
    [Types.ADD_OPTION](state, action) {
        const { list, editing: { questionnaire } } = state;
        const question = action.payload;
        list[questionnaire].questions[question].options.push(`选项${list[questionnaire].questions[question].options.length + 1}`);
        return Object.assign({}, state, { list });
    },
    [Types.REMOVE_OPTION](state, action) {
        const { list, editing: { questionnaire} } = state;
        const { question, option } = action.payload;
        list[questionnaire].questions[question].options.splice(option, 1);
        return Object.assign({}, state, { list });
    },
    [Types.TOGGLE_REQUIREMENT](state, action) {
        const { list, editing: { questionnaire } } = state;
        const question = action.payload;
        list[questionnaire].questions[question].isRequired ^= 1;
        return Object.assign({}, state, { list });
    },
    [Types.SAVE_TIME](state, action) {
        const { editing } = state;
        const { year, month, date } = action.payload;
        editing.time = new Date(year, month, date).getTime();
        return Object.assign({}, state, { editing })
    }
}, initialState);

export default questionnaires;
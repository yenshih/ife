import { handleActions } from "redux-actions";
import { cloneObject } from "../scripts/util";
import * as Types from "../constants/QuestionnaireActionTypes";
import { UNRELEASED, RELEASED, CLOSED } from "../constants/QuestionnaireStatusTypes";
import { RADIO, CHECKBOX, TEXT } from "../constants/QuestionTypes";

const list = localStorage.list ? JSON.parse(localStorage.list) : [];
const initialEditing = {
    questionnaire: -1,
    title: "这里是标题",
    time: 0,
    order: 0,
    questions: [],
    type: false,
    question: -1,
    option: -1,
    text: { typing: false, content: "" },
    data: []
};
const initialState =  {
    list,
    editing: cloneObject(initialEditing)
};

const questionnaires = handleActions({
    [Types.ADD_QUESTIONNAIRE](state, action) {
        const { list } = state;
        return Object.assign({}, state, { editing: { ...cloneObject(initialEditing), questionnaire: list.length } });
    },
    [Types.EDIT_QUESTIONNAIRE](state, action) {
        const { list } = state;
        const questionnaire = action.payload;
        const { title, time } = list[questionnaire];
        const questions = cloneObject(list[questionnaire].questions);
        const editing = { ...cloneObject(initialEditing), questionnaire, title, time, questions };
        return Object.assign({}, state, { editing });
    },
    [Types.REMOVE_QUESTIONNAIRE](state, action) {
        const { list } = state;
        const questionnaire = action.payload;
        list.splice(questionnaire, 1);
        localStorage.list = JSON.stringify(list);
        return Object.assign({}, state, { list });
    },
    [Types.SAVE_QUESTIONNAIRE](state, action) {
        const { list, editing: { questionnaire, title, time, questions } } = state;
        list[questionnaire] = { title, time, status: UNRELEASED, questions: cloneObject(questions), data: [] };
        localStorage.list = JSON.stringify(list);
        return Object.assign({}, state, { list });
    },
    [Types.RELEASE_QUESTIONNAIRE](state, action) {
        const { list, editing: { questionnaire } } = state;
        list[questionnaire].status = RELEASED;
        localStorage.list = JSON.stringify(list);
        return Object.assign({}, state, { list, editing: cloneObject(initialEditing) });
    },
    [Types.SORT_QUESTIONNAIRE](state, action) {
        const { list, editing } = state;
        const dataKey = action.payload;
        editing.order ^= 1;
        list.sort((a, b) => (editing.order || -1) * (a[dataKey] - b[dataKey]));
        return Object.assign({}, state, { list, editing });
    },
    [Types.FILL_QUESTIONNAIRE](state, action) {
        const { list } = state;
        const questionnaire = action.payload;
        let data = [];
        list[questionnaire].questions.forEach((question, questionIndex) => {
            switch (question.type) {
                case RADIO: data.push(-1); break;
                case CHECKBOX: data.push([]); break;
                case TEXT: data.push(""); break;
            }
        });
        return Object.assign({}, state, { list, editing: { ...cloneObject(initialEditing), questionnaire, data } })
    },
    [Types.SUBMIT_QUESTIONNAIRE](state, action) {
        const { list, editing: { questionnaire, data } } = state;
        list[questionnaire].data.push(cloneObject(data));
        localStorage.list = JSON.stringify(list);
        return Object.assign({}, state, { list, editing: cloneObject(initialEditing) });
    },
    [Types.CLOSE_QUESTIONNAIRE](state, action) {
        const { list } = state;
        const questionnaire = action.payload;
        list[questionnaire].status = CLOSED;
        localStorage.list = JSON.stringify(list);
        return Object.assign({}, state, { list });
    },
    [Types.EDIT_TEXT](state, action) {
        const { editing } = state;
        const { content, question, option } = action.payload;
        if (question !== -1 && option !== -1 && editing.questions[question].type === TEXT) {
            editing.questions[question].content = content;
            return Object.assign({}, state, { editing });
        }
        else {
            return Object.assign({}, state, { editing: { ...editing, question, option, text: { typing: true, content } } });
        }
    },
    [Types.SAVE_TEXT](state, action) {
        const { editing } = state;
        const { questionnaire, question, option } = editing;
        const content = action.payload;
        switch (true) {
            case question === -1: editing.title = content; break;
            case option === -1: editing.questions[question].content = content; break;
            default: editing.questions[question].options[option] = content;
        }
        return Object.assign({}, state, { editing: { ...editing, question: -1, option: -1, text: { typing: false, content: "" } } });
    },
    [Types.FILL_TEXT](state, action) {
        const { editing } = state;
        const { content, question } = action.payload;
        editing.data[question] = content;
        return Object.assign({}, state, { editing });
    },
    [Types.CHOOSE_TYPE](state, action) {
        const { editing } = state;
        const type = !!(editing.type ^ 1);
        return Object.assign({}, state, { editing: { ...editing, type } });
    },
    [Types.ADD_QUESTION](state, action) {
        const { editing } = state;
        const type = action.payload;
        let question;
        switch (type) {
            case RADIO: question = { type, content: "单选题", options: ["选项1", "选项2"] }; break;
            case CHECKBOX: question = { type, content: "多选题", options: ["选项1", "选项2", "选项3", "选项4"] }; break;
            case TEXT: question = { type, content: "", isRequired: false }; break;
            default: question = {};
        } 
        editing.questions.push(question);
        return Object.assign({}, state, { editing });
    },
    [Types.REMOVE_QUESTION](state, action) {
        const { editing } = state;
        const question = action.payload;
        editing.questions.splice(question, 1);
        return Object.assign({}, state, { editing });
    },
    [Types.SHIFT_QUESTION](state, action) {
        const { editing } = state;
        const { question, direction } = action.payload;
        editing.questions.splice(question + direction, 0, editing.questions.splice(question, 1)[0]);
        return Object.assign({}, state, { editing });
    },
    [Types.COPY_QUESTION](state, action) {
        const { editing } = state;
        const question = action.payload;
        const copy = Object.assign({}, editing.questions[question]);
        if (editing.questions[question].type !== TEXT) {
            copy.options = copy.options.slice(0);
        }
        editing.questions.splice(question + 1, 0, copy);
        return Object.assign({}, state, { editing });
    },
    [Types.ADD_OPTION](state, action) {
        const { editing } = state;
        const question = action.payload;
        editing.questions[question].options.push(`选项${editing.questions[question].options.length + 1}`);
        return Object.assign({}, state, { editing });
    },
    [Types.REMOVE_OPTION](state, action) {
        const { editing } = state;
        const { question, option } = action.payload;
        editing.questions[question].options.splice(option, 1);
        return Object.assign({}, state, { editing });
    },
    [Types.CHOOSE_OPTION](state, action) {
        const { editing } = state;
        const { question, option } = action.payload;
        editing.data[question] = option;
        return Object.assign({}, state, { editing });
    },
    [Types.TOGGLE_OPTION](state, action) {
        const { editing } = state;
        const { question, option } = action.payload;
        const index = editing.data[question].indexOf(option);
        index ^ -1 ? editing.data[question].splice(index, 1) : editing.data[question].push(option);
        return Object.assign({}, state, { editing });
    },
    [Types.TOGGLE_REQUIREMENT](state, action) {
        const { editing } = state;
        const question = action.payload;
        editing.questions[question].isRequired = !!(editing.questions[question].isRequired ^ 1);
        return Object.assign({}, state, { editing });
    },
    [Types.SAVE_TIME](state, action) {
        const { editing } = state;
        const { year, month, date } = action.payload;
        editing.time = new Date(year, month - 1, date).getTime();
        return Object.assign({}, state, { editing })
    },
    [Types.CHECK_DATA](state, action) {
        const questionnaire = action.payload;
        return Object.assign({}, state, { editing: { ...cloneObject(initialEditing), questionnaire } });
    }
}, initialState);

export default questionnaires;
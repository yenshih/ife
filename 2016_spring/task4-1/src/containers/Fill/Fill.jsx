import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import classNames from "classnames";
import { isArray, isInteger } from "../../scripts/util";
import { Dialog } from "../../components";
import * as QuestionnaireActions from "../../actions/questionnaires";
import * as DialogActions from "../../actions/dialog";
import { RADIO, CHECKBOX, TEXT } from "../../constants/QuestionTypes";
import { UNRELEASED, RELEASED, CLOSED } from "../../constants/QuestionnaireStatusTypes";
import styles from "./Fill.scss";

const testOptions = (props, propName, componentName) => {
    if (props.type !== TEXT
        && !(props.options && isArray(props.options) && props.options.every((option) => typeof option === "string"))) {
        return new Error(`Invalid prop '${propName}' supplied to ${componentName}. Validation failed.`);
    }
};

const testIsRequired = (props, propName, componentName) => {
    if (props.type === TEXT && typeof props.isRequired !== "boolean") {
        return new Error(`Invalid prop '${propName}' supplied to ${componentName}. Validation failed.`);
    }
};

const testIndex = (props, propName, componentName) => {
    if (!(isInteger(props[propName]) && props[propName] >= -1)) {
        return new Error(`Invalid prop '${propName}' supplied to ${componentName}. Validation failed.`);
    }
};

const mapStateToProps = state => ({
    questionnaires: state.questionnaires,
    dialog: state.dialog
});

const mapDispatchToProps = dispatch => ({
    actions: Object.assign({},
        bindActionCreators(QuestionnaireActions, dispatch),
        bindActionCreators(DialogActions, dispatch)
    )
});

@connect(mapStateToProps, mapDispatchToProps)
class Fill extends Component {
    static propTypes = {
        questionnaires: PropTypes.shape({
            list: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string.isRequired,
                time: PropTypes.number.isRequired,
                status: PropTypes.oneOf([UNRELEASED, RELEASED, CLOSED]).isRequired,
                questions: PropTypes.arrayOf(PropTypes.shape({
                    type: PropTypes.oneOf([RADIO, CHECKBOX, TEXT]).isRequired,
                    content: PropTypes.string.isRequired,
                    options: testOptions,
                    isRequired: testIsRequired
                }).isRequired).isRequired,
                data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
                    testIndex,
                    PropTypes.arrayOf(testIndex),
                    PropTypes.string
                ]).isRequired).isRequired).isRequired
            })).isRequired,
            editing: PropTypes.shape({
                questionnaire: testIndex,
                title: PropTypes.string.isRequired,
                time: PropTypes.number.isRequired,
                order: PropTypes.oneOf([0, 1]).isRequired,
                questions: PropTypes.arrayOf(PropTypes.shape({
                    content: PropTypes.string.isRequired,
                    type: PropTypes.oneOf([RADIO, CHECKBOX, TEXT]).isRequired,
                    options: testOptions,
                    isRequired: testIsRequired
                }).isRequired).isRequired,
                type: PropTypes.bool.isRequired,
                question: testIndex,
                option: testIndex,
                text: PropTypes.shape({
                    typing: PropTypes.bool.isRequired,
                    content: PropTypes.string.isRequired
                }).isRequired,
                data: PropTypes.arrayOf(PropTypes.oneOfType([
                    testIndex,
                    PropTypes.arrayOf(testIndex),
                    PropTypes.string
                ]).isRequired).isRequired
            }).isRequired
        }).isRequired,
        dialog: PropTypes.shape({
            status: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
            id: PropTypes.string.isRequired
        }).isRequired,
        actions: PropTypes.shape({
            chooseOption: PropTypes.func.isRequired,
            toggleOption: PropTypes.func.isRequired,
            fillText: PropTypes.func.isRequired,
            submitQuestionnaire: PropTypes.func.isRequired,
            switchDialog: PropTypes.func.isRequired
        }).isRequired
    };
    constructor(props) {
        super(props);
        this.handleClickOption = this.handleClickOption.bind(this);
        this.handleFillText = this.handleFillText.bind(this);
        this.handleSubmitQuestionnaire = this.handleSubmitQuestionnaire.bind(this);
    }
    handleClickOption(type, question, option) {
        const { chooseOption, toggleOption } = this.props.actions;
        return (event) => {
            switch (type) {
                case RADIO: chooseOption(question, option); break;
                case CHECKBOX: toggleOption(question, option); break;
            }
        };
    }
    handleFillText(question) {
        const { actions: { fillText } } = this.props;
        return event => fillText(event.target.value, question);
    }
    handleSubmitQuestionnaire(event) {
        const { dialog: { status }, actions: { submitQuestionnaire, switchDialog } } = this.props;
        const id = "submit-btn";
        if (status ^ 1 && status ^ 3) {
            if (event.target === this.refs[id]) {
                switchDialog(id);
                setTimeout(() => switchDialog(id), 290)
            }
            else if (status === 2) {
                if (event.target === this.refs["confirm-btn"]) {
                    submitQuestionnaire();
                    switchDialog("");
                    switchDialog("");
                }
                else {
                    switchDialog(id);
                    setTimeout(() => switchDialog(id), 290);
                }
            }
        }
    }
    isFilled() {
        const { questionnaires: { list, editing: { questionnaire, data } } } = this.props;
        return data.every((datum, questionIndex) => {
            const question = list[questionnaire].questions[questionIndex];
            switch (question.type) {
                case RADIO: return datum ^ -1;
                case CHECKBOX: return datum.length;
                case TEXT: return !question.isRequired || datum;
            }
        });
    }
    renderDialog(id, onLeave, children) {
        const { dialog } = this.props;
        let [btnTop, btnLeft] = [0, 0];
        if (dialog.status && dialog.id === id) {
            const { top, right, bottom, left } = this.refs[id].getBoundingClientRect();
            [btnTop, btnLeft] = [top + bottom >> 1, left + right >> 1];
        }
        return (
            <Dialog
                dialog={dialog}
                id={id}
                top={btnTop}
                left={btnLeft}
                onLeave={onLeave}
                title={"提示"}
            >
                {children}
            </Dialog>
        );
    }
    render() {
        const { questionnaires: { list, editing: { questionnaire, data } } } = this.props;
        const { title, questions } = list[questionnaire];
        return (
            <div>
                <h1 className={styles["questionnaire-title"]}>
                    {title}
                </h1>
                <hr className={styles.line}/>
                <div className={styles["question-wrap"]}>
                    {questions.map((question, questionIndex) =>
                        <div
                            key={questionIndex}
                            className={styles.question}
                        >
                            <div className={styles.caption}>
                                <span>{`Q${questionIndex + 1}`}</span>
                                <div className={styles["question-content"]}>
                                    {question.content}
                                </div>
                            </div>
                            {question.type !== TEXT ? (
                                <div>
                                    {question.options.map((option, optionIndex) =>
                                        <div
                                            key={optionIndex}
                                            className={styles["option-wrap"]}
                                            onClick={this.handleClickOption(question.type, questionIndex, optionIndex)}
                                        >
                                            <span
                                                className={classNames({
                                                    [styles["radio-option-icon"]]: question.type === RADIO
                                                        && data[questionIndex] !== optionIndex,
                                                    [styles["radio-icon"]]: question.type === RADIO
                                                        && data[questionIndex] === optionIndex,
                                                    [styles["checkbox-option-icon"]]: question.type === CHECKBOX
                                                        && !data[questionIndex].includes(optionIndex),
                                                    [styles["checkbox-icon"]]: question.type === CHECKBOX
                                                        && data[questionIndex].includes(optionIndex)
                                                })}
                                            />
                                            <span>{option}</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <textarea
                                        value={data[questionIndex]}
                                        className={styles.text}
                                        onChange={this.handleFillText(questionIndex)}
                                    />
                                    <div className={styles.hint}>
                                        <span>{question.isRequired ? "此题为必填" : "此题为选填"}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <hr className={styles.line}/>
                <div className={styles.footer}>
                    <input
                        ref="submit-btn"
                        type="button"
                        value="提交问卷"
                        className={styles["submit-btn"]}
                        onClick={this.handleSubmitQuestionnaire}
                    />
                    {this.renderDialog("submit-btn", this.handleSubmitQuestionnaire, this.isFilled() ? (
                        <div className={styles.dialog}>
                            <div>
                                <p>{`确认提交问卷？`}</p>
                            </div>
                            <div className={styles["btn-wrap"]}>
                                <Link to="/" className={styles.link}>
                                    <input
                                        ref="confirm-btn"
                                        type="button"
                                        value="确定"
                                        className={styles.btn}
                                        onClick={this.handleSubmitQuestionnaire}
                                    />
                                </Link>
                                <input
                                    type="button"
                                    value="取消"
                                    className={styles.btn}
                                    onClick={this.handleSubmitQuestionnaire}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.dialog}>
                            <div>
                                <p>{`请完整填写问卷。`}</p>
                            </div>
                            <div className={styles["btn-wrap"]}>
                                <input
                                    type="button"
                                    value="确定"
                                    className={styles.btn}
                                    onClick={this.handleSubmitQuestionnaire}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Fill;
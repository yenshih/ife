import React, { Component, PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import classNames from "classnames";
import { Input, Dialog, Calendar } from "../../components";
import * as QuestionnaireActions from "../../actions/questionnaires";
import * as DialogActions from "../../actions/dialog";
import * as CalendarActions from "../../actions/calendar";
import { RADIO, CHECKBOX, TEXT } from "../../constants/QuestionTypes";
import { UNRELEASED, RELEASED, CLOSED } from "../../constants/QuestionnaireStatusTypes";
import styles from "./Edit.scss";

const isArray = array => Object.prototype.toString.call(array) === "[object Array]";

const testQuestion = (props, key, componentName, location, propFullName) => {
    if (!(typeof props.content === "string"
        && ((props.type === RADIO || props.type === CHECKBOX)
                && props.options && isArray(props.options) && props.options.every((option) => typeof option === "string")
            || props.type === TEXT && typeof props.isRequired === "bool"))) {
        return new Error(`Invalid prop '${propFullName}' supplied to ${componentName}. Validation failed.`);
    }
};

const testIndex = (props, propName, componentName) => {
    if (!(typeof props[propName] === "number" && parseInt(props[propName], 10) === props[propName] && props[propName] >= -1)) {
        return new Error(`Invalid prop '${propName}' supplied to ${componentName}. Validation failed.`);
    }
}

const mapStateToProps = state => ({
    questionnaires: state.questionnaires,
    dialog: state.dialog,
    calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
    actions: Object.assign({},
        bindActionCreators(QuestionnaireActions, dispatch),
        bindActionCreators(DialogActions, dispatch),
        bindActionCreators(CalendarActions, dispatch)
    )
});

@connect(mapStateToProps, mapDispatchToProps)
class Edit extends Component {
    static propTypes = {
        questionnaires: PropTypes.shape({
            list: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string.isRequired,
                time: PropTypes.number.isRequired,
                status: PropTypes.oneOf([UNRELEASED, RELEASED, CLOSED]).isRequired,
                questions: PropTypes.arrayOf(PropTypes.objectOf(testQuestion).isRequired).isRequired
            })).isRequired,
            editing: PropTypes.shape({
                questionnaire: testIndex,
                title: PropTypes.string.isRequired,
                time: PropTypes.number.isRequired,
                questions: PropTypes.arrayOf(PropTypes.objectOf(testQuestion).isRequired).isRequired,
                type: PropTypes.bool.isRequired,
                question: testIndex,
                option: testIndex,
                text: PropTypes.shape({
                    typing: PropTypes.bool.isRequired,
                    content: PropTypes.string.isRequired
                }).isRequired
            }).isRequired
        }).isRequired,
        dialog: PropTypes.object.isRequired,
        calendar: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            editText: PropTypes.func.isRequired,
            saveText: PropTypes.func.isRequired,
            chooseType: PropTypes.func.isRequired,
            addQuestion: PropTypes.func.isRequired,
            removeQuestion: PropTypes.func.isRequired,
            shiftQuestion: PropTypes.func.isRequired,
            copyQuestion: PropTypes.func.isRequired,
            addOption: PropTypes.func.isRequired,
            removeOption: PropTypes.func.isRequired,
            toggleRequirement: PropTypes.func.isRequired,
            saveQuestionnaire: PropTypes.func.isRequired,
            releaseQuestionnaire: PropTypes.func.isRequired,
            switchDialog: PropTypes.func.isRequired
        }).isRequired
    };
    constructor(props) {
        super(props);
        this.handleEditText = this.handleEditText.bind(this);
        this.handleSaveText = this.handleSaveText.bind(this);
        this.handleChooseType = this.handleChooseType.bind(this);
        this.handleAddQuestion = this.handleAddQuestion.bind(this);
        this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this);
        this.handleShiftQuestion = this.handleShiftQuestion.bind(this);
        this.handleCopyQuestion = this.handleCopyQuestion.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleRemoveOption = this.handleRemoveOption.bind(this);
        this.handleToggleRequirement = this.handleToggleRequirement.bind(this);
        this.handleSaveQuestionnaire = this.handleSaveQuestionnaire.bind(this);
        this.handleReleaseQuestionnaire = this.handleReleaseQuestionnaire.bind(this);
    }
    handleEditText(question, option, content) {
        const { actions: { editText } } = this.props;
        return event => editText(content || event.target.value, question, option);
    }
    handleSaveText(event) {
        const { actions: { saveText } } = this.props;
        saveText(event.target.value.trim());
    }
    handleChooseType() {
        const { chooseType } = this.props.actions;
        chooseType();
    }
    handleAddQuestion(event) {
        const { chooseType, addQuestion } = this.props.actions;
        chooseType();
        [RADIO, CHECKBOX, TEXT].forEach((element) => event.target === this.refs[element] && addQuestion(element));
    }
    handleRemoveQuestion(question) {
        const { removeQuestion } = this.props.actions;
        return event => removeQuestion(question);
    }
    handleShiftQuestion(question, direction) {
        const { shiftQuestion } = this.props.actions;
        return event => shiftQuestion(question, direction);
    }
    handleCopyQuestion(question) {
        const { copyQuestion } = this.props.actions;
        return event => copyQuestion(question);
    }
    handleAddOption(question) {
        const { addOption } = this.props.actions;
        return event => addOption(question);
    }
    handleRemoveOption(question, option) {
        const { removeOption } = this.props.actions;
        return event => removeOption(question, option);
    }
    handleToggleRequirement(question) {
        const { toggleRequirement } = this.props.actions;
        return event => toggleRequirement(question);
    }
    handleSaveQuestionnaire() {
        const { saveQuestionnaire } = this.props.actions;
        saveQuestionnaire();
    }
    handleReleaseQuestionnaire(event) {
        const { dialog: { status }, actions: { switchDialog, releaseQuestionnaire } } = this.props;
        if (status ^ 1 && status ^ 3) {
            if (event.target === this.refs["release-btn"]) {
                switchDialog();
                setTimeout(() => switchDialog(), 300)
            }
            else if (status === 2) {
                if (event.target === this.refs["confirm-btn"]) {
                    releaseQuestionnaire();
                }
                switchDialog();
                setTimeout(() => switchDialog(), 300);
            }
        }
    }
    renderQuestionnaireTitle() {
        const { questionnaires: { list, editing } } = this.props;
        if (editing.text.typing && editing.question === -1 && editing.option === -1) {
            return (
                <Input
                    content={editing.text.content}
                    className={styles["edit-questionnaire-title"]}
                    onEdit={this.handleEditText(-1, -1)}
                    onSave={this.handleSaveText}
                />
            )
        }
        else {
            const title = editing.title;
            return (
                <h1
                    className={styles["questionnaire-title"]}
                    onClick={this.handleEditText(-1, -1, title)}
                >
                    {title}
                </h1>
            )
        }
    }
    renderQuestionContent(question) {
        const { questionnaires: { list, editing } } = this.props;
        if (editing.text.typing && editing.question === question && editing.option === -1) {
            return (
                <Input 
                    content={editing.text.content}
                    className={styles["edit-question-content"]}
                    onEdit={this.handleEditText(editing.question, -1)}
                    onSave={this.handleSaveText}
                />
            );
        }
        else {
            const { type } = editing.questions[question];
            if (type === TEXT) {
                return (
                    <div className={styles["question-content"]}>
                        <span>{`${TEXT}题`}</span>
                    </div>
                );
            }
            else {
                const { content } = editing.questions[question];
                return (
                    <div
                        className={styles["question-content"]}
                        onClick={this.handleEditText(question, -1, content)}
                    >
                        {content}
                    </div>
                );
            }
        }
    }
    renderOption(question, option) {
        const { questionnaires: { list, editing } } = this.props;
        if (editing.text.typing && editing.question === question && editing.option === option) {
            return (
                <Input
                    content={editing.text.content}
                    className={styles["edit-option"]}
                    onEdit={this.handleEditText(editing.question, editing.option)}
                    onSave={this.handleSaveText}
                />
            );
        }
        else {
            const content = editing.questions[question].options[option];
            return (
                <span
                    onClick={this.handleEditText(question, option, content)}
                >
                    {content}
                </span>
            );
        }
    }
    renderQuestions() {
        const { questionnaires: { editing } } = this.props;
        const last = editing.questions.length - 1;
        return (
            editing.questions.map((question, questionIndex) =>
                <div
                    key={questionIndex}
                    className={styles.question}
                >
                    <div>
                        <span>{`Q${questionIndex + 1}`}</span>
                        {this.renderQuestionContent(questionIndex)}
                    </div>
                    {question.type !== TEXT ? (
                        <div>
                            {question.options.map((option, optionIndex) => 
                                <div
                                    key={optionIndex}
                                    className={styles["option-wrap"]}
                                >
                                    <span
                                        className={classNames({
                                            [styles["radio-option-icon"]]: question.type === RADIO,
                                            [styles["checkbox-option-icon"]]: question.type === CHECKBOX
                                        })}
                                    />
                                    {this.renderOption(questionIndex, optionIndex)}
                                    <span
                                        className={styles["remove-option-btn"]}
                                        onClick={this.handleRemoveOption(questionIndex, optionIndex)}
                                    />
                                </div>
                            )}
                            <div
                                className={styles["add-option-btn"]}
                                onClick={this.handleAddOption(questionIndex)}
                            />
                        </div>
                    ) : (
                        <div>
                            <textarea
                                value={question.content}
                                className={styles.text}
                                onChange={this.handleEditText(questionIndex, 0)}
                            />
                            <div
                                className={classNames({
                                    [styles.required]: question.isRequired,
                                    [styles["not-required"]]: !question.isRequired
                                })}
                                onClick={this.handleToggleRequirement(questionIndex)}
                            >
                                此题是否必填
                            </div>
                        </div>
                    )}
                    <div className={styles["operation-wrap"]}>
                        {questionIndex > 0 ? (
                            <div
                                className={styles.operation}
                                onClick={this.handleShiftQuestion(questionIndex, -1)}
                            >
                                <span>上移</span>
                            </div>
                        ) : (
                            <span />
                        )}
                        {questionIndex < last ? (
                            <div
                                className={styles.operation}
                                onClick={this.handleShiftQuestion(questionIndex, 1)}
                            >
                                <span>下移</span>
                            </div>
                        ) : (
                            <span />
                        )}
                        <div
                            className={styles.operation}
                            onClick={this.handleCopyQuestion(questionIndex)}
                        >
                            <span>复用</span>
                        </div>
                        <div
                            className={styles.operation}
                            onClick={this.handleRemoveQuestion(questionIndex)}
                        >
                            <span>删除</span>
                        </div>
                    </div>
                </div>
            )
        );
    }
    renderTypes() {
        const { questionnaires: { editing: { type } } } = this.props;
        if (type) {
            return (
                <div 
                    className={styles["type-wrap"]}
                    onClick={this.handleAddQuestion}
                >
                    <div ref={RADIO} className={classNames(styles.type, styles.radio)}>{RADIO}</div>
                    <div ref={CHECKBOX} className={classNames(styles.type, styles.checkbox)}>{CHECKBOX}</div>
                    <div ref={TEXT} className={classNames(styles.type, styles.text)}>{TEXT}</div>
                </div>
            );
        }
    }
    renderCalendar() {
        const { questionnaires: { editing: { time } }, calendar, actions } = this.props;
        return (
            <Calendar
                calendar={calendar}
                actions={actions}
                time={time}
            />
        );
    }
    renderDialog() {
        const { dialog, questionnaires: { editing } } = this.props;
        const time = new Date(editing.time);
        const [year, month, date] = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
        let [btnTop, btnLeft] = [0, 0];
        if (dialog.status) {
            const { top, right, bottom, left } = this.refs["release-btn"].getBoundingClientRect();
            [btnTop, btnLeft] = [top + bottom >> 1, left + right >> 1];
        }
        return (
            <Dialog
                dialog={dialog}
                top={btnTop}
                left={btnLeft}
                onLeave={this.handleReleaseQuestionnaire}
                title={"提示"}
            >
                <p>{`是否发布问卷？`}</p>
                <p>{`（本问卷截止日期为${year}-${month}-${date}）`}</p>
                <Link to="/" className={styles.link}>
                    <input
                        ref="confirm-btn" 
                        type="button"
                        value="确定"
                        className={styles.btn}
                        onClick={this.handleReleaseQuestionnaire}
                    />
                </Link>
                <input
                    type="button"
                    value="取消"
                    className={styles.btn}
                    onClick={this.handleReleaseQuestionnaire}
                />
            </Dialog>
        );
    }
    render() {
        return (
            <div>
                {this.renderQuestionnaireTitle()}
                <hr className={styles.line}/>
                <div className={styles["question-wrap"]}>
                    {this.renderQuestions()}
                </div>
                <div className={styles["add-question"]}>
                    <ReactCSSTransitionGroup
                        transitionName={styles}
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        {this.renderTypes()}
                    </ReactCSSTransitionGroup>
                    <div
                        className={styles["add-question-btn"]}
                        onClick={this.handleChooseType}
                    >
                        <span>添加问题</span>
                    </div>
                </div>
                <hr className={styles.line}/>
                <div className={styles.footer}>
                    <div className={styles["date-wrap"]}>
                        <span>问卷截止日期</span>
                        {this.renderCalendar()}
                    </div>
                    <input
                        type="button"
                        value="保存问卷"
                        className={styles.btn}
                        onClick={this.handleSaveQuestionnaire}
                    />
                    <input
                        ref="release-btn"
                        type="button"
                        value="发布问卷"
                        className={styles.btn}
                        onClick={this.handleReleaseQuestionnaire}
                    />
                    {this.renderDialog()}
                </div>
            </div>
        );
    }
}

export default Edit;
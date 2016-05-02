import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import classNames from "classnames";
import { Input, Calendar } from "../../components";
import * as QuestionnaireActions from "../../actions/questionnaires";
import * as CalendarActions from "../../actions/calendar";
import { RADIO, CHECKBOX, TEXT } from "../../constants/QuestionTypes";
import styles from "./Edit.scss";

const mapStateToProps = state => ({
    questionnaires: state.questionnaires,
    calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
    actions: Object.assign({},
        bindActionCreators(QuestionnaireActions, dispatch),
        bindActionCreators(CalendarActions, dispatch)
    )
});

@connect(mapStateToProps, mapDispatchToProps)
class Edit extends Component {
    static propTypes = {

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
        chooseType(true, true, false);
        setTimeout(() => chooseType(false, true, false), 300);
    }
    handleAddQuestion(event) {
        const { chooseType, addQuestion } = this.props.actions;
        chooseType(false, true, true);
        setTimeout(() => chooseType(false, false, false), 300);
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
        localStorage.questionnaires = this.props.questionnaires;
    }
    handleReleaseQuestionnaire() {
        const { releaseQuestionnaire } = this.props.actions;
        releaseQuestionnaire();
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
            const title = list[editing.questionnaire].title;
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
    renderQuestionTitle(question) {
        const { questionnaires: { list, editing } } = this.props;
        if (editing.text.typing && editing.question === question && editing.option === -1) {
            return (
                <Input 
                    content={editing.text.content}
                    className={styles["edit-question-title"]}
                    onEdit={this.handleEditText(editing.question, -1)}
                    onSave={this.handleSaveText}
                />
            );
        }
        else {
            const title = list[editing.questionnaire].questions[question].title;
            return (
                <div
                    className={styles["question-title"]}
                    onClick={this.handleEditText(question, -1, title)}
                >
                    {title}
                </div>
            );
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
            const content = list[editing.questionnaire].questions[question].options[option];
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
        const { questionnaires: { list, editing: { questionnaire, type: { leave } } } } = this.props;
        const last = list[questionnaire].questions.length - 1;
        return (
            list[questionnaire].questions.map((question, questionIndex) =>
                <div
                    key={questionIndex}
                    className={styles.question}
                >
                    <div>
                        <span>{`Q${questionIndex + 1}`}</span>
                        {this.renderQuestionTitle(questionIndex)}
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
        const { questionnaires: { editing: { type: { enter, visible, leave } } } } = this.props;
        if (visible) {
            return (
                <div 
                    className={classNames({
                        [styles["pull-down"]]: enter,
                        [styles["type-wrap"]]: visible,
                        [styles["pull-up"]]: leave
                    })}
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
    render() {
        return (
            <div>
                {this.renderQuestionnaireTitle()}
                <hr className={styles.line}/>
                <div className={styles["question-wrap"]}>
                    {this.renderQuestions()}
                </div>
                <div className={styles["add-question"]}>
                    {this.renderTypes()}
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
                    <Link to="/" className={styles.link}>
                        <input
                            type="button"
                            value="发布问卷"
                            className={styles.btn}
                            onClick={this.handleReleaseQuestionnaire}
                        />
                    </Link>
                </div>
            </div>
        );
    }
}

export default Edit;
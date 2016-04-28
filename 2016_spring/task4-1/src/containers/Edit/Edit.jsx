import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import classNames from "classnames";
import * as QuestionnaireActions from "../../actions/questionnaires";
import { RADIO, CHECKBOX, TEXT } from "../../constants/QuestionTypes";
import styles from "./Edit.scss";

const mapStateToProps = state => ({
    questionnaires: state.questionnaires
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(QuestionnaireActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class Edit extends Component {
    static propTypes = {

    };
    constructor(props) {
        super(props);
        this.handleEditTitle = this.handleEditTitle.bind(this);
        this.handleConfirmTitle = this.handleConfirmTitle.bind(this);       
        this.handleChooseType = this.handleChooseType.bind(this);
        this.handleAddQuestion = this.handleAddQuestion.bind(this);
    }
    componentDidUpdate(prevProps) {
        const title = this.refs.title;
        if (title) {
            const { questionnaires: { list, editing } } = prevProps;
            if (title.value === list[editing.questionnaire].title) {
                title.focus();
                title.select();
            }
        }
    }
    handleEditTitle(event) {
        if (event.type === "click") {
            const { questionnaires: { list, editing }, actions: { editTitle } } = this.props;
            editTitle(list[editing.questionnaire].title);
        }
        else if (event.type === "change") {
            const { editTitle } = this.props.actions;
            editTitle(event.target.value);
        }
    }
    handleConfirmTitle(event) {
        if (event.type ==="keydown" && event.which === 13 || event.type === "blur") {
            const { confirmTitle } = this.props.actions;
            confirmTitle(event.target.value.trim());
        }
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
    renderTitle() {
        const { questionnaires: { list, editing } } = this.props;
        if (editing.title.typing) {
            return (
                <input
                    ref="title"
                    type="text"
                    value={editing.title.content}
                    className={styles["edit-title"]}
                    onChange={this.handleEditTitle}
                    onKeyDown={this.handleConfirmTitle}
                    onBlur={this.handleConfirmTitle}
                />
            )
        }
        else {
            return (
                <h1
                    className={styles.title}
                    onClick={this.handleEditTitle}
                >
                    {list[editing.questionnaire].title}
                </h1>
            );
        }
    }
    renderQuestions() {
        
    }
    renderTypes(enter, visible, leave) {
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
                    <div ref={RADIO} className={classNames(styles.type, styles.radio)}>单选</div>
                    <div ref={CHECKBOX} className={classNames(styles.type, styles.checkbox)}>多选</div>
                    <div ref={TEXT} className={classNames(styles.type, styles.text)}>文本</div>
                </div>
            );
        }
    }
    render() {
        const { questionnaires: { editing: { type: { enter, visible, leave } } } } = this.props;
        return (
            <div className={styles.wrap}>
                {this.renderTitle()}
                <hr className={styles.line}/>
                {this.renderQuestions()}
                {this.renderTypes(enter, visible, leave)}
                <div
                    className={styles.add}
                    onClick={visible ? () => {} : this.handleChooseType}
                >
                    <span>添加问题</span>
                </div>
                <hr className={styles.line}/>
                <div className={styles.footer}>
                    <div className={styles.date}>
                        <span className={styles.deadline}>问卷截止日期</span>
                        <input type="text" readOnly="readOnly" className={styles.input}/>
                    </div>
                    <Link to="/" className={styles.link}>
                        <input type="button" value="保存问卷" className={styles.btn} />
                    </Link>
                    <input type="button" value="发布问卷" className={styles.btn} />
                </div>
            </div>
        );
    }
}

export default Edit;
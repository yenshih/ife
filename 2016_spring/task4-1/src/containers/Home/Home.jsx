import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import * as QuestionnaireActions from "../../actions/questionnaires";
import styles from "./Home.scss"

const mapStateToProps = state => ({
    questionnaires: state.questionnaires
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(QuestionnaireActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
    static propTypes = {

    };
    constructor(props) {
        super(props);
        this.handleAddQuestionnaire = this.handleAddQuestionnaire.bind(this);
        this.handleEditQuestionnaire = this.handleEditQuestionnaire.bind(this);
    }
    handleAddQuestionnaire() {
        const { addQuestionnaire } = this.props.actions;
        addQuestionnaire();
    }
    handleEditQuestionnaire(questionnaire) {
        const { editQuestionnaire } = this.props.actions;
        return event => editQuestionnaire(questionnaire);
    }
    render() {
        const { questionnaires } = this.props;
        return questionnaires.list.length ? (
            <table>
                <thead>
                    <tr>
                        <td>标题</td>
                        <td>时间</td>
                        <td>状态</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    {questionnaires.list.map((questionnaire, questionnaireIndex) => 
                        <tr>
                            <td>{questionnaire.title}</td>
                            <td>{questionnaire.time}</td>
                            <td>{questionnaire.status}</td>
                            <td>
                                <Link to="/edit">
                                    <input
                                        type="button"
                                        value="编辑"
                                        onClick={this.handleEditQuestionnaire(questionnaireIndex)}
                                    />
                                </Link>
                                <input type="button" value="删除" />
                                <Link to="/check"><input type="button" value="查看问卷" /></Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        ) : (
            <div className={styles.wrap}>
                <Link to="/edit" className={styles.link}>
                    <div
                        className={styles.add}
                        onClick={this.handleAddQuestionnaire}
                    >
                        <span>新建问卷</span>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Home;
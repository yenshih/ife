import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as QuestionnaireActions from "../../actions/questionnaires";
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
    }
    render() {
        return (
            <div className={styles.wrap}>
                <h1 className={styles.title}>这里是标题</h1>
                <hr className={styles.line}/>
                <div>
                    {}
                    <div className={styles.add}>
                        <span>添加问题</span>
                    </div>
                </div>
                <hr className={styles.line}/>
                <div className={styles.footer}>
                    <div className={styles.date}>
                        <span className={styles.deadline}>问卷截止日期</span>
                        <input type="text" readOnly="readOnly" className={styles.input}/>
                    </div>
                    <input type="button" value="保存问卷" className={styles.save} />
                    <input type="button" value="发布问卷" className={styles.release} />
                </div>
            </div>
        );
    }
}

export default Edit;
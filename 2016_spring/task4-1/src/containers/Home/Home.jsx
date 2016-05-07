import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import classNames from "classnames";
import { Dialog, Table, Column, SortableTh } from "../../components";
import * as QuestionnaireActions from "../../actions/questionnaires";
import * as DialogActions from "../../actions/dialog";
import { UNRELEASED, RELEASED, CLOSED } from "../../constants/QuestionnaireStatusTypes";
import styles from "./Home.scss"

const mapStateToProps = state => ({
    questionnaires: state.questionnaires,
    dialog: state.dialog
});

const mapDispatchToProps = dispatch => ({
    actions: Object.assign({},
        bindActionCreators(QuestionnaireActions, dispatch),
        bindActionCreators(DialogActions, dispatch),
    )
});

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
    static propTypes = {

    };
    constructor(props) {
        super(props);
        this.handleAddQuestionnaire = this.handleAddQuestionnaire.bind(this);
        this.handleEditQuestionnaire = this.handleEditQuestionnaire.bind(this);
        this.handleRemoveQuestionnaire = this.handleRemoveQuestionnaire.bind(this);
    }
    componentDidMount() {
        this.table = this.refs["table"];
    }
    handleAddQuestionnaire() {
        const { addQuestionnaire } = this.props.actions;
        addQuestionnaire();
    }
    handleEditQuestionnaire(questionnaire) {
        const { editQuestionnaire } = this.props.actions;
        return event => editQuestionnaire(questionnaire);
    }
    handleRemoveQuestionnaire(questionnaire) {
        const { dialog: { status }, actions: { removeQuestionnaire, switchDialog } } = this.props;
        const id = `remove-btn-${questionnaire}`;
        return (event) => {
            if (status ^ 1 && status ^ 3) {
                if (event.target === this.table.refs[id]) {
                    switchDialog(id);
                    setTimeout(() => switchDialog(id), 290);
                }
                else if (status === 2) {
                    if (event.target === this.table.refs["confirm-btn"]) {
                        removeQuestionnaire(questionnaire);
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
    }
    renderDialog(id, onLeave, children) {
        const { dialog } = this.props;
        let [btnTop, btnLeft] = [0, 0];
        if (dialog.status && dialog.id === id) {
            const { top, right, bottom, left } = this.table.refs[id].getBoundingClientRect();
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
        const { questionnaires } = this.props;
        return questionnaires.list.length ? (
            <div>
                <Table
                    ref="table"
                    data={questionnaires.list}
                    className={styles.table}
                >
                    <Column
                        name="标题"
                        dataKey="title"
                        width="30%"
                        align="center"
                    />
                    <Column
                        name="时间"
                        dataKey="time"
                        width="20%"
                        align="center"
                        td={({ data, row, dataKey, rowIndex, colIndex }) => {
                            const time = new Date(row[dataKey]);
                            const [year, month, date] = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
                            return year === 1970 ? `-` : `${year}-${month}-${date}`;
                        }}
                    />
                    <Column
                        name="状态"
                        dataKey="status"
                        width="10%"
                        align="center"
                        td={({ data, row, dataKey, rowIndex, colIndex }) => (
                            <div
                                className={classNames({
                                    [styles.released]: row[dataKey] === RELEASED,
                                    [styles.closed]: row[dataKey] === CLOSED
                                })}
                            >
                                {row[dataKey]}
                            </div>
                        )}
                    />
                    <Column
                        name="操作"
                        dataKey=""
                        width="40%"
                        align="center"
                        th={({ name, dataKey, colIndex }) => (
                            <div>
                                <span className={styles["btn-hint"]}>{name}</span>
                                <Link to="/edit" className={styles.link}>
                                    <input
                                        type="button"
                                        value="新建问卷"
                                        className={styles["add-btn"]}
                                        onClick={this.handleAddQuestionnaire}
                                    />
                                </Link>
                            </div>
                        )}
                        td={({ data, row, dataKey, rowIndex, colIndex }) => 
                            row.status === UNRELEASED ? (
                                <div>
                                    <Link to="/edit" className={styles.link}>
                                        <input
                                            type="button"
                                            value="编辑问卷"
                                            className={styles.btn}
                                            onClick={this.handleEditQuestionnaire(rowIndex)}
                                        />
                                    </Link>
                                    <input
                                        ref={`remove-btn-${rowIndex}`}
                                        type="button"
                                        value="删除问卷"
                                        className={styles.btn}
                                        onClick={this.handleRemoveQuestionnaire(rowIndex)}
                                    />
                                    {this.renderDialog(`remove-btn-${rowIndex}`, this.handleRemoveQuestionnaire(rowIndex), (
                                        <div className={styles.dialog}>
                                            <div className={styles.hint}>
                                                <p>{`确认删除此问卷？`}</p>
                                            </div>
                                            <div className={styles["btn-wrap"]}>
                                                <Link to="/" className={styles.link}>
                                                    <input
                                                        ref="confirm-btn"
                                                        type="button"
                                                        value="确定"
                                                        className={styles.btn}
                                                        onClick={this.handleRemoveQuestionnaire(rowIndex)}
                                                    />
                                                </Link>
                                                <input
                                                    type="button"
                                                    value="取消"
                                                    className={styles.btn}
                                                    onClick={this.handleRemoveQuestionnaire(rowIndex)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <Link to="/fill" className={styles.link}>
                                        <input
                                            type="button"
                                            value="填写问卷"
                                            className={styles.btn}
                                        />
                                    </Link>
                                    <Link to="/check" className={styles.link}>
                                        <input
                                            type="button"
                                            value="查看数据"
                                            className={styles.btn}
                                        />
                                    </Link>
                                </div>
                            )
                        }
                    />
                </Table>
            </div>
        ) : (
            <div className={styles.wrap}>
                <Link to="/edit" className={styles.link}>
                    <div
                        className={styles["add-btn"]}
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
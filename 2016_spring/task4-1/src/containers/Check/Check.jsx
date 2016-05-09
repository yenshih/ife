import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { isArray, isInteger, mapHsvToRgb } from "../../scripts/util";
import * as QuestionnaireActions from "../../actions/questionnaires";
import { RADIO, CHECKBOX, TEXT } from "../../constants/QuestionTypes";
import { UNRELEASED, RELEASED, CLOSED } from "../../constants/QuestionnaireStatusTypes";
import styles from "./Check.scss";

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
    questionnaires: state.questionnaires
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(QuestionnaireActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class Check extends Component {
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
        actions: {
        	checkData: PropTypes.func.isRequired
        }
    };
    constructor(props) {
    	super(props);
    	this.handleBack = this.handleBack.bind(this);
    }
    handleBack() {
    	const { checkData } = this.props.actions;
        checkData(-1);
    }
    getColor() {
        return mapHsvToRgb((Math.random() + 0.618034) % 1, .5, .95);
    }
    renderChart(question, questionIndex, data) {
        const { type } = question;
        switch (type) {
            case RADIO: {
                const { options } = question;
                const statistic = [];
                data.forEach((answer) => {
                    const optionIndex = answer[questionIndex];
                    const option = options[optionIndex];
                    statistic[optionIndex] ? statistic[optionIndex].value++ : statistic[optionIndex] = { name: option, value: 1 };
                });
                options.forEach((option, optionIndex) => {
                    const rate = statistic[optionIndex] ? statistic[optionIndex].value / data.length * 100 : 0;
                    const value = isInteger(rate) ? rate : Number(rate.toFixed(2));
                    statistic[optionIndex] = { name: option, value };
                });
                console.log(statistic);
                return (
                    <PieChart
                        width={350}
                        height={300}
                    >
                        <Pie
                            data={statistic}
                            cx={175}
                            cy={150}
                            outerRadius={100}
                            fill={this.getColor()}
                            label
                        />
                        <Tooltip />
                    </PieChart>
                );
            }
            case CHECKBOX: {
                const { options } = question;
                const statistic = { name: "数据占比" };
                data.forEach(answer => answer[questionIndex].forEach((optionIndex) => {
                    const option = options[optionIndex]; 
                    statistic[option] = statistic[option] + 1 || 1;
                }));
                options.forEach((option) => {
                    const rate = statistic[option] / data.length * 100 || 0;
                    statistic[option] = isInteger(rate) ? rate : Number(rate.toFixed(2));
                });
                return (
                    <ResponsiveContainer
                        width="100%"
                        height={60 * options.length}
                    >
                        <BarChart
                            layout="vertical"
                            data={[statistic]}
                            margin={{top: 15, right: 35, left: 20, bottom: 5}}
                        >
                            <XAxis
                                type="number"
                                domain={[0, 100]}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                            />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Legend />
                            {options.map((option, optionIndex) =>
                                <Bar
                                    key={optionIndex}
                                    dataKey={option}
                                    fill={this.getColor()}
                                    label
                                />
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                );
            }
            case TEXT: {
            	const { content } = question;
            	const value = "有效回答占比";
            	const statistic = { name: "文本题", [value]: 0 };
                data.forEach(answer => answer[questionIndex] && statistic[value]++);
                const rate = statistic[value] / data.length * 100;
                statistic[value] = isInteger(rate) ? rate : Number(rate.toFixed(2));
                return (
                    <ResponsiveContainer
                        width="100%"
                        height={80}
                    >
                        <BarChart
                            layout="vertical"
                            data={[statistic]}
                            margin={{top: 5, right: 35, left: 20, bottom: 5}}
                        >
                            <XAxis
                                type="number"
                                domain={[0, 100]}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                            />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Legend />
                            <Bar
                                dataKey="有效回答占比"
                                fill={this.getColor()}
                                label
                            />
                        </BarChart>
                    </ResponsiveContainer>
                );
            }
        }
    }
    render() {
        const { questionnaires: { list, editing: { questionnaire } } } = this.props;
        const { title, questions, data } = list[questionnaire];
        return (
            <div>
                <h1 className={styles["questionnaire-title"]}>
                    {title}
                </h1>
                <hr className={styles.line}/>
                <div className={styles.statistic}>
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
                            {this.renderChart(question, questionIndex, data)}
                        </div>
                    )}
                </div>
                <hr className={styles.line}/>
                <div className={styles.footer}>
                    <Link to="/" className={styles.link}>
                        <input
                            type="button"
                            value="返回"
                            className={styles["back-btn"]}
                            onClick={this.handleBack}
                        />
                    </Link>
                </div>
            </div>
        );
    }
}

export default Check;
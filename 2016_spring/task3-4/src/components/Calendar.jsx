import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import * as CalendarDisplayTypes from "../constants/CalendarDisplayTypes";
import styles from "./Calendar.css"

class Calendar extends Component {
    static propTypes = {
        
    };
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    }
    isPrevMonth(i, date) {
        return i === 0 && date >= 22;
    }
    isNextMonth(i, date) {
        return (i === 4 || i === 5) && date <= 13;
    }
    handleClick(i, j) {
        return (event) => {
            const { calendar: { display }, actions: { selectDate, slide } } = this.props;
            let { calendar: { selectedDate: { year, month } } } = this.props;
            switch (display) {
                case CalendarDisplayTypes.MONTH: {
                    const date = Number(event.target.innerHTML);
                    switch (true) {
                        case this.isPrevMonth(i, date): slide("left"); break;
                        case this.isNextMonth(i, date): slide("right"); break;
                        default: selectedDate(year, month, date);
                    }
                    break;
                }
            }
        }
    }
    handleAnimationEnd(event) {
        const { calendar } = this.props;
        const { animation: { direction } } = calendar;
        let { selectedDate: { year, month ,date } } = calendar;
        if (event.animationName.includes("slide")) {
            if (direction === "left") {
                [year, month] = month === 1 ? [year - 1, 12] : [year, month - 1];
            }
            if (direction === "right") {
                [year, month] = month === 12 ? [year + 1, 1] : [year, month + 1];
            }
            this.props.actions.slide("");
            this.props.actions.selectDate(year, month, date);
        }
    }
    getCalendarData(year, month, date) {
        const { display } = this.props.calendar;
        const countDate = [, 31, !(year & 3) && ((year % 100) || !(year % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
        const data = {}, day = new Date(year, month - 1, date).getDay();
        switch (display) {
            case CalendarDisplayTypes.MONTH: {
                let [i, j, k] = [0, 0, 1], offset = 7 - (date - day + 6) % 7, startDate = countDate[(month + 10) % 12 + 1] - offset + 1;
                data.caption = `${year}年${month}月`;
                data.head = ["日", "一", "二", "三", "四", "五", "六"];
                data.body = [[], [], [], [], [], []];
                for (j = 0; j < offset; j++) {
                    data.body[i][j] = startDate + j;
                }
                for (j = offset, k = 1; j < 7; j++, k++) {
                    data.body[i][j] = k;
                }
                for (i = 1; i < 6; i++) {
                    for (j = 0; j < 7; j++, k++) {
                        data.body[i][j] = k;
                        if (k == countDate[month]) {
                            k = 0;
                        }
                    }
                }
                break;
            }
            case CalendarDisplayTypes.YEAR: {
                data.caption = `${year}年`;
                data.head = [];
                data.body = [
                    ["一月", "二月", "三月", "四月"],
                    ["五月", "六月", "七月", "八月"],
                    ["九月", "十月", "十一月", "十二月"]
                ];
                break;
            }
            case CalendarDisplayTypes.DECADE: {
                const decadeStart = Math.floor(year / 10) * 10;
                data.caption = `${decadeStart}-${decadeStart + 9}`;
                data.head = [];
                data.body = [
                    [decadeStart - 1, decadeStart, decadeStart + 1, decadeStart + 2],
                    [decadeStart + 3, decadeStart + 4, decadeStart + 5, decadeStart + 6],
                    [decadeStart + 7, decadeStart + 8, decadeStart + 9, decadeStart + 10]
                ];
                break;
            }
            case CalendarDisplayTypes.CENTURY: {
                const centuryStart = Math.floor(year / 100) * 100;
                data.caption = `${centuryStart}-${centuryStart + 99}`;
                data.head = [];
                data.body = [
                    [`${centuryStart - 10}-${centuryStart - 9}`, `${centuryStart}-${centuryStart + 9}`, `${centuryStart + 10}-${centuryStart + 19}`, `${centuryStart + 20}-${centuryStart + 29}`],
                    [`${centuryStart + 30}-${centuryStart + 39}`, `${centuryStart + 40}-${centuryStart + 49}`, `${centuryStart + 50}-${centuryStart + 59}`, `${centuryStart + 60}-${centuryStart + 69}`],
                    [`${centuryStart + 70}-${centuryStart + 79}`, `${centuryStart + 80}-${centuryStart + 89}`, `${centuryStart + 90}-${centuryStart + 99}`]
                ];
                break;
            }
        }
        return data;
    }
    renderCalendarBody(calendar, data, next) {
        const { currentDate, selectedDate, animation: { direction } } = calendar;
        return (
            <tbody
                className={classNames({
                    [styles.next]: next,
                    [styles["slide-in-left"]]: next && direction === "left",
                    [styles["slide-in-right"]]: next && direction === "right",
                    [styles["slide-out-left"]]: !next && direction === "right",
                    [styles["slide-out-right"]]: !next && direction === "left"
                })}
                onAnimationEnd={this.handleAnimationEnd}
            >
                {data.body.map((row, i) =>
                    <tr key={i}>
                        {row.map((element, j) =>
                            <td
                                key={j}
                                className={classNames({
                                    [styles.data]: true,
                                    [styles.current]: element === currentDate.date && selectedDate.month === currentDate.month && selectedDate.year === currentDate.year && !this.isPrevMonth(i, element) && !this.isNextMonth(i, element),
                                    [styles.selected]: element === selectedDate.date && !this.isPrevMonth(i, element) && !this.isNextMonth(i, element),
                                    [styles.outside]: this.isPrevMonth(i, element) || this.isNextMonth(i, element)
                                })}
                                onClick={this.handleClick(i, j)}
                            >
                                {element}
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        );
    }
    renderNextBody(calendar) {
        const { animation: { direction } } = calendar;
        if (calendar.animation.direction) {
            let { selectedDate: { year, month, date } } = calendar, nextData;
            if (direction === "left") {
                [year, month] = month === 1 ? [year - 1, 12] : [year, month - 1];
            }
            if (direction === "right") {
                [year, month] = month === 12 ? [year + 1, 1] : [year, month + 1];
            }
            nextData = this.getCalendarData(year, month, date);
            return this.renderCalendarBody(calendar, nextData, true);
        }
    }
    render() {
        const { calendar } = this.props;
        const { selectedDate: {year, month, date} } = calendar;
        const data = this.getCalendarData(year, month, date);
        return (
            <table className={styles.table}>
                <caption className={styles.caption}>{data.caption}</caption>
                <thead>
                    <tr>
                        {data.head.map((element, index) => <th key={index} className={styles.head}>{element}</th>)}
                    </tr>
                </thead>
                {this.renderNextBody(calendar)}
                {this.renderCalendarBody(calendar, data, false)}
            </table>
        );
    }
}

export default Calendar;
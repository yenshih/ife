import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import styles from "./Calendar.css"

class Calendar extends Component {
    static propTypes = {
        
    };
    constructor(props) {
        super(props);
        this.handleCaptionClick = this.handleCaptionClick.bind(this);
        this.handleDataClick = this.handleDataClick.bind(this);
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    }
    isPrevMonth(i, date) {
        return i === 0 && date >= 22;
    }
    isNextMonth(i, date) {
        return (i === 4 || i === 5) && date <= 13;
    }
    handleCaptionClick() {
        const { calendar: { selectedDate: { year, month, date }, display }, actions: { zoom } } = this.props;
        if (display < 3) {
            zoom("out", year, month, date, display);
        }
    }
    handleDataClick(i, j) {
        return (event) => {
            const { calendar, actions } = this.props;
            const { display } = calendar;
            switch (display) {
                case 0: {
                    const { selectedDate: { year, month } } = calendar, { select, slide } = actions;
                    const date = Number(event.target.innerHTML);
                    switch (true) {
                        case this.isPrevMonth(i, date): slide("right", year, month, date); break;
                        case this.isNextMonth(i, date): slide("left", year, month, date); break;
                        default: select(year, month, date, display);
                    }
                    break;
                }
                case 1: {
                    const { selectedDate: { year, date }, display } = calendar, { select, zoom } = actions;
                    zoom("in", year, (i << 2) + j + 1, date, display);
                }
            }
        }
    }
    handleAnimationEnd(next) {
        if (next) {
            return (event) => {
                const { calendar, actions } = this.props;
                const { animation: { direction, date } } = calendar;
                let { selectedDate: { year, month }, display } = calendar;
                if (event.animationName.includes("slide")) {
                    const { slide, select } = actions;
                    switch (direction) {
                        case "left": [year, month] = month === 12 ? [year + 1, 1] : [year, month + 1]; break;
                        case "right": [year, month] = month === 1 ? [year - 1, 12] : [year, month - 1]; break;
                    }
                    select(year, month, date, display);
                    slide("", year, month, date);
                }
                if (event.animationName.includes("zoom")) {
                    const { select, zoom } = actions;
                    switch (direction) {
                        case "in": display--; break;
                        case "out": display++; break;
                    }
                    select(year, month, date, display);
                    zoom("", year, month, date);
                }
            }
        }
    }
    getCalendarTable(year, month, date, display) {
        const countDate = [, 31, !(year & 3) && ((year % 100) || !(year % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
        const table = {}, day = new Date(year, month - 1, date).getDay();
        switch (display) {
            case 0: {
                let [i, j, k] = [0, 0, 1], offset = 7 - (date - day + 6) % 7, startDate = countDate[(month + 10) % 12 + 1] - offset + 1;
                table.caption = `${year}年${month}月`;
                table.head = ["日", "一", "二", "三", "四", "五", "六"];
                table.body = [[], [], [], [], [], []];
                for (j = 0; j < offset; j++) {
                    table.body[i][j] = startDate + j;
                }
                for (j = offset, k = 1; j < 7; j++, k++) {
                    table.body[i][j] = k;
                }
                for (i = 1; i < 6; i++) {
                    for (j = 0; j < 7; j++, k++) {
                        table.body[i][j] = k;
                        if (k === countDate[month]) {
                            k = 0;
                        }
                    }
                }
                break;
            }
            case 1: {
                table.caption = `${year}年`;
                table.head = [];
                table.body = [
                    ["一月", "二月", "三月", "四月"],
                    ["五月", "六月", "七月", "八月"],
                    ["九月", "十月", "十一月", "十二月"]
                ];
                break;
            }
            case 2: {
                const decadeStart = Math.floor(year / 10) * 10;
                table.caption = `${decadeStart}-${decadeStart + 9}`;
                table.head = [];
                table.body = [
                    [decadeStart - 1, decadeStart, decadeStart + 1, decadeStart + 2],
                    [decadeStart + 3, decadeStart + 4, decadeStart + 5, decadeStart + 6],
                    [decadeStart + 7, decadeStart + 8, decadeStart + 9, decadeStart + 10]
                ];
                break;
            }
            case 3: {
                const centuryStart = Math.floor(year / 100) * 100;
                table.caption = `${centuryStart}-${centuryStart + 99}`;
                table.head = [];
                table.body = [
                    [`${centuryStart - 10}-${centuryStart - 9}`, `${centuryStart}-${centuryStart + 9}`, `${centuryStart + 10}-${centuryStart + 19}`, `${centuryStart + 20}-${centuryStart + 29}`],
                    [`${centuryStart + 30}-${centuryStart + 39}`, `${centuryStart + 40}-${centuryStart + 49}`, `${centuryStart + 50}-${centuryStart + 59}`, `${centuryStart + 60}-${centuryStart + 69}`],
                    [`${centuryStart + 70}-${centuryStart + 79}`, `${centuryStart + 80}-${centuryStart + 89}`, `${centuryStart + 90}-${centuryStart + 99}`]
                ];
                break;
            }
        }
        return table;
    }
    renderCalendarHead(table, display) {
        if (table.head.length) {
            return (
                <thead>
                    <tr>
                        {table.head.map((element, index) =>
                            <th
                                key={index}
                                className={classNames({
                                    [styles.head]: true,
                                    [styles.line]: !display
                                })}
                            >
                                {element}
                            </th>
                        )}
                    </tr>
                </thead>
            );
        }
    }
    renderCalendarBody(calendar, table, next) {
        const { currentDate, selectedDate, animation: { direction, year, month, date }, display } = calendar;
        return (
            <tbody
                className={classNames({
                    [styles.body]: true,
                    [styles.next]: next,
                    [styles["slide-in-left"]]: next && direction === "right",
                    [styles["slide-in-right"]]: next && direction === "left",
                    [styles["slide-out-left"]]: !next && direction === "left",
                    [styles["slide-out-right"]]: !next && direction === "right",
                    [styles["zoom-in-enter"]]: next && direction === "in",
                    [styles["zoom-in-leave"]]: !next && direction === "in",
                    [styles["zoom-out-enter"]]: next && direction === "out",
                    [styles["zoom-out-leave"]]: !next && direction === "out"
                })}
                onAnimationEnd={this.handleAnimationEnd(next)}
            >
                {table.body.map((row, i) =>
                    <tr key={i}>
                        {row.map((element, j) =>
                            <td
                                key={j}
                                className={classNames({
                                    [styles.data]: true,
                                    [styles["sm-data"]]: next && direction !== "out" || !next && !display,
                                    [styles["lg-data"]]: next && direction === "out" || !next && display,
                                    [styles.current]: direction && next && element === currentDate.date && currentDate.month === month && currentDate.year === year
                                        || direction && !next && element === currentDate.date && selectedDate.month === currentDate.month && selectedDate.year === currentDate.year
                                        || !direction && element === currentDate.date && selectedDate.month === currentDate.month && selectedDate.year === currentDate.year && !this.isPrevMonth(i, element) && !this.isNextMonth(i, element),
                                    [styles.selected]: direction && next && element === date && !this.isPrevMonth(i, element) && !this.isNextMonth(i, element)
                                        || direction && !next && element === date && (this.isPrevMonth(i, element) || this.isNextMonth(i, element))
                                        || !direction && element === selectedDate.date && !this.isPrevMonth(i, element) && !this.isNextMonth(i, element),
                                    [styles.outside]: this.isPrevMonth(i, element) || this.isNextMonth(i, element)
                                })}
                                onClick={this.handleDataClick(i, j)}
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
        if (direction) {
            let { selectedDate: { year, month }, animation: { date }, display } = calendar, nextTable;
            switch (direction) {
                case "left": [year, month] = [year, month + 1]; break;
                case "right": [year, month] = [year, month - 1]; break;
                case "in": display--; break;
                case "out": display++; break;
            }
            nextTable = this.getCalendarTable(year, month, date, display);
            return this.renderCalendarBody(calendar, nextTable, true);
        }
    }
    render() {
        const { calendar } = this.props;
        const { selectedDate: { year, month, date }, display } = calendar;
        const table = this.getCalendarTable(year, month, date, display);
        return (
            <table className={styles.table}>
                <caption
                    className={styles.caption}
                    onClick={this.handleCaptionClick}
                >
                    {table.caption}
                </caption>
                {this.renderCalendarHead(table, display)}
                {this.renderCalendarBody(calendar, table, false)}
                {this.renderNextBody(calendar)}
            </table>
        );
    }
}

export default Calendar;
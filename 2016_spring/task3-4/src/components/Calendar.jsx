import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import styles from "./Calendar.css"

class Calendar extends Component {
    static propTypes = {
        calendar: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.handleCaptionClick = this.handleCaptionClick.bind(this);
        this.handleDataClick = this.handleDataClick.bind(this);
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    }
    handleCaptionClick() {
        const { calendar: { selectedDate: { year, month, date }, display }, actions: { zoom } } = this.props;
        if (display < 3) {
            zoom("out", year, month, date, false);
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
                    const { selectedDate: { year, date }, display } = calendar, { zoom } = actions;
                    zoom("in", year, (i << 2) + j + 1, date, false);
                    break;
                }
                case 2: {
                    const { selectedDate: { year, month, date }, display } = calendar, { zoom } = actions;
                    zoom("in", year - year % 10 - 1 + (i << 2) + j, month, date, !i && !j || i === 2 && j === 3);
                    break;
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
                    zoom("", year, month, date, false);
                }
            }
        }
    }
    isPrevMonth(i, date) {
        return i === 0 && date >= 22;
    }
    isNextMonth(i, date) {
        return (i === 4 || i === 5) && date <= 13;
    }
    isNotThisMonth() {
        let memorize = [[], [], [], [], [], []];
        return (i, date) => {
            if (memorize[i][date] === undefined) {
                memorize[i][date] = this.isPrevMonth(i, date) || this.isNextMonth(i, date);
            }
            return memorize[i][date];
        }
    }
    isNotThisDecade() {
        let memorize = [[], [], []];
        return (i, j) => {
            if (memorize[i][j] === undefined) {
                memorize[i][j] =  !i && !j || i === 2 && j === 3;
            }
            return memorize[i][j];
        }
    }
    isSelected(element, selectedDate, animation, display, i, j, next, isNotThisMonth) {
        const { direction } = animation;
        switch (display) {
            case 0: return element === animation.date && ((direction === "left" || direction === "right") && next ^ isNotThisMonth(i, element) || (direction === "in" || direction === "out") && !isNotThisMonth(i, element)) || !direction && element === selectedDate.date && !isNotThisMonth(i, element);
            case 1: return (i << 2) + j + 1 === animation.month;
            case 2: return element - element % 10 - 1 + (i << 2) + j === animation.year;
        }
    }
    getCalendarTable(year, month, date, display, outside) {
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
                const decadeStart = outside ? year + 1 - (year + 1) % 10 * 11 : year - year % 10
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
    getNextTable(calendar) {
        const { animation: { direction, date, outside } } = calendar;
        let { selectedDate: { year, month }, display } = calendar;
        switch (direction) {
            case "left": [year, month] = month === 12 ? [year + 1, 1] : [year, month + 1]; break;
            case "right": [year, month] = month === 1 ? [year - 1, 12] : [year, month - 1]; break;
            case "in": display--; break;
            case "out": display++; break;
        }
        return this.getCalendarTable(year, month, date, display, outside);
    }
    getFadeStyle(direction) {
        switch (direction) {
            case "left": case "right": return { animationDuration: ".3s" }
            case "in": case "out": return { animationDuration: ".5s" }
        }
    }
    getZoomStyle(animation, display, next) {
        const { direction, year, month, date, outside } = animation;
        if (direction === "out") {
            display++;
        }
        switch (display) {
            case 1: return { transformOrigin: `${(month - 1 & 3) * 70 + 35}px ${(month - 1 >> 2) * 65 + 32.5}px` }
            case 2: return outside ? { transformOrigin: `${(year + 1) % 10 * 210 + 35}px ${(year + 1) % 10 * 130 + 32.5}px`} : { transformOrigin: `${(year % 10 + 1 & 3) * 70 + 35}px ${(year % 10 + 1 >> 2) * 65 + 32.5}px` }
        }
    }
    getDataClassName(element, currentDate, selectedDate, animation, display, i, j, next) {
        const isNotThisMonth = this.isNotThisMonth(), isNotThisDecade = this.isNotThisDecade();
        const { direction } = animation;
        if (next) {
            switch (direction) {
                case "in": display--; break;
                case "out": display++; break;
            }
        }
        return classNames({
            [styles.data]: true,
            [styles["sm-data"]]: !display,
            [styles["lg-data"]]: display,
            [styles.current]: !display && element === currentDate.date && !isNotThisMonth(i, element) && (next ? animation.month === currentDate.month && animation.year === currentDate.year : selectedDate.month === currentDate.month && selectedDate.year === currentDate.year),
            [styles.selected]: this.isSelected(element, selectedDate, animation, display, i, j, next, isNotThisMonth),
            [styles.outside]: !display && isNotThisMonth(i, element) || display === 2 && isNotThisDecade(i, j)
        })
    }
    renderCalendarCaption(calendar, table, next) {
        const { animation: { direction } } = calendar;
        return (
            <caption
                style={this.getFadeStyle(direction)}
                className={classNames({
                    [styles.caption]: true,
                    [styles["next-caption"]]: next,
                    [styles["fade-in"]]: next && direction,
                    [styles["fade-out"]]: !next && direction
                })}
                onClick={this.handleCaptionClick}
            >
                {table.caption}
            </caption>
        );
    }
    renderNextCaption(calendar, nextTable) {
        if (nextTable.caption.length) {
            return this.renderCalendarCaption(calendar, nextTable, true);
        }
    }
    renderCalendarHead(table) {
        if (table.head.length) {
            return (
                <tr>
                    {table.head.map((element, index) =>
                        <th
                            key={index}
                            className={styles.head}
                        >
                            {element}
                        </th>
                    )}
                </tr>
            );
        }
    }
    renderCalendarBody(calendar, table, next) {
        const { currentDate, selectedDate, animation, display } = calendar;
        const { direction } = animation;
        return (
            <tbody
                style={this.getZoomStyle(animation, display, next)}
                className={classNames({
                    [styles["next-body"]]: next,
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
                {this.renderCalendarHead(table)}
                {table.body.map((row, i) =>
                    <tr key={i}>
                        {row.map((element, j) =>
                            <td
                                key={j}
                                className={this.getDataClassName(element, currentDate, selectedDate, animation, display, i, j, next)}
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
    renderNextBody(calendar, nextTable) {
        if (nextTable.body.length) {
            return this.renderCalendarBody(calendar, nextTable, true);
        }
    }
    render() {
        const { calendar } = this.props;
        const { selectedDate: { year, month, date }, animation: { direction, outside }, display } = calendar;
        const table = this.getCalendarTable(year, month, date, display, outside);
        let nextTable = direction ? this.getNextTable(calendar) : { caption: "", head: [], body: [] };
        return (
            <table className={styles.table}>
                {this.renderCalendarCaption(calendar, table, false)}
                {this.renderNextCaption(calendar, nextTable)}
                {this.renderCalendarBody(calendar, table, false)}
                {this.renderNextBody(calendar, nextTable)}
            </table>
        );
    }
}

export default Calendar;
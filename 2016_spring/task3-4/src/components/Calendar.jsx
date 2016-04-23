import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import { LEFT, RIGHT, IN, OUT } from "../constants/CalendarDirectionTypes";
import styles from "./Calendar.css"

class Calendar extends Component {
    static propTypes = {
        calendar: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.handleNavClick = this.handleNavClick.bind(this);
        this.handleCaptionClick = this.handleCaptionClick.bind(this);
        this.handleDataClick = this.handleDataClick.bind(this);
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    }
    handleNavClick(direction) {
        const { calendar: { selected: { year, month, date }, display }, actions: { slide } } = this.props;
        return () => slide(direction, year, month, date, display);
    }
    handleCaptionClick() {
        const { calendar: { selected: { year, month, date }, display }, actions: { zoom } } = this.props;
        display ^ 3 ? zoom(OUT, year, month, date, false) : display;
    }
    handleDataClick(i, j, isOutside) {
        const { calendar: { selected: { year, month, date }, display }, actions: { select, slide, zoom } } = this.props;
        return (event) => {
            switch (display) {
                case 0: {
                    const date = Number(event.target.innerHTML);
                    switch (true) {
                        case this.isPrevMonth(i, date): slide(RIGHT, year, month, date, display); break;
                        case this.isNextMonth(i, date): slide(LEFT, year, month, date, display); break;
                        default: select(year, month, date, display);
                    }
                    break;
                }
                case 1: zoom(IN, year, (i << 2) + j + 1, date, false); break;
                case 2: zoom(IN, year - year % 10 + (i << 2) + j - 1, month, date, isOutside(i, j)); break;
                case 3: zoom(IN, year - year % 100 + year % 10 + ((i << 2) + j - 1) * 10, month, date, isOutside(i, j)); break;
            }
        }
    }
    handleAnimationEnd(display, next) {
        if (next) {
            const { calendar: { animation: { direction, year, month, date } }, actions: { select, slide, zoom } } = this.props;
            return (event) => {
                if (event.animationName.includes("slide")) {
                    select(year, month, date, display);
                    slide("", year, month, date, display);
                }
                if (event.animationName.includes("zoom")) {
                    switch (direction) {
                        case IN: display--; break;
                        case OUT: display++; break;
                    }
                    select(year, month, date, display);
                    zoom("", year, month, date, false);
                }
            }
        }
    }
    isPrevMonth(i, date) {
        return !i && date >= 22;
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
    isOutside() {
        let memorize = [[], [], []];
        return (i, j) => {
            if (memorize[i][j] === undefined) {
                memorize[i][j] = !i && !j || (i === 2 && j === 3);
            }
            return memorize[i][j];
        }
    }
    isForbidden(direction, display) {
        const { calendar: {
            begin: { year: beginYear, month: beginMonth, date: beginDate },
            end: { year: endYear, month: endMonth, date: endDate},
            selected: { year, month, date }
        } } = this.props;
        const count = [, 31, !(year & 3) && ((year % 100) || !(year % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const begin = new Date(beginYear, beginMonth - 1, beginDate), end = new Date(endYear, endMonth - 1, endDate);
        switch (direction) {
            case LEFT: {
                switch (display) {
                    case 0: return new Date(year, month - 1, count[month]) >= end;
                    case 1: return new Date(year, 12, 31) >= end;
                    case 2: return new Date(year - year % 10 + 9, 12, 31) >= end;
                    case 3: return new Date(year - year % 100 + 99, 12, 31) >= end;
                }
            }
            case RIGHT: {
                switch (display) {
                    case 0: return new Date(year, month - 1, 1) <= begin;
                    case 1: return new Date(year, 1, 1) <= begin;
                    case 2: return new Date(year - year % 10, 1, 1) <= begin;
                    case 3: return new Date(year - year % 100, 1, 1) <= begin;
                }
            }
        }
    }
    isHidden(element, display, i, j, next) {
        const { calendar: { 
            begin: { year: beginYear, month: beginMonth, date: beginDate },
            end: { year: endYear, month: endMonth, date: endDate },
            selected: { year: selectedYear, month: selectedMonth },
            animation: { direction, year: nextYear, month: nextMonth, outside }
        } } = this.props;
        const begin = new Date(beginYear, beginMonth - 1, beginDate), end = new Date(endYear, endMonth - 1, endDate);
        switch (display) {
            case 0: {
                const offset = this.isNextMonth(i, element) - this.isPrevMonth(i, element) - 1;
                const [year, month] = next ? [nextYear, nextMonth + offset] : [selectedYear, selectedMonth + offset];
                return new Date(year, month, element) < begin || new Date(year, month, element) > end;
            }
            case 1: {
                const [year, month] = [next ? nextYear : selectedYear, (i << 2) + j];
                return new Date(year, month, 31) < begin || new Date(year, month, 1) > end;
            }
            case 2: {
                return new Date(element, 11, 31) < begin || new Date(element, 0, 1) > end;
            }
            case 3: {
                const offset = ((i << 2) + j - 1) * 10;
                let year = next ? nextYear : selectedYear;
                if (direction === IN && outside && !next) {
                    year = year + 10 - (year + 10) % 10 - (year + 10 - (year + 10) % 10) % 100 * 11 + offset;
                }
                else {
                    year = year - year % 100 + offset;
                }
                return new Date(year + 9, 11, 31) < begin || new Date(year, 0, 1) > end;
            }
        }
    }
    isCurrent(element, display, i, next, isNotThisMonth) {
        const { calendar: {
            current: { year: currentYear, month: currentMonth, date: currentDate },
            selected: { year: selectedYear, month: selectedMonth },
            animation: { year: nextYear, month: nextMonth }
        } } = this.props;
        return !display && element === currentDate && !isNotThisMonth(i, element)
            && (next ? nextYear === currentYear && nextMonth === currentMonth
                : selectedYear === currentYear && selectedMonth === currentMonth);
    }
    isSelected(element, display, i, j, next, isNotThisMonth, isOutside) {
        const { calendar: {
            selected: { date: selectedDate },
            animation: { direction, year: nextYear, month: nextMonth, date: nextDate, outside }
        } } = this.props;
        switch (display) {
            case 0: return element === nextDate
                && ((direction === LEFT || direction === RIGHT) && next ^ isNotThisMonth(i, element)
                    || (direction === IN || direction === OUT) && !isNotThisMonth(i, element))
                || element === selectedDate && !direction && !isNotThisMonth(i, element);
            case 1: return (i << 2) + j + 1 === nextMonth;
            case 2: {
                if (direction === IN && outside && !next) {
                    return element % 10 === nextYear % 10 && isOutside(i, j);
                }
                else {
                    return (i << 2) + j - 1 === element % 10 && element % 10 === nextYear % 10;
                }
            }
            case 3: {
                const offset = ((i << 2) + j) * 10;
                if (direction === IN && outside && !next) {
                    return offset === (nextYear + 10 - (nextYear + 10) % 10) % 100 * 11;
                }
                else {
                    return offset === (nextYear - nextYear % 10) % 100 + 10;
                }
            }
        }
    }
    getTable({ year, month, date }, display, next) {
        const { calendar: { animation: { direction, outside } } } = this.props;
        const table = { caption: "", head: [], body: [] };
        if (!next || next && direction) {
            switch (display) {
                case 0: {
                    const count = [, 31, !(year & 3) && ((year % 100) || !(year % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    const offset = 7 - (date - new Date(year, month - 1, date).getDay() + 6) % 7;
                    table.caption = `${year}年${month}月`;
                    table.head = ["日", "一", "二", "三", "四", "五", "六"];
                    table.body = [[], [], [], [], [], []];
                    for (let i = 0, k = count[(month + 10) % 12 + 1] - offset + 1; i < 6; i++) {
                        for (let j = 0; j < 7; j++, k = !i && j ^ offset || i && k ^ count[month] ? k + 1 : 1) {
                            table.body[i][j] = k;
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
                    const offset = direction === IN && outside && !next ? year + 1 - (year + 1) % 10 * 11 : year - year % 10;
                    table.caption = `${offset}-${offset + 9}`;
                    table.head = [];
                    table.body = [[], [], [], [], [], []];
                    for (let i = 0, k = offset - 1; i < 3; i++){
                        for (let j = 0; j < 4; j++, k++) {
                            table.body[i][j] = k;
                        }
                    }
                    break;
                }
                case 3: {
                    const offset = direction === IN && outside && !next
                        ? (year + 10 - (year + 10) % 10) - (year + 10 - (year + 10) % 10) % 100 * 11
                        : year - year % 100;
                    table.caption = `${offset}-${offset + 99}`;
                    table.head = [];
                    table.body = [[], [], [], [], [], []];
                    for (let i = 0, k = offset - 10; i < 3; i++) {
                        for (let j = 0; j < 4; j++, k += 10) {
                            table.body[i][j] = `${k}-${k + 9}`;
                        }
                    }
                    break;
                }
            }
        }
        return table;
    }
    getNextTable(animation, display) {
        const { direction } = animation;
        display -= direction === IN;
        display += direction === OUT;
        return this.getTable(animation, display, true);
    }
    getFadeStyle(direction) {
        switch (direction) {
            case LEFT: case RIGHT: return { animationDuration: ".3s" }
            case IN: case OUT: return { animationDuration: ".5s" }
        }
    }
    getZoomStyle(display, next) {
        const { calendar: { animation: { direction, year, month, date, outside } } } = this.props;
        display += direction === OUT;
        switch (display) {
            case 1: return { transformOrigin: `${(month - 1 & 3) * 70 + 35}px ${(month - 1 >> 2) * 65 + 32.5}px` }
            case 2: {
                if (outside) {
                    const offset = (year + 1) % 10;
                    return { transformOrigin: `${offset * 210 + 35}px ${offset * 130 + 32.5}px`}
                }
                else {
                    const offset = year % 10 + 1;
                    return { transformOrigin: `${(offset & 3) * 70 + 35}px ${(offset >> 2) * 65 + 32.5}px` }
                }
            }
            case 3: {
                if (outside) {
                    const offset = (year - year % 10 + 10) % 100;
                    return { transformOrigin: `${offset * 21 + 35}px ${offset * 13 + 32.5}px` }
                }
                else {
                    const offset = (year - year % 10) % 100 + 10;
                    return { transformOrigin: `${offset % 40 * 7 + 35}px ${(offset / 10 >> 2) * 65 + 32.5}px`}
                }
            }
        }
    }
    getCalendarClassName(direction, next) {
        return classNames({
            [styles["next-body"]]: next,
            [styles["slide-in-left"]]: next && direction === RIGHT,
            [styles["slide-in-right"]]: next && direction === LEFT,
            [styles["slide-out-left"]]: !next && direction === LEFT,
            [styles["slide-out-right"]]: !next && direction === RIGHT,
            [styles["zoom-in-enter"]]: next && direction === IN,
            [styles["zoom-in-leave"]]: !next && direction === IN,
            [styles["zoom-out-enter"]]: next && direction === OUT,
            [styles["zoom-out-leave"]]: !next && direction === OUT
        })
    }
    getDataClassName(element, direction, display, i, j, next, isNotThisMonth, isOutside) {
        display -= next && direction === IN;
        display += next && direction === OUT;
        return classNames({
            [styles.data]: true,
            [styles["sm-data"]]: !display,
            [styles["lg-data"]]: display,
            [styles.hidden]: this.isHidden(element, display, i, j, next),
            [styles.current]: this.isCurrent(element, display, i, next, isNotThisMonth),
            [styles.selected]: this.isSelected(element, display, i, j, next, isNotThisMonth, isOutside),
            [styles.outside]: !display && isNotThisMonth(i, element) || (display === 2 || display === 3) && isOutside(i, j)
        })
    }
    renderCaption(direction, display, caption, next) {
        if (caption.length) {
            display -= next && direction === IN;
            display += next && direction === OUT;
            const isForbiddenLeft = this.isForbidden(LEFT, display), isForbiddenRight = this.isForbidden(RIGHT, display);
            return (
                <caption>
                    <div
                        className={classNames({
                            [styles.nav]: true,
                            [styles["nav-right"]]: true,
                            [styles["forbidden-right"]]: isForbiddenRight
                        })}
                        onClick={isForbiddenRight ? () => {} : this.handleNavClick(RIGHT)}
                    >
                    </div>
                    <div
                        style={this.getFadeStyle(direction)}
                        className={classNames({
                            [styles.caption]: true,
                            [styles["enable-caption"]]: display ^ 3,
                            [styles["next-caption"]]: next,
                            [styles["fade-in"]]: next && direction,
                            [styles["fade-out"]]: !next && direction
                        })}
                        onClick={this.handleCaptionClick}
                    >
                        {caption}
                    </div>
                    <div
                        className={classNames({
                            [styles.nav]: true,
                            [styles["nav-left"]]: true,
                            [styles["forbidden-left"]]: isForbiddenLeft
                        })}
                        onClick={isForbiddenLeft ? () => {} : this.handleNavClick(LEFT)}
                    >
                    </div>
                </caption>
            );
        }
    }
    renderCalendarHead(head) {
        if (head.length) {
            return (
                <tr>
                    {head.map((element, index) =>
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
    renderCalendar(direction, display, head, body, next, isNotThisMonth, isOutside) {
        if (body.length) {
            return (
                <tbody
                    style={this.getZoomStyle(display, next)}
                    className={this.getCalendarClassName(direction, next)}
                    onAnimationEnd={this.handleAnimationEnd(display, next)}
                >
                    {this.renderCalendarHead(head)}
                    {body.map((row, i) =>
                        <tr key={i}>
                            {row.map((element, j) =>
                                <td
                                    key={j}
                                    className={this.getDataClassName(element, direction, display, i, j, next, isNotThisMonth, isOutside)}
                                    onClick={this.handleDataClick(i, j, isOutside)}
                                >
                                    {element}
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            );
        }
    }
    render() {
        const { calendar, actions } = this.props;
        const { selected, animation, display } = calendar;
        const { direction } = animation;
        const { caption, head, body } = this.getTable(selected, display, false);
        const { caption: nextCaption, head: nextHead, body: nextBody } = this.getNextTable(animation, display);
        const isNotThisMonth = this.isNotThisMonth(), isOutside = this.isOutside();
        return (
            <table className={styles.table}>
                {this.renderCaption(direction, display, caption, false)}
                {this.renderCaption(direction, display, nextCaption, true)}
                {this.renderCalendar(direction, display, head, body, false, isNotThisMonth, isOutside)}
                {this.renderCalendar(direction, display, nextHead, nextBody, true, isNotThisMonth, isOutside)}
            </table>
        );
    }
}

export default Calendar;
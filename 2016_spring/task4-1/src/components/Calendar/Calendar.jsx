import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import { Mask } from "../";
import { LEFT, RIGHT, IN, OUT } from "../../constants/CalendarDirectionTypes";
import styles from "./Calendar.scss";

const isInteger = num => typeof num === "number" && parseInt(num, 10) === num;

const testDate = (props, key, componentName, location, propFullName) => {
    let validation = false;
    if (props.year && props.month && props.date) {
        const { year, month, date } = props;
        const count = [, 31, !(year & 3) && ((year % 100) || !(year % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        switch (key) {
            case "year": validation = isInteger(year); break;
            case "month": validation = isInteger(month) && month >= 1 && month <= 12; break;
            case "date": validation = isInteger(date) && date >= 1 && date <= count[month]; break;
        }
    }
    if (!validation) {
        return new Error(`Invalid prop '${propFullName}' supplied to ${componentName}. Validation failed.`);
    }
}

class Calendar extends Component {
    static propTypes = {
        calendar: PropTypes.shape({
            selected: PropTypes.objectOf(testDate).isRequired,
            next: PropTypes.objectOf(testDate).isRequired,
            direction: PropTypes.oneOf(["", LEFT, RIGHT, IN, OUT]).isRequired,
            display: PropTypes.oneOf([0, 1, 2, 3, 4]).isRequired,
            isOutside: PropTypes.bool.isRequired,
        }).isRequired,
        actions: PropTypes.shape({
            selectDate: PropTypes.func.isRequired,
            slideCalendar: PropTypes.func.isRequired,
            zoomCalendar: PropTypes.func.isRequired,
            saveTime: PropTypes.func.isRequired
        }).isRequired,
        begin: PropTypes.objectOf(testDate).isRequired,
        end: PropTypes.objectOf(testDate).isRequired,
        current: PropTypes.objectOf(testDate).isRequired,
        time: PropTypes.number.isRequired
    };
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleNavClick = this.handleNavClick.bind(this);
        this.handleCaptionClick = this.handleCaptionClick.bind(this);
        this.handleDataClick = this.handleDataClick.bind(this);
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    }
    componentDidMount() {
        const { current: { year, month, date }, actions: { selectDate } } = this.props;
        selectDate(year, month, date, 0);
    }
    handleShow() {
        const { calendar: { selected: { year, month, date }, display }, actions: { selectDate, saveTime } } = this.props;
        if (!display) {
            saveTime(1970, 1, 1);
            selectDate(year, month, date, 1);
        }
    }
    handleSave() {
        const { calendar: { selected: { year, month, date }, display }, actions: { selectDate, saveTime } } = this.props;
        selectDate(year, month, date, 0);
        saveTime(year, month, date);
    }
    handleNavClick(direction) {
        const { calendar: { selected: { year, month, date }, display }, actions: { slideCalendar } } = this.props;
        return () => slideCalendar(direction, year, month, date, display, false);
    }
    handleCaptionClick() {
        const { calendar: { selected: { year, month, date }, display }, actions: { zoomCalendar } } = this.props;
        display ^ 4 ? zoomCalendar(OUT, year, month, date, false) : display;
    }
    handleDataClick(i, j, isOutsideThisRange) {
        const { calendar: { selected: { year, month, date }, display }, actions: { selectDate, slideCalendar, zoomCalendar } } = this.props;
        return (event) => {
            switch (display) {
                case 1: {
                    const date = Number(event.target.innerHTML);
                    switch (true) {
                        case this.isPrevMonth(i, date): slideCalendar(RIGHT, year, month, date, display, true); break;
                        case this.isNextMonth(i, date): slideCalendar(LEFT, year, month, date, display, true); break;
                        default: selectDate(year, month, date, display); setTimeout(() => this.handleSave(), 0);
                    }
                    break;
                }
                case 2: zoomCalendar(IN, year, (i << 2) + j + 1, date, false); break;
                case 3: zoomCalendar(IN, year - year % 10 + (i << 2) + j - 1, month, date, isOutsideThisRange(i, j)); break;
                case 4: zoomCalendar(IN, year - year % 100 + year % 10 + ((i << 2) + j - 1) * 10, month, date, isOutsideThisRange(i, j)); break;
            }
        }
    }
    handleAnimationEnd(display, isNext) {
        if (isNext) {
            const { calendar: { next: { year, month, date }, direction }, actions: { selectDate, slideCalendar, zoomCalendar } } = this.props;
            return (event) => {
                if (event.animationName.includes("slide")) {
                    selectDate(year, month, date, display);
                    slideCalendar("", year, month, date, display ,false);
                }
                if (event.animationName.includes("zoom")) {
                    switch (direction) {
                        case IN: display--; break;
                        case OUT: display++; break;
                    }
                    selectDate(year, month, date, display);
                    zoomCalendar("", year, month, date, false);
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
    isOutsideThisRange() {
        let memorize = [[], [], []];
        return (i, j) => {
            if (memorize[i][j] === undefined) {
                memorize[i][j] = !i && !j || (i === 2 && j === 3);
            }
            return memorize[i][j];
        }
    }
    isForbidden(direction, display) {
        const { calendar: { selected: { year, month, date } },
            begin: { year: beginYear, month: beginMonth, date: beginDate },
            end: { year: endYear, month: endMonth, date: endDate}
        } = this.props;
        const count = [, 31, !(year & 3) && ((year % 100) || !(year % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const begin = new Date(beginYear, beginMonth - 1, beginDate), end = new Date(endYear, endMonth - 1, endDate);
        switch (direction) {
            case LEFT: {
                switch (display) {
                    case 1: return new Date(year, month - 1, count[month]) >= end;
                    case 2: return new Date(year, 12, 31) >= end;
                    case 3: return new Date(year - year % 10 + 9, 12, 31) >= end;
                    case 4: return new Date(year - year % 100 + 99, 12, 31) >= end;
                }
            }
            case RIGHT: {
                switch (display) {
                    case 1: return new Date(year, month - 1, 1) <= begin;
                    case 2: return new Date(year, 1, 1) <= begin;
                    case 3: return new Date(year - year % 10, 1, 1) <= begin;
                    case 4: return new Date(year - year % 100, 1, 1) <= begin;
                }
            }
        }
    }
    isHidden(element, display, i, j, isNext) {
        const { calendar: {
                selected: { year: selectedYear, month: selectedMonth },
                next: { year: nextYear, month: nextMonth }, direction, isOutside
            }, begin: { year: beginYear, month: beginMonth, date: beginDate },
            end: { year: endYear, month: endMonth, date: endDate }
        } = this.props;
        const begin = new Date(beginYear, beginMonth - 1, beginDate), end = new Date(endYear, endMonth - 1, endDate);
        switch (display) {
            case 1: {
                const offset = this.isNextMonth(i, element) - this.isPrevMonth(i, element) - 1;
                const [year, month] = isNext ? [nextYear, nextMonth + offset] : [selectedYear, selectedMonth + offset];
                return new Date(year, month, element) < begin || new Date(year, month, element) > end;
            }
            case 2: {
                const [year, month] = [isNext ? nextYear : selectedYear, (i << 2) + j];
                return new Date(year, month, 31) < begin || new Date(year, month, 1) > end;
            }
            case 3: {
                return new Date(element, 11, 31) < begin || new Date(element, 0, 1) > end;
            }
            case 4: {
                const offset = ((i << 2) + j - 1) * 10;
                let year = isNext ? nextYear : selectedYear;
                if (direction === IN && isOutside && !isNext) {
                    year = year + 10 - (year + 10) % 10 - (year + 10 - (year + 10) % 10) % 100 * 11 + offset;
                }
                else {
                    year = year - year % 100 + offset;
                }
                return new Date(year + 9, 11, 31) < begin || new Date(year, 0, 1) > end;
            }
        }
    }
    isCurrent(element, display, i, isNext, isNotThisMonth) {
        const { calendar: {
                selected: { year: selectedYear, month: selectedMonth },
                next: { year: nextYear, month: nextMonth } 
            }, current: { year: currentYear, month: currentMonth, date: currentDate }
        } = this.props;
        return display === 1 && element === currentDate && !isNotThisMonth(i, element)
            && (isNext ? nextYear === currentYear && nextMonth === currentMonth
                : selectedYear === currentYear && selectedMonth === currentMonth);
    }
    isSelected(element, display, i, j, isNext, isNotThisMonth, isOutsideThisRange) {
        const { calendar: {
            selected: { date: selectedDate },
            next: { year: nextYear, month: nextMonth, date: nextDate },
            direction, isOutside
        } } = this.props;
        switch (display) {
            case 1: return element === nextDate
                && ((direction === LEFT || direction === RIGHT)
                        && (!(isOutside ^ isNotThisMonth(i, element)) || isNext && !isNotThisMonth(i, element))
                    || (direction === IN || direction === OUT)
                        && !isNotThisMonth(i, element))
                || element === selectedDate && !direction && !isNotThisMonth(i, element);
            case 2: return (i << 2) + j + 1 === nextMonth;
            case 3: {
                if (direction === IN && isOutside && !isNext) {
                    return element % 10 === nextYear % 10 && isOutsideThisRange(i, j);
                }
                else {
                    return (i << 2) + j - 1 === element % 10 && element % 10 === nextYear % 10;
                }
            }
            case 4: {
                const offset = ((i << 2) + j) * 10;
                if (direction === IN && isOutside && !isNext) {
                    return offset === (nextYear + 10 - (nextYear + 10) % 10) % 100 * 11;
                }
                else {
                    return offset === (nextYear - nextYear % 10) % 100 + 10;
                }
            }
        }
    }
    getTable({ year, month, date }, display, isNext) {
        const { calendar: { direction, isOutside } } = this.props;
        const table = { caption: "", head: [], body: [] };
        if (!isNext || isNext && direction) {
            switch (display) {
                case 1: {
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
                case 2: {
                    table.caption = `${year}年`;
                    table.head = [];
                    table.body = [
                        ["一月", "二月", "三月", "四月"],
                        ["五月", "六月", "七月", "八月"],
                        ["九月", "十月", "十一月", "十二月"]
                    ];
                    break;
                }
                case 3: {
                    const offset = direction === IN && isOutside && !isNext ? year + 1 - (year + 1) % 10 * 11 : year - year % 10;
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
                case 4: {
                    const offset = direction === IN && isOutside && !isNext
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
    getNextTable(next, direction, display) {
        display -= direction === IN;
        display += direction === OUT;
        return this.getTable(next, display, true);
    }
    getFadeStyle(direction) {
        switch (direction) {
            case LEFT: case RIGHT: return { animationDuration: ".3s" }
            case IN: case OUT: return { animationDuration: ".5s" }
        }
    }
    getZoomStyle(display, isNext) {
        const { calendar: { next: { year, month, date }, direction, isOutside } } = this.props;
        display += direction === OUT;
        switch (display) {
            case 2: return { transformOrigin: `${(month - 1 & 3) * 70 + 35}px ${(month - 1 >> 2) * 65 + 32.5}px` }
            case 3: {
                if (isOutside) {
                    const offset = (year + 1) % 10;
                    return { transformOrigin: `${offset * 210 + 35}px ${offset * 130 + 32.5}px`}
                }
                else {
                    const offset = year % 10 + 1;
                    return { transformOrigin: `${(offset & 3) * 70 + 35}px ${(offset >> 2) * 65 + 32.5}px` }
                }
            }
            case 4: {
                if (isOutside) {
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
    getCalendarClassName(direction, isNext) {
        return classNames({
            [styles["next-body"]]: isNext,
            [styles["slide-in-left"]]: isNext && direction === RIGHT,
            [styles["slide-in-right"]]: isNext && direction === LEFT,
            [styles["slide-out-left"]]: !isNext && direction === LEFT,
            [styles["slide-out-right"]]: !isNext && direction === RIGHT,
            [styles["zoom-in-enter"]]: isNext && direction === IN,
            [styles["zoom-in-leave"]]: !isNext && direction === IN,
            [styles["zoom-out-enter"]]: isNext && direction === OUT,
            [styles["zoom-out-leave"]]: !isNext && direction === OUT
        })
    }
    getDataClassName(element, direction, display, i, j, isNext, isNotThisMonth, isOutsideThisRange) {
        display -= isNext && direction === IN;
        display += isNext && direction === OUT;
        return classNames({
            [styles.data]: true,
            [styles["sm-data"]]: display === 1,
            [styles["lg-data"]]: display > 1,
            [styles.hidden]: this.isHidden(element, display, i, j, isNext),
            [styles.current]: this.isCurrent(element, display, i, isNext, isNotThisMonth),
            [styles.selected]: this.isSelected(element, display, i, j, isNext, isNotThisMonth, isOutsideThisRange),
            [styles.outside]: display === 1 && isNotThisMonth(i, element) || (display === 3 || display === 4) && isOutsideThisRange(i, j)
        })
    }
    renderCaption(direction, display, caption, isNext) {
        if (caption.length) {
            display -= isNext && direction === IN;
            display += isNext && direction === OUT;
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
                    />
                    <div
                        style={this.getFadeStyle(direction)}
                        className={classNames({
                            [styles.caption]: true,
                            [styles["enable-caption"]]: display ^ 4,
                            [styles["next-caption"]]: isNext,
                            [styles["fade-in"]]: isNext && direction,
                            [styles["fade-out"]]: !isNext && direction
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
                    />
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
    renderCalendar(direction, display, head, body, isNext, isNotThisMonth, isOutsideThisRange) {
        if (body.length) {
            return (
                <tbody
                    style={this.getZoomStyle(display, isNext)}
                    className={this.getCalendarClassName(direction, isNext)}
                    onAnimationEnd={this.handleAnimationEnd(display, isNext)}
                >
                    {this.renderCalendarHead(head)}
                    {body.map((row, i) =>
                        <tr key={i}>
                            {row.map((element, j) =>
                                <td
                                    key={j}
                                    className={this.getDataClassName(element, direction, display, i, j, isNext, isNotThisMonth, isOutsideThisRange)}
                                    onClick={this.handleDataClick(i, j, isOutsideThisRange)}
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
        const { calendar, current, time } = this.props;
        const { selected, next, direction, display } = calendar;
        const { caption, head, body } = this.getTable(selected, display, false);
        const { caption: nextCaption, head: nextHead, body: nextBody } = this.getNextTable(next, direction, display);
        const isNotThisMonth = this.isNotThisMonth(), isOutsideThisRange = this.isOutsideThisRange();
        const currentTime = new Date(current.year, current.month - 1, current.date).getTime();
        const [year, month, date] = [new Date(time).getFullYear(), new Date(time).getMonth() + 1, new Date(time).getDate()];
        return (
            <span>
                <input
                    ref="date"
                    type="text"
                    value={time >= currentTime ? `${year}-${month}-${date}` : ``}
                    readOnly="readOnly"
                    className={styles.date}
                    onClick={this.handleShow}
                />
                <Mask
                    isVisible={!!display}
                    onLeave={this.handleSave}
                />
                <div
                    className={classNames({
                        [styles.wrap]: display
                    })}
                >
                    <table className={styles.table}>
                        {this.renderCaption(direction, display, caption, false)}
                        {this.renderCaption(direction, display, nextCaption, true)}
                        {this.renderCalendar(direction, display, head, body, false, isNotThisMonth, isOutsideThisRange)}
                        {this.renderCalendar(direction, display, nextHead, nextBody, true, isNotThisMonth, isOutsideThisRange)}
                    </table>
                </div>
            </span>
        );
    }
}

export default Calendar;
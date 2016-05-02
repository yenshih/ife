import { handleActions } from "redux-actions";
import { SELECT_DATE, SLIDE_CALENDAR, ZOOM_CALENDAR } from "../constants/CalendarActionTypes";
import { LEFT, RIGHT, IN, OUT } from "../constants/CalendarDirectionTypes";

const now = new Date(), [year, month, date] = [now.getFullYear(), now.getMonth() + 1, now.getDate()], initialState = {
    begin: { year, month, date },
    end: { year: 2270, month: 11, date: 28 },
    current: { year, month, date },
    selected: { year, month, date },
    animation: { direction: "", year, month, date, outside: false },
    display: 0
};

const calendar = handleActions({
    SELECT_DATE(state, action) {
        const { year, month, date, display } = action.payload;
        return Object.assign({}, state, { selected: { year, month, date }, display });
    },
    SLIDE_CALENDAR(state, action) {
        const count = [, 31, !(year & 3) && ((year % 100) || !(year % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const { direction, display, outside } = action.payload;
        let { year, month, date } = action.payload;
        switch (direction) {
            case LEFT: {
                switch (display) {
                    case 1: [year, month, date] = month === 12 ? [year + 1, 1, date] : [year, month + 1, Math.min(date, count[month + 1])]; break;
                    case 2: year++; break;
                    case 3: year += 10; break;
                    case 4: year += 100; break;
                }
                break;
            }
            case RIGHT: {
                switch (display) {
                    case 1: [year, month, date] = month === 1 ? [year - 1, 12, date] : [year, month - 1, Math.min(date, count[month - 1])]; break;
                    case 2: year--; break;
                    case 3: year -= 10; break;
                    case 4: year -= 100; break;
                }
                break;
            }
        }
        return Object.assign({}, state, { animation: { direction, year, month, date, outside } });
    },
    ZOOM_CALENDAR(state, action) {
        const { direction, year, month, date, outside } = action.payload;
        switch (direction) {
            case IN: return Object.assign({}, state, { selected: { year, month, date }, animation : { direction, year, month, date, outside } });
            case OUT: return Object.assign({}, state, { animation: { direction, year, month, date, outside } });
            default: return Object.assign({}, state, { animation: { direction: "", year, month, date, outside } });
        }
    }
}, initialState);

export default calendar;
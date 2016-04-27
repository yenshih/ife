import { SELECT, SLIDE, ZOOM } from "../constants/CalendarActionTypes";
import { LEFT, RIGHT, IN, OUT } from "../constants/CalendarDirectionTypes";

const now = new Date(), [year, month, date] = [now.getFullYear(), now.getMonth() + 1, now.getDate()], initialState = {
    begin: { year: 1979, month: 10, date: 21 },
    end: { year: 2270, month: 11, date: 28 },
    current: { year, month, date },
    selected: { year, month, date },
    animation: { direction: "", year, month, date, outside: false },
    display: 0
};

const calendar = (state = initialState, action) => {
    switch(action.type) {
        case SELECT: {
            const { year, month, date, display } = action;
            return Object.assign({}, state, { selected: { year, month, date }, display });
        }
        case SLIDE: {
            const count = [, 31, !(year & 3) && ((year % 100) || !(year % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            const { direction, display, outside } = action;
            let { year, month, date } = action;
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
        }
        case ZOOM: {
            const { direction, year, month, date, outside } = action;
            switch (direction) {
                case IN: return Object.assign({}, state, { selected: { year, month, date }, animation : { direction, year, month, date, outside } });
                case OUT: return Object.assign({}, state, { animation: { direction, year, month, date, outside } });
                default: return Object.assign({}, state, { animation: { direction: "", year, month, date, outside } });
            }
        }
        default: return state;
    }
}

export default calendar;
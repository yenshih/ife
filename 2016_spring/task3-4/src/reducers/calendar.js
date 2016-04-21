import * as CalendarActionTypes from "../constants/CalendarActionTypes";

const now = new Date(), [year, month, date] = [now.getFullYear(), now.getMonth() + 1, now.getDate()], initialState = {
    currentDate: { year, month, date },
    selectedDate: { year, month, date },
    animation: { direction: "", year, month, date },
    display: 0
};

const calendar = (state = initialState, action) => {
    switch(action.type) {
        case CalendarActionTypes.SELECT: {
            const { year, month, date, display } = action;
            return Object.assign({}, state, { selectedDate: { year, month, date }, display });
        }
        case CalendarActionTypes.SLIDE: {
            let { direction, year, month, date } = action;
            switch (direction) {
                case "left": [year, month] = month === 12 ? [year + 1, 1] : [year, month + 1]; break;
                case "right": [year, month] = month === 1 ? [year - 1, 12] : [year, month - 1]; break;
            }
            return Object.assign({}, state, { animation: { direction, year, month, date } });
        }
        case CalendarActionTypes.ZOOM: {
            let { direction, year, month, date, outside } = action;
            switch (direction) {
                case "in": return Object.assign({}, state, { selectedDate: { year, month, date }, animation : { direction, year, month, date, outside } });
                case "out": return Object.assign({}, state, { animation: { direction, year, month, date, outside } });
                default: return Object.assign({}, state, { animation: { direction: "", year, month, date, outside } });
            }
        }
        default:
            return state;
    }
}

export default calendar;
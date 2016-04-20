import * as CalendarActionTypes from "../constants/CalendarActionTypes";
import * as CalendarDisplayTypes from "../constants/CalendarDisplayTypes";

const now = new Date(), [year, month, date] = [now.getFullYear(), now.getMonth() + 1, now.getDate()], initialState = {
    currentDate: { year, month, date },
    selectedDate: { year, month, date },
    animation: { direction: "" },
    display: CalendarDisplayTypes.MONTH
};

const calendar = (state = initialState, action) => {
    switch(action.type) {
        case CalendarActionTypes.SELECT_DATE: {
            const { year, month, date } = action;
            return Object.assign({}, state, { selectedDate: { year, month, date } });
        }
        case CalendarActionTypes.SLIDE: {
            const { direction } = action;
            return Object.assign({}, state, { animation: { direction } });
        }
        default:
            return state;
    }
}

export default calendar;
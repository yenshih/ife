import * as CalendarActionTypes from "../constants/CalendarActionTypes";

const CalendarActions = {
    select(year, month, date, display) {
        return { type: CalendarActionTypes.SELECT, year, month, date, display }
    },
    slide(direction, year, month, date) {
        return { type: CalendarActionTypes.SLIDE, direction, year, month, date }
    },
    zoom(direction, year, month, date, display) {
        return { type: CalendarActionTypes.ZOOM, direction, year, month, date }
    }
};

export default CalendarActions;
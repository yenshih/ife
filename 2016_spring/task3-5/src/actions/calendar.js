import { SELECT, SLIDE, ZOOM } from "../constants/CalendarActionTypes";

const CalendarActions = {
    select(year, month, date, display) {
        return { type: SELECT, year, month, date, display }
    },
    slide(direction, year, month, date, display, outside) {
        return { type: SLIDE, direction, year, month, date, display, outside }
    },
    zoom(direction, year, month, date, outside) {
        return { type: ZOOM, direction, year, month, date, outside }
    }
};

export default CalendarActions;
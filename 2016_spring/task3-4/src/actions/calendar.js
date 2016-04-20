import * as CalendarActionTypes from "../constants/CalendarActionTypes";

const CalendarActions = {
	selectDate(year, month, date) {
        return { type: CalendarActionTypes.SELECT_DATE, year, month, date }
	},
	slide(direction, year, month, date) {
		return { type: CalendarActionTypes.SLIDE, direction, year, month, date }
	}
};

export default CalendarActions;
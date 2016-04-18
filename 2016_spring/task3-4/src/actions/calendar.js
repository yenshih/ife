import * as CalendarActionTypes from "../constants/CalendarActionTypes";

const CalendarActions = {
	selectDate(year, month, date) {
        return { type: CalendarActionTypes.SELECT_DATE, year, month, date }
	}
};

export default CalendarActions;
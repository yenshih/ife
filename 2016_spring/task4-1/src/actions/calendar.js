import { createAction } from "redux-actions";
import * as Types from "../constants/CalendarActionTypes";

export const selectDate = createAction(Types.SELECT_DATE, (year, month, date, display) => ({ year, month, date, display}));
export const slideCalendar = createAction(Types.SLIDE_CALENDAR, (direction, year, month, date, display, isOutside) => ({ direction, year, month, date, display, isOutside }));
export const zoomCalendar = createAction(Types.ZOOM_CALENDAR, (direction, year, month, date, isOutside) => ({ direction, year, month, date, isOutside }));
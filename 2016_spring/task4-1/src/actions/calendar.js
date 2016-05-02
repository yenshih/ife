import { createAction } from "redux-actions";
import * as Types from "../constants/CalendarActionTypes";

export const selectDate = createAction(Types.SELECT_DATE, (year, month, date, display) => ({ year, month, date, display}));
export const slideCalendar = createAction(Types.SLIDE_CALENDAR, (direction, year, month, date, display, outside) => ({ direction, year, month, date, display, outside }));
export const zoomCalendar = createAction(Types.ZOOM_CALENDAR, (direction, year, month, date, outside) => ({ direction, year, month, date, outside }));
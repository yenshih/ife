import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import questionnaires from "./questionnaires";
import calendar from "./calendar";

const rootReducer = combineReducers({
    routing,
    questionnaires,
    calendar
});

export default rootReducer;
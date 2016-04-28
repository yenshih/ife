import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import questionnaires from "./questionnaires";

const rootReducer = combineReducers({
    routing,
    questionnaires
});

export default rootReducer;
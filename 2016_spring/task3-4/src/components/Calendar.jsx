import React, { Component, PropTypes } from "react";
import MonthlyCalendar from "./";
import YearlyCalendar from "./";
import DecennaryCalendar from "./";
import CenturyCalendar from "./";
import * as CalendarDisplayTypes from "../constants/CalendarDisplayTypes";

class Calendar extends Component {
    static propTypes = {
        
    };
    constructor(props) {
        super(props);

    }
    render() {
        const { year, month } = this.props.calendar;
        switch (display) {
            case CalendarDisplayTypes.MONTH: return (
                <MonthlyCalendar />
            );
            case CalendarDisplayTypes.YEAR: return (
                <YearlyCalendar />
            );
            case CalendarDisplayTypes.DECADE: return (
                <DecennaryCalendar />
            );
            case CalendarDisplayTypes.CENTURY: return (
                <CenturyCalendar />
            )
        }
    }
}
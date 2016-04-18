import React, { Component, PropTypes } from "react";
import * as CalendarDisplayTypes from "../constants/CalendarDisplayTypes";

class Calendar extends Component {
    static propTypes = {
        
    };
    constructor(props) {
        super(props);
    }
    getCalendarData() {
        const data = {};
        data.head = ["日", "一", "二", "三", "四", "五", "六"];
        return data;
    }
    render() {
        const { year, month } = this.props.calendar;
        const data = this.getCalendarData();
        return (
            <table>
                <thead>
                    <tr>
                        {data.head.map((element, index) => <th key="index">{element}</th>)}
                    </tr>
                </thead>
            </table>
        );
    }
}

export default Calendar;
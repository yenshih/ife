import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Calendar from "../component/Calendar";
import CalendarActions from "../actions/calendar";
import "../reset.css";

const mapStateToProps = state => ({
    calendar: state.calendar
});

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(CalendarActions, dispatch);
});

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
    static propTypes = {
        calendar: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };
    render() {
        const { calendar, actions } = this.props;
        return (
            <Calendar
                 />)
    }
}

export default App;
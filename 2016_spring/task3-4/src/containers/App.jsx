import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Calendar from "../components/Calendar";
import CalendarActions from "../actions/calendar";
import styles from "./App.css";
import "../reset.css";

const mapStateToProps = state => ({
    calendar: state.calendar
});

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(CalendarActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
    static propTypes = {
        calendar: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
    }
    render() {
        const { calendar, actions } = this.props;
        return (
            <div className={styles.wrap}>
                <Calendar
                    calendar={calendar}
                    actions={actions}
                />
            </div>
        );
    }
}

export default App;
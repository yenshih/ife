import React, { Component, PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import styles from "./Mask.scss";

class Mask extends Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        onLeave: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.handleLeave = this.handleLeave.bind(this);
    }
    handleLeave(event) {
        this.props.onLeave(event);
    }
    renderMask() {
        if (this.props.isVisible) {
            return (
                <div
                    className={styles.mask}
                    onClick={this.handleLeave}
                />
            );
        }
    }
    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName={styles}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {this.renderMask()}
            </ReactCSSTransitionGroup>
        )
    }
}

export default Mask;
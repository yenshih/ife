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
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.onLeave();
    }
    renderMask() {
        if (this.props.isVisible) {
            return (
                <div
                    className={styles.mask}
                    onClick={this.handleClick}
                />
            );
        }
    }
    render() {
        return (
            <ReactCSSTransitionGroup
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                transitionName={styles}
            >
                {this.renderMask()}
            </ReactCSSTransitionGroup>
        )
    }
}

export default Mask;
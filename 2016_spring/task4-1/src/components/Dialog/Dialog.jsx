import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import { Mask } from "../";
import styles from "./Dialog.scss";

class Dialog extends Component {
    static propTypes = {
        dialog: PropTypes.shape({
            status: PropTypes.oneOf([0, 1, 2, 3]).isRequired
        }).isRequired,
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        onLeave: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);
        this.handleLeave = this.handleLeave.bind(this);
    }
    handleLeave(event) {
        this.props.onLeave(event);
    }
    getDialogStyles(status) {
        const { top, left } = this.props;
        const dialogStyle = (status && status ^ 2) ? {
            top,
            left,
            transform: `translate(${(window.innerWidth - 16 >> 1) - left}px, ${(window.innerHeight >> 1) - top}px) translate(-50%, -50%)`,
        } : {
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%)`
        }
        return dialogStyle;
    }
    renderDialog(status) {
        if (status) {
            const { title, children } = this.props;
            return (
                <div
                    style={this.getDialogStyles(status)}
                    className={classNames({
                        [styles.enter]: status === 1,
                        [styles.dialog]: status,
                        [styles.leave]: status === 3
                    })}
                >
                    <div className={styles.header}>
                        <span className={styles.title}>{title}</span>
                        <span
                            className={styles.close}
                            onClick={this.handleLeave} 
                        />
                    </div>
                    {children}
                </div>
            );
        }
    }
    render() {
        const { dialog: { status }, onLeave } = this.props;
        return (
            <div>
                <Mask
                    isVisible={!!status}
                    onLeave={onLeave}
                />
                {this.renderDialog(status)}
            </div>
        );
    }
}

export default Dialog;
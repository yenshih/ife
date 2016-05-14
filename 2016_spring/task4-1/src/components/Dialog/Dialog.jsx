import React, { Component, PropTypes, isValidElement } from "react";
import classNames from "classnames";
import { Mask } from "../";
import styles from "./Dialog.scss";

class Dialog extends Component {
    static propTypes = {
        dialog: PropTypes.shape({
            status: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
            id: PropTypes.string.isRequired
        }).isRequired,
        self: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onLeave: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        children: PropTypes.element.isRequired
    };
    constructor(props) {
        super(props);
        this.handleLeave = this.handleLeave.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const { dialog, self, id } = nextProps;
        if (dialog.id === id) {
            const { top, right, bottom, left } = self.refs[id].getBoundingClientRect();
            [this.top, this.left] = [top + bottom >> 1, left + right >> 1];
        }
    }
    handleLeave(event) {
        this.props.onLeave(event);
    }
    getDialogStyles(status) {
        const { top, left } = this;
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
    renderDialog(status, id) {
        if (status && id === this.props.id) {
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
                    {isValidElement(children) && children}
                </div>
            );
        }
    }
    render() {
        const { dialog: { status, id }, onLeave } = this.props;
        return (
            <div>
                <Mask
                    isVisible={!!(status && id === this.props.id)}
                    onLeave={onLeave}
                />
                {this.renderDialog(status, id)}
            </div>
        );
    }
}

export default Dialog;
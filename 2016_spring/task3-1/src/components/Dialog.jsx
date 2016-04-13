import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import styles from "./Dialog.css";

class Dialog extends Component {
    static propTypes = {
        enter: PropTypes.bool.isRequired,
        visible: PropTypes.bool.isRequired,
        leave: PropTypes.bool.isRequired,
        hideDialog: PropTypes.func.isRequired,
        initDialog: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        hint: PropTypes.string.isRequired,
        confirm: PropTypes.string.isRequired,
        cancel: PropTypes.string.isRequired
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        const { hideDialog, initDialog } = this.props;
        hideDialog();
        setTimeout(() => initDialog(), 490);
        document.body.style["overflow-y"] = "scroll";
    }
    render() {
        const { enter, visible, leave, title, hint, confirm, cancel } = this.props;
        return (
            <div className={styles["wrap"]}>
                <div className={classNames({
                    [styles.mask]: true,
                    [styles.appear]: enter,
                    [styles.disappear]: leave
                })} onClick={this.handleClick}>
                </div>
                <div className={classNames({
                    [styles.dialog]: true,
                    [styles.enter]: enter,
                    [styles.leave]: leave
                })}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.hint}>{hint}</p>
                    <input
                        type="button"
                        value={confirm}
                        className={classNames(styles.btn, styles.confirm)}
                        onClick={this.handleClick}
                    />
                    <input
                        type="button"
                        value={cancel}
                        className={classNames(styles.btn, styles.cancel)}
                        onClick={this.handleClick}
                    />
                </div>
            </div>
        );
    }
}

export default Dialog;
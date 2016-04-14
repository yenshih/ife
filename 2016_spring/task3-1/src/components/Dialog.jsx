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
        cancel: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        srcTop: PropTypes.number.isRequired,
        srcLeft: PropTypes.number.isRequired
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    }
    handleClick() {
        this.props.hideDialog();
        document.body.style["overflow-y"] = "scroll";
    }
    handleAnimationEnd(event) {
        if (event.animationName.includes("zoom-out")) {
            this.props.initDialog();
        }
    }
    render() {
        const {
            enter, visible, leave,
            title, hint, confirm, cancel,
            width, height, srcTop, srcLeft
        } = this.props;
        const [top, left] = [window.innerHeight / 2 - srcTop, window.innerWidth / 2 - srcLeft];
        return (
            <div className={styles["wrap"]}>
                <div
                    className={classNames({
                        [styles.mask]: true,
                        [styles.appear]: enter,
                        [styles.disappear]: leave
                    })}
                    onClick={this.handleClick}
                >
                </div>
                <div
                    style={{
                        width: width,
                        height: height,
                        top: srcTop,
                        left: srcLeft,
                        transform: `translate(${left}px, ${top}px) translate(-50%, -50%)`
                    }}
                    className={classNames({
                        [styles.dialog]: true,
                        [styles.enter]: enter,
                        [styles.leave]: leave
                    })}
                    onAnimationEnd={this.handleAnimationEnd}
                >
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
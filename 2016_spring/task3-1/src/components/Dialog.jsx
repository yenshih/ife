import React, { Component, PropTypes } from "react";
import { DragLayer, DragSource, DropTarget } from "react-dnd";
import classNames from "classnames";
import * as DragItemTypes from "../constants/DragItemTypes";
import styles from "./Dialog.css";

const layerCollect = monitor => ({
    currentOffset: monitor.getSourceClientOffset()
});

const dialogSource = {
    beginDrag() {
        return {};
    }
};

const dragCollect = (connect, monitor) => ({
    connectDragSource: connect.dragSource()
});

const dialogTarget = {
    drop(props) {
        const { x, y } = props.currentOffset;
        props.dragDialog(x, y);
    }
};

const dropCollect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
});

@DragLayer(layerCollect)
@DragSource(DragItemTypes.DIALOG, dialogSource, dragCollect)
@DropTarget(DragItemTypes.DIALOG, dialogTarget, dropCollect)
class Dialog extends Component {
    static propTypes = {
        enter: PropTypes.bool.isRequired,
        visible: PropTypes.bool.isRequired,
        leave: PropTypes.bool.isRequired,
        drag: PropTypes.bool.isRequired,
        offsetX: PropTypes.number.isRequired,
        offsetY: PropTypes.number.isRequired,
        displayDialog: PropTypes.func.isRequired,
        dragDialog: PropTypes.func.isRequired,
        hideDialog: PropTypes.func.isRequired,
        initDialog: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        hint: PropTypes.string.isRequired,
        confirm: PropTypes.string.isRequired,
        cancel: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        animationX: PropTypes.number.isRequired,
        animationY: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        currentOffset: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        }).isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    }
    handleClick() {
        const { visible, hideDialog, initDialog, duration } = this.props;
        hideDialog();
        document.body.style["overflow-y"] = "scroll";
        setTimeout(() => {
            if (visible) {
                initDialog();
            }
        }, duration * 1000 + 16);
    }
    handleAnimationEnd(event) {
        if (event.animationName.includes("zoom-in")) {
            this.props.displayDialog();
        }
        if (event.animationName.includes("zoom-out")) {
            this.props.initDialog();
        }
    }
    getDialogStyle() {
        const { enter, drag, leave, offsetX, offsetY, width, height, animationX, animationY, duration } = this.props;
        let dialogStyle;
        if (drag) {
            dialogStyle = {
                width: width,
                height: height,
                top: animationY,
                left: animationX,
                transform: `translate(${offsetX - animationX}px, ${offsetY - animationY}px)`,
                animationDuration: `${duration}s`
            }
        }
        else if (enter || leave) {
            dialogStyle = {
                width: width,
                height: height,
                top: animationY,
                left: animationX,
                transform: `translate(${(window.innerWidth >> 1) - animationX}px, ${(window.innerHeight >> 1) - animationY}px) translate(-50%, -50%)`,
                animationDuration: `${duration}s`
            }
        }
        else {
            dialogStyle = {
                width: width,
                height: height,
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%)`
            }
        }
        return dialogStyle;
    }
    renderDialog() {
        const { enter, visible, leave, title, hint, confirm, cancel, connectDragSource } = this.props;
        return connectDragSource(
            <div
                style={this.getDialogStyle()}
                className={classNames({
                    [styles.dialog]: visible,
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
        );
    }
    render() {
        const { enter, visible, leave, duration, connectDropTarget } = this.props;
        return connectDropTarget(
            <div className={styles.wrap}>
                <div
                    style={ enter || leave ? { animationDuration: `${duration}s` } : {} }
                    className={classNames({
                        [styles.appear]: enter,
                        [styles.mask]: visible,
                        [styles.disappear]: leave
                    })}
                    onClick={this.handleClick}
                >
                </div>
                {this.renderDialog()}
            </div>
        );
    }
}

export default Dialog;
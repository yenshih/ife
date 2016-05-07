import React, { Component, PropTypes } from "react";
import classNames from "classnames";

class SortableTh extends Component {
    static propTypes = {

    };
    constructor(props) {
        super(props);
        handleSort = this.handleSort.bind(this);
    }
    handleSort() {

    }
    render() {
        const { name } = this.props;
        return (
            <div
                className={classnaes({
                    [styles["sortable-th"]]: true
                })}
                onClick={this.handleSort}
            >
                <span>{name}</span>
            </div>
        );
    }
}
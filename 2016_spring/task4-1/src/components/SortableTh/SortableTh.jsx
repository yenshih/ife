import React, { Component, PropTypes } from "react";
import styles from "./SortableTh.scss";

class SortableTh extends Component {
    static propTypes = {
        onSort: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
    }
    componentDidMount() {
        const { dataKey, onSort } = this.props;
        this.onSort = onSort(dataKey);
    }
    handleSort() {
        this.onSort();
    }
    render() {
        const { name } = this.props;
        return (
            <div
                className={styles.content}
                onClick={this.handleSort}
            >
                <span>{name}</span>
            </div>
        );
    }
}

export default SortableTh;
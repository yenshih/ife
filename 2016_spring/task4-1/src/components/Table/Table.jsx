import React, { Component, PropTypes, isValidElement, cloneElement } from "react";
import { isFunction, mapChildrenToArray } from "../../scripts/util";
import styles from "./Table.scss";

const renderThs = columns => columns.map((col, colIndex) => {
    const { name, dataKey, width, align, th } = col.props;
    const props = { name, dataKey, colIndex };
    let content;
    switch (true) {
        case isValidElement(th): content = cloneElement(th, props); break;
        case isFunction(th): content = th(props); break;
        default: content = name || "";
    }
    return (
        <th
            key={`th-${colIndex}`}
            style={{ width, textAlign: align }}
            className={styles["table-th"]}
        >
            {content}
        </th>
    );
});

const renderTds = (columns, data, row, rowIndex) => columns.map((col, colIndex) => {
    const { dataKey, width, align, td } = col.props;
    const props = { data, row, dataKey, rowIndex, colIndex };
    let content;
    switch (true) {
        case isValidElement(td): content = cloneElement(td, props); break;
        case isFunction(td): content = td(props); break;
        default: content = row[dataKey];
    }
    return (
        <td
            key={`td-${rowIndex}-${colIndex}`}
            style={{ width, textAlign: align }}
            className={styles["table-td"]}
        >
            {content}
        </td>
    );
});

const renderTrs = (columns, data) => data.map((row, rowIndex) =>
    <tr
        key={`tr-${rowIndex}`}
        className={styles["table-tbody-tr"]}
    >
        {renderTds(columns, data, row, rowIndex)}
    </tr>
);

class Table extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
        className: PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);
    }
    render() {
        const { data, className, children } = this.props;
        const columns = mapChildrenToArray(children);
        return (
            <table className={className}>
                <thead>
                    <tr>
                        {renderThs(columns)}
                    </tr>
                </thead>
                <tbody>
                    {renderTrs(columns, data)}
                </tbody>
            </table>
        );
    }
}

export default Table;
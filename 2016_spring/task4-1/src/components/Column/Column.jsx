import React, { PropTypes } from "react";

function Column() {
    return null;
}

Column.propTypes = {
    name: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    align: PropTypes.oneOf(["left", "center", "right"]).isRequired,
    th: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    td: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default Column;
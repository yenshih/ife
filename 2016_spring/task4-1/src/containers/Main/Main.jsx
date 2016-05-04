import React, { PropTypes } from "react";
import styles from "./Main.scss";

function Main({ children }) {
    return (
        <div className={styles.wrap}>
            {children}
        </div>
    );
}

Main.propTypes = {
    children: PropTypes.element.isRequired
};

export default Main;
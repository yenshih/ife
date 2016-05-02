import React from "react";
import styles from "./Main.scss";

function Main({ children }) {
    return (
        <div className={styles.wrap}>
            {children}
        </div>
    );
}

export default Main;
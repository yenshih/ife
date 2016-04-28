import React from "react";
import Header from "../../components/Header/Header";
import styles from "./App.scss";
import "../../styles/reset.css";

function App({ children }) {
    return (
        <div className={styles.container}>
            <Header />
            {children}
        </div>
    );
}

export default App;
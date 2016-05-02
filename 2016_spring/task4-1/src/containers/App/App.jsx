import React from "react";
import { Header, Main } from "../";
import styles from "./App.scss";
import "../../styles/reset.css";

function App({ children }) {
    return (
        <div className={styles.container}>
            <Header />
            <Main>
                {children}
            </Main>
        </div>
    );
}

export default App;
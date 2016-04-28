import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import styles from "./Header.scss";

class Header extends Component {
    render() {
        return (
            <div className={styles.header}>
                <h1 className={styles.title}>问卷管理</h1>
                <Link to="/" className={styles.link}>
                    <h2 className={styles.tabs}>我的问卷</h2>
                </Link>
            </div>
        );
    }
}
 export default Header;
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "../components/Dialog";
import DialogActions from "../actions/dialog";
import styles from "./App.css"
import "../reset.css";

class App extends Component {
    static propTypes = {
        dialog: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.actions.alertDialog();
    }
    renderDialog(dialog, actions) {
        if (dialog.visible) {
            return (
                <Dialog
                    {...dialog}
                    hideDialog={actions.hideDialog}
                    initDialog={actions.initDialog}
                    title="Dialog"
                    hint="this is a dialog"
                    confirm="confirm"
                    cancel="cancel"
                />
            );
        }
    }
    render() {
        const { dialog, actions } = this.props;
        return (
            <div>
                <input type="button" value="click" className={styles.btn} onClick={this.handleClick} />
                <p className={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis exercitationem, voluptas harum odio quidem vel obcaecati nobis esse consequatur facere, magnam officia totam iure! Aliquid neque, delectus, reprehenderit voluptates sunt pariatur atque tenetur dignissimos aspernatur ex doloribus perferendis in porro rem dicta accusantium, ratione autem facere, placeat vitae ipsum suscipit voluptate quo. Odio ad vitae commodi itaque voluptatem tempore, mollitia beatae accusamus saepe, magni in laudantium impedit repudiandae deleniti eaque error dolores fugiat facere et ea fugit iste sit enim ex! Soluta totam porro, architecto sed ullam ducimus ex rerum, autem eos consequuntur doloremque sunt itaque sint accusamus nam voluptatibus!</p>
                {this.renderDialog(dialog, actions)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dialog: state.dialog
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(DialogActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
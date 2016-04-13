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
        document.body.style["overflow-y"] = "hidden";
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
                <p className={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptate, molestias tempora veniam. Praesentium perferendis labore inventore necessitatibus ullam non quasi! Obcaecati blanditiis, nisi sunt iste. Officiis deserunt necessitatibus placeat animi optio fugit quam nostrum, maxime est magnam facere facilis dolores tempora doloribus repellendus, doloremque ea accusamus odio modi, aliquid voluptatibus sed sint esse aspernatur. Ad vel magnam quasi eos assumenda blanditiis optio, aspernatur dolorem mollitia tempora aliquam. Commodi necessitatibus, provident! Voluptatem delectus, libero blanditiis vero accusantium assumenda quo enim error nulla omnis qui quasi quis. Sit soluta autem qui, veniam, aliquid mollitia dolor praesentium recusandae ipsam, voluptatem harum nihil rerum libero vitae, nulla aliquam facilis ut dolorem itaque sed deleniti quod! Accusantium quasi corporis assumenda fugiat rerum, quia explicabo deleniti sunt labore? Ut consectetur inventore velit eos amet minima sapiente. Qui, beatae ratione magni dolorum excepturi et ut non eveniet, eius nam similique dolor temporibus tempore id commodi consequatur incidunt praesentium dignissimos? Perspiciatis aspernatur vitae ipsum alias delectus fugit repudiandae nulla, quisquam laborum hic, obcaecati consequatur dolorum corrupti commodi nisi eius quam quaerat veritatis laboriosam consequuntur cupiditate dolores! Officiis at perferendis aspernatur distinctio ut sapiente, consequatur quasi enim recusandae ea voluptates magnam eligendi impedit necessitatibus, tenetur rem quo quos laboriosam voluptas, tempore possimus sed tempora. Quaerat officia totam doloremque dicta quia fugit maiores ea. Facilis, nihil nulla minus repudiandae fuga sunt? Perferendis commodi, necessitatibus dolorum adipisci ipsa iste explicabo veritatis odio, omnis aliquam id similique quod velit saepe consequuntur illo, facere at dignissimos consequatur temporibus fugiat inventore. Necessitatibus nam odio, est provident laborum non nesciunt veniam eius beatae quibusdam repellat, impedit doloremque, unde veritatis amet tenetur perspiciatis quas! Nesciunt odio esse et quia unde tempore, corporis minus, eaque iste explicabo libero est dolores, nulla nihil quo temporibus praesentium exercitationem placeat. Similique atque quia quis molestiae blanditiis cum tempore eius aliquid, suscipit, vitae rerum ducimus. Eos illum, temporibus. Dignissimos ipsa beatae impedit quod doloribus hic aspernatur expedita esse fuga iure eaque ipsum eius quas, necessitatibus dolor. Vitae rem perferendis aliquid optio. Fugit sunt eligendi, similique, dolor aperiam, quae laudantium tempora labore earum, esse ipsam omnis praesentium odit. Eaque eligendi minus impedit sint sit fugit, iste voluptate molestias qui repudiandae animi nostrum consectetur. Deleniti commodi saepe, dolorum officia voluptatem quas magni. Tempora provident id assumenda, eveniet quibusdam porro reprehenderit illo excepturi ut eius ullam commodi, velit numquam. Quaerat voluptate debitis, labore ullam ut at praesentium minima vel, sunt, est nesciunt, molestiae!</p>
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
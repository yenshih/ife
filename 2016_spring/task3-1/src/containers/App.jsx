import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "../components/Dialog";
import DialogActions from "../actions/dialog";
import styles from "./App.css";
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
        const { enter, actions: { alertDialog, displayDialog } } = this.props;
        alertDialog();
        document.body.style["overflow-y"] = "hidden";
        setTimeout(() => {
            if (enter) {
                displayDialog();
            }
        }, 500);
    }
    renderDialog(dialog, actions) {
        if (dialog.visible) {
            const { displayDialog, hideDialog, initDialog } = actions;
            const { top, left } = this.refs.btn.getBoundingClientRect();
            return (
                <Dialog
                    {...dialog}
                    displayDialog={displayDialog}
                    hideDialog={hideDialog}
                    initDialog={initDialog}
                    title="Dialog"
                    hint="this is a dialog"
                    confirm="confirm"
                    cancel="cancel"
                    width={600}
                    height={300}
                    srcTop={top}
                    srcLeft={left}
                />
            );
        }
    }
    render() {
        const { dialog, actions } = this.props;
        return (
            <div>
                <input ref="btn" type="button" value="click" className={styles.btn} onClick={this.handleClick} />
                <p className={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt maxime alias, labore, hic quidem error, voluptate dicta doloribus magnam, explicabo consequuntur in commodi aperiam. Incidunt placeat, pariatur dolorum totam consequatur quo ab itaque atque veritatis quis voluptatem sapiente impedit maxime tempore nihil quidem nam facere laboriosam omnis. Voluptate aut eveniet minus culpa, quos magnam molestias, unde provident nemo doloremque mollitia incidunt cumque cum vero ut consectetur a et natus fuga nostrum sed officiis dignissimos dolores? In totam quo, corporis rerum, quidem necessitatibus, tenetur quibusdam repellat voluptas quos molestias voluptate illo illum accusamus culpa! Veniam aut repellendus magnam, ex obcaecati praesentium voluptas, autem adipisci, quo esse itaque? Deserunt, repellendus neque, distinctio in eos fuga animi tempora quia ducimus, nisi error dicta, rem aspernatur. Eligendi possimus, aliquam, labore et omnis minima voluptatibus optio animi fugiat, suscipit inventore facilis accusantium voluptatum quasi. Aliquam sunt fugit vero rerum maiores laudantium consequatur dolorem laboriosam tempora velit reiciendis dolor doloremque quos impedit, quaerat nobis tenetur possimus numquam molestias rem! Sapiente soluta itaque quaerat unde eaque facere rerum dolor ullam voluptatum dignissimos molestias quas sit ducimus mollitia asperiores quisquam, quos accusantium nam, iste cum id perferendis magni minima tempore. Labore vitae laudantium, eius blanditiis quaerat consequuntur provident totam! Quisquam suscipit odio sapiente est, voluptate assumenda totam porro doloribus eaque sunt. Sit voluptatem saepe praesentium quia dolorum eius deleniti, aperiam quibusdam in nostrum veritatis nesciunt, quod nemo quisquam! Saepe eius numquam qui provident error ullam nam corrupti ab, quibusdam. Consequatur velit dolorum maiores, nobis! Ad iure voluptates atque incidunt unde, ipsam error dolor, nostrum eius dolores libero, molestiae. Eos error tenetur veniam obcaecati eius temporibus ea alias quas vero enim. Dicta dignissimos voluptatibus nemo odio, ratione laborum nobis consequuntur non eum, inventore possimus recusandae sunt reiciendis! Optio debitis, cum! Earum accusantium, maiores iure. Ut ullam et dolores alias voluptatem dolorum est delectus aliquam excepturi sequi quos placeat, dicta suscipit eos tempora voluptatibus odio blanditiis distinctio tempore consequatur illum. Non quos sed incidunt doloremque molestias eum dolorem, accusantium. Illo ut modi distinctio obcaecati maiores, quas laboriosam minima laudantium quos quod dolore tempore doloribus nulla repellendus iste, quo aliquam esse ipsa! Odit laudantium sint hic in corporis, delectus assumenda pariatur dolorem minima at, nihil aspernatur optio repellendus saepe velit necessitatibus earum tempore labore adipisci veritatis? Quod, dolorum! Minus molestias, repellendus iure repudiandae provident at vel, vero, ipsa odio, tempora illo sint! Adipisci eos ex numquam, suscipit magnam, quaerat ipsa ratione aspernatur earum sint asperiores quis praesentium omnis atque natus. Accusamus beatae obcaecati aliquid aut, iure eveniet fugit! Est incidunt culpa sunt eveniet eius unde odit, eaque odio, qui soluta minima illum omnis consequatur. Necessitatibus voluptates deleniti autem provident libero sequi voluptatem maxime iste animi! Dolore eum veniam sunt. At quaerat unde voluptas cum optio! Repellat libero ut ullam corporis voluptates nihil, reiciendis quo quas itaque explicabo maxime recusandae ducimus animi nam assumenda non quaerat saepe adipisci laborum vitae reprehenderit, voluptatem aliquid quidem. Earum modi magnam architecto cum perspiciatis, perferendis ut facere totam eaque sunt in deleniti corporis provident reprehenderit quae alias, minus, accusamus aliquid enim unde! Enim inventore dolores cumque quia, qui nihil earum. Provident suscipit natus unde ad reiciendis pariatur omnis temporibus, vero saepe. Dolores, quam accusamus asperiores illo accusantium quis, necessitatibus assumenda cupiditate. Sapiente quibusdam porro nihil ab commodi vel rem similique esse aperiam, consectetur aspernatur doloremque omnis soluta dolorem deserunt quidem nostrum atque obcaecati fugit! Recusandae iusto cumque eum natus temporibus amet ipsam dolorem laborum neque earum consequuntur facilis minus, voluptate aliquam. Expedita, corporis facilis magnam dicta sequi, excepturi, enim eum beatae ad saepe quaerat voluptatem dolorum modi distinctio sapiente ut necessitatibus, cum. Molestiae minus, provident. Hic!</p>
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
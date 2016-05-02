import React, { Component, PropTypes } from "react";

class Input extends Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        onEdit: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.handleEditText = this.handleEditText.bind(this);
        this.handleSaveText = this.handleSaveText.bind(this);
    }
    componentDidMount() {
        const { input } = this.refs;
        input.focus();
        input.select();
    }
    handleEditText(event) {
        this.props.onEdit(event);
    }
    handleSaveText(event) {
        if (event.type === "keydown" && event.which === 13 || event.type === "blur") {
            this.props.onSave(event);
        }
    }
    render() {
        const { content, className } = this.props;
        return (
            <input
                ref="input"
                type="text"
                value={content}
                className={className}
                onChange={this.handleEditText}
                onKeyDown={this.handleSaveText}
                onBlur={this.handleSaveText}
            />
        );
    }
}

export default Input;
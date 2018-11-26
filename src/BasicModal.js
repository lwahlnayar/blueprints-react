import React from "react";
import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
} from "mdbreact";

export default class BasicModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: this.props.id, index: this.props.index };
        this.handleChange = this.handleChange.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    handleChange(e) {
        this.setState({ key: e.target.value });
    }

    render() {
        const { name, editAttributes } = this.props;
        return (
            <Container>
                <button onClick={this.toggle}>Edit</button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Change Attribute - {name}
                    </ModalHeader>
                    <ModalBody>
                        <input
                            name="dev-attribute"
                            onChange={this.handleChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>
                            Close
                        </Button>{" "}
                        <Button
                            color="primary"
                            onClick={() => {
                                editAttributes(this.state);
                                this.toggle();
                            }}
                        >
                            Save changes
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

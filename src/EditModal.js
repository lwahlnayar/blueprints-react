import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "mdbreact";

import Input from "./Input";

export default class EditModal extends React.Component {
    constructor(props) {
        super(props);
        //form input data gets populated in THIS state and sent to parent state
        this.state = { ...this.props.blueprintData };
        this.handleChange = this.handleChange.bind(this);
        this.createFields = this.createFields.bind(this);
    }

    reset() {
        this.setState({ ...this.prevState });
    }

    toggle() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleChange(e) {
        if (e.target.dataset.cap === "command") {
            let commands = [...this.state.commands];
            commands[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({ commands });
        } else if (e.target.dataset.cap === "attribute") {
            let att = [...this.state.attributes];
            att[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({ attributes: att });
        } else if (e.target.dataset.cap === "sensor") {
            let sensors = [...this.state.sensors];
            sensors[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({ sensors });
        }
    }

    createFields(cap) {
        let basic = { name: "", value: "" };
        let sensor = { name: "", value: "", data_type: "", comment: "" };
        return cap === "commands" || cap === "attributes"
            ? this.setState({
                  [cap]: [...this.state[cap], basic]
              })
            : this.setState({
                  [cap]: [...this.state[cap], sensor]
              });
    }

    render() {
        let { commands, attributes, sensors, name, comment } = this.state;
        let { editBlueprint } = this.props;

        return (
            <div className="createModal-component">
                <Button
                    color="green"
                    onClick={() => {
                        this.prevState = this.state;
                        this.toggle();
                    }}
                >
                    Edit
                </Button>
                <Modal
                    isOpen={this.state.showModal}
                    toggle={() => {
                        this.toggle();
                        this.reset();
                    }}
                    size="fluid"
                >
                    <ModalHeader
                        toggle={() => {
                            this.toggle();
                            this.reset();
                        }}
                    >
                        Edit Blueprint
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <b>
                                <label htmlFor="blueprint-name">Name</label>
                            </b>
                            <input
                                value={name}
                                name="blueprint-name"
                                onChange={e => {
                                    this.setState({ name: e.target.value });
                                }}
                            />
                        </div>
                        <div>
                            <b>
                                <label htmlFor="comment">Comment</label>
                            </b>
                            <input
                                value={comment}
                                name="comment"
                                onChange={e => {
                                    this.setState({ comment: e.target.value });
                                }}
                            />
                        </div>
                        <div>
                            <b>
                                <p>Commands</p>
                            </b>
                            <Button
                                color="green"
                                onClick={() => this.createFields("commands")}
                            >
                                Add Command
                            </Button>
                            <Input
                                type={"command"}
                                handleChange={this.handleChange}
                                capability={commands}
                            />
                        </div>
                        <div>
                            <b>
                                <p>Sensors</p>
                            </b>
                            <Button
                                color="green"
                                onClick={() => this.createFields("sensors")}
                            >
                                Add Sensors
                            </Button>
                            <Input
                                type={"sensor"}
                                handleChange={this.handleChange}
                                capability={sensors}
                            />
                        </div>
                        <div>
                            <b>
                                <p>Attributes</p>
                            </b>
                            <Button
                                color="green"
                                onClick={() => this.createFields("attributes")}
                            >
                                Add Attributes
                            </Button>
                            <Input
                                type={"attribute"}
                                handleChange={this.handleChange}
                                capability={attributes}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="secondary"
                            onClick={() => {
                                this.toggle();
                                this.reset();
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => {
                                this.toggle();
                                editBlueprint(this.state);
                            }}
                        >
                            Edit Blueprint
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

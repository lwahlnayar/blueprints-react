import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "mdbreact";

import Input from "./Input";

export default class CreateModal extends React.Component {
    constructor(props) {
        super(props);
        //form input data gets populated in THIS state and sent to parent state
        this.state = {
            showModal: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.createFields = this.createFields.bind(this);
    }

    toggle() {
        this.setState({
            showModal: !this.state.showModal,
            name: "",
            comment: "",
            commands: [],
            attributes: [],
            sensors: []
        });
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
        let { commands, attributes, sensors } = this.state;
        let { createBlueprint } = this.props;

        return (
            <div className="createModal-component">
                <Button color="primary" onClick={() => this.toggle()}>
                    Create
                </Button>
                <Modal
                    isOpen={this.state.showModal}
                    toggle={() => this.toggle()}
                    size="fluid"
                >
                    <ModalHeader toggle={() => this.toggle()}>
                        Blueprint
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <b>
                                <label htmlFor="blueprint-name">Name</label>
                            </b>
                            <input
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
                                capability={commands}
                                type={"command"}
                                handleChange={this.handleChange}
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
                                capability={sensors}
                                type={"sensor"}
                                handleChange={this.handleChange}
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
                                capability={attributes}
                                type={"attribute"}
                                handleChange={this.handleChange}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.toggle()}>
                            Close
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => {
                                this.toggle();
                                createBlueprint(this.state);
                            }}
                        >
                            Create Blueprint
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "mdbreact";

import Device from "./Device";

export default class DevicesOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.blueprintData,
            devices: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addDevice = this.addDevice.bind(this);
        this.editAttributes = this.editAttributes.bind(this);
        this.deleteDevice = this.deleteDevice.bind(this);
    }

    //componentDidMount ajax call to server to retrieve devices based on a unique blueprint ID

    toggle() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    handleChange(e) {
        this.setState({ input: e.target.value });
    }

    addDevice() {
        let length = this.state.devices.length;
        let device_att = this.state.attributes.map(i => {
            return { ...i, key: "" };
        });
        let input = {
            identifier: this.state.input,
            owner: "john@doe.com",
            activity: "No activities yet",
            registered: false,
            device_att,
            id: length === 0 ? 0 : this.state.devices[length - 1].id + 1
        };
        this.setState({ input: "", devices: [...this.state.devices, input] });
        //Here goes an Ajax call to INSERT device into DB
    }

    editAttributes(childState) {
        let devices = this.state.devices;
        const { id, index } = childState;
        for (let i = 0; i < devices.length; i++) {
            if (devices[i].id === id) {
                devices[i].device_att[index].key = childState.key;
            }
        }
        this.setState({ devices });
        //Here goes an ajax call to server to UPDATE device data.
    }

    deleteDevice(childId) {
        const devices = this.state.devices.filter(obj => {
            return obj.id !== childId ? obj : null;
        });
        this.setState({ devices });
        // Here goes an ajax call to DELETE device from DB
    }

    render() {
        let { name } = this.state;

        return (
            <div className="createModal-component">
                <Button color="blue" onClick={() => this.toggle()}>
                    Devices
                </Button>
                <Modal
                    isOpen={this.state.showModal}
                    toggle={() => this.toggle()}
                    size="fluid"
                >
                    <ModalHeader toggle={() => this.toggle()}>
                        Details for Blueprint:<span id="bp-font"> {name}</span>
                    </ModalHeader>
                    <ModalBody>
                        <h5>Register device</h5>
                        <input name="register" onChange={this.handleChange} />
                        <Button color="green" onClick={this.addDevice}>
                            Register
                        </Button>
                        <Device
                            devices={this.state.devices}
                            deleteDevice={this.deleteDevice}
                            editAttributes={this.editAttributes}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.toggle()}>
                            Back to Blueprint
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

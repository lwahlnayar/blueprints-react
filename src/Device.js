import React from "react";
import { Button, Card, CardBody, CardTitle, Col } from "mdbreact";

import BasicModal from "./BasicModal";

export default class Device extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { devices, editAttributes, deleteDevice } = this.props;

        let deviceComponents = devices.map((device, idx) => {
            let iterateAtts = device.device_att.map((att, i) => {
                return (
                    <div key={i} className="li-flex">
                        <li>
                            {att.name}: {att.key}
                        </li>
                        <div>
                            <BasicModal
                                name={att.name}
                                editAttributes={editAttributes}
                                id={device.id}
                                index={i}
                            />
                        </div>
                    </div>
                );
            });
            return (
                <Col key={idx}>
                    <Card style={{ width: "22rem" }}>
                        <CardBody>
                            <CardTitle>{device.identifier}</CardTitle>
                            <div>
                                <b>Indentifier</b>
                                <br />
                                {device.identifier}
                            </div>
                            <div>
                                <b>Owner</b>
                                <br />
                                {device.owner}
                            </div>
                            <div>
                                <b>Last Activity</b>
                                <br />
                                {device.activity}
                            </div>
                            <div>
                                <b>Self Registered</b>
                                <br />
                                {device.registered}
                            </div>
                            <div>
                                <b>Attributes</b>
                                <br />
                                <ul>{iterateAtts}</ul>
                            </div>
                            <Button
                                color="red"
                                onClick={() => {
                                    deleteDevice(device.id);
                                }}
                            >
                                Delete Device
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            );
        });

        return <div className="devices-container">{deviceComponents}</div>;
    }
}

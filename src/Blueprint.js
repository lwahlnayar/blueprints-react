import React from "react";
import { Button } from "mdbreact";

import EditModal from "./EditModal";
import DevicesOverview from "./DevicesOverview";

export default function Blueprint(props) {
    const { name, uuid, commands, sensors, attributes } = props.blueprintData;
    const { blueprintData, editBlueprint, deleteBlueprint } = props;

    return (
        <div className="each-blueprint">
            <h3>
                <b>{name}</b>
            </h3>
            <div className="button-holder">
                <EditModal
                    blueprintData={blueprintData}
                    editBlueprint={editBlueprint}
                />
                <DevicesOverview blueprintData={blueprintData} />
                <Button color="red" onClick={() => deleteBlueprint(uuid)}>
                    Remove
                </Button>
            </div>

            <div>
                <b>Blueprint Name:</b> {name}
            </div>
            <div>
                <b>Blueprint UUID:</b> {uuid}
            </div>
            <div className="capabilities-container">
                <div className="each-capability">
                    <p className="bold">Commands</p>
                    {iterateHtml(commands)}
                </div>
                <div className="each-capability">
                    <p className="bold">Attributes</p>
                    {iterateHtml(attributes)}
                </div>
                <div className="each-capability">
                    <p className="bold">Sensors</p>
                    {iterateHtml(sensors)}
                </div>
            </div>
        </div>
    );
}

function iterateHtml(capability) {
    const result = capability.map((obj, key) => {
        return (
            <div key={key}>
                <b>{obj.name} :</b> (key: {obj.value})
            </div>
        );
    });
    return result;
}

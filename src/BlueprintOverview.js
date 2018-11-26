import React from "react";
import uuidv4 from "uuid/v4";

import CreateModal from "./CreateModal";
import Blueprint from "./Blueprint";
import { examples } from "./examples";

export default class BlueprintOverview extends React.Component {
    constructor() {
        super();
        this.state = { blueprints: [] };
        this.createBlueprint = this.createBlueprint.bind(this);
        this.editBlueprint = this.editBlueprint.bind(this);
        this.deleteBlueprint = this.deleteBlueprint.bind(this);
    }

    componentDidMount() {
        //Here goes a GET call to server for all existing blueprints.
        this.setState({
            blueprints: examples
        });
    }

    createBlueprint(childState) {
        const input = {
            name: childState.name,
            uuid: uuidv4(),
            comment: childState.comment,
            commands: childState.commands,
            sensors: childState.sensors,
            attributes: childState.attributes
        };
        this.setState({
            blueprints: [...this.state.blueprints, input]
        });
        //Here goes an ajax call to server to INSERT new blueprint data.
    }

    editBlueprint(childState) {
        const input = { ...childState };
        let blueprints = this.state.blueprints;
        for (let i = 0; i < blueprints.length; i++) {
            if (blueprints[i].uuid === childState.uuid) {
                blueprints[i] = input;
            }
        }
        this.setState({ blueprints });
        //Here goes an ajax call to server to UPDATE blueprint data.
    }

    deleteBlueprint(childUuid) {
        const blueprints = this.state.blueprints.filter(obj => {
            return obj.uuid !== childUuid ? obj : null;
        });
        this.setState({ blueprints });
        // Here goes an ajax call to DELETE blueprint from DB
    }

    render() {
        let allBlueprints = this.state.blueprints.map((i, idx) => {
            return (
                <Blueprint
                    key={idx}
                    blueprintData={i}
                    editBlueprint={this.editBlueprint}
                    deleteBlueprint={this.deleteBlueprint}
                />
            );
        });

        return (
            <div className="blueprint-overview-component">
                <h1>BLUEPRINTS</h1> <h2>MANAGE YOUR DEVICE BLUEPRINTS</h2>
                <CreateModal createBlueprint={this.createBlueprint} />
                <div className="blueprints-flex-container">{allBlueprints}</div>
            </div>
        );
    }
}

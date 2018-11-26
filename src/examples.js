export const examples = [
    {
        name: "water",
        uuid: "f806f2e6-22ce-430c-b352-12c5d8286019",
        comment: "",
        commands: [],
        sensors: [
            {
                name: "biological",
                value: "biological",
                data_type: "double",
                comment: ""
            },
            {
                name: "physical",
                value: "physical",
                data_type: "integer",
                comment: ""
            }
        ],
        attributes: [
            { name: "location", value: "details about location" },
            {
                name: "path",
                value: "path to device"
            }
        ]
    },
    {
        name: "auto",
        uuid: "k806f2e6-22ce-430c-b352-12c5d8287052",
        comment: "",
        commands: [{ name: "beep", value: "Does sound" }],
        sensors: [{ name: "gas", value: "value", data_type: "integer" }],
        attributes: [
            {
                name: "bus protocol",
                value: "bus protocol"
            },
            { name: "path", value: "path to device" }
        ]
    }
];

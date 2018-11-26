import React from "react";

import Navbar from "./NavBar";
import BlueprintOverview from "./BlueprintOverview";

export default function App() {
    //Here would go each Nav feature as a dynamic component. For now only
    //blueprint component is available so I didn't add any clicking logic.
    return (
        <div className="container-fluid">
            <Navbar />
            <BlueprintOverview />
        </div>
    );
}

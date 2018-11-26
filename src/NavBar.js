import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export default function NavBar() {
    const bgPink = { backgroundColor: "#ec407a" };
    return (
        <div>
            <Router>
                <nav style={bgPink}>
                    <div>Blueprint</div>
                </nav>
            </Router>
        </div>
    );
}

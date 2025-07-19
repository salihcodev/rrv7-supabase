import * as React from "react";
import { Link } from "react-router-dom";

export default function Items() {
    return (
        <div>
            <h1>Items</h1>

            <div className="grid gap-4">
                <Link to="/items/1">Item 1</Link>
                <Link to="/items/2">Item 2</Link>
                <Link to="/items/3">Item 3</Link>
            </div>

            <div className="mt-4">
                <Link to="/items/new">Add New Item</Link>
            </div>
        </div>
    );
}

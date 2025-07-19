import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Item() {
    const { id } = useParams();

    return (
        <div>
            <Link to="/items">Back to Items</Link>

            <div className="mt-4">
                <h1>Item {id}</h1>
                <p>This is item {id}</p>
            </div>
        </div>
    );
}

import './Start.css';
import Choice from "./Choice";

export default function Select() {
    return (
        <div className="Select">
            <Choice name="A" />
            <Choice name="B" />
        </div>
    );
}

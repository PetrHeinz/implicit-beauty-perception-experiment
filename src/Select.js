import './Start.css';
import Choice from "./Choice";
import Timer from "./Timer";

export default function Select(props) {
    return (
        <div className="Select">
            <Choice name="A" />
            <Choice name="B" />
            <Timer seconds={5} tick={10} onTimeout={props.onTimeout} />
        </div>
    );
}

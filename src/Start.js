import './Start.css';
import { PAGE_SELECT } from "./App";

export default function Start(props) {
    function onStart() {
        console.log("Started");
        props.changePage(PAGE_SELECT);
    }

    return (
        <div className="Start">
            <div className="Start-logo">✵</div>
            <h1 className="Start-text">Implicit Beauty Perception Experiment</h1>
            <button className="Start-button" onClick={onStart}>Start</button>
        </div>
    );
}

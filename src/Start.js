import './Start.css';
import { PAGE_SELECT } from "./App";

export default function Start(props) {
    return (
        <div className="Start">
            <div className="Start-logo">✵</div>
            <h1 className="Start-text">Implicit Beauty Perception Experiment</h1>
            <button className="Start-button" onClick={() => props.changePage(PAGE_SELECT)}>Start</button>
        </div>
    );
}

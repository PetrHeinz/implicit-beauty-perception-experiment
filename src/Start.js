import './Start.css';
import { PAGE_LOG, PAGE_SELECT } from "./App";

export default function Start(props) {
    function onStart() {
        props.logger.logInfo("Started");
        props.logger.logDebug("Inner window " + window.innerWidth + "px × " + window.innerHeight + "px");
        props.logger.logDebug("Outer window " + window.outerWidth + "px × " + window.outerHeight + "px");
        props.changePage(PAGE_SELECT);
    }

    return (
        <div className="Start">
            <div className="Start-logo">✵</div>
            <h1 className="Start-text">Implicit Beauty Perception Experiment</h1>
            <button className="Start-button" onClick={onStart}>Start</button>
            <div className="Start-log" onClick={() => props.changePage(PAGE_LOG)}>☰</div>
        </div>
    );
}

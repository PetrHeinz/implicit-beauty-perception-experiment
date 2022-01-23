import './Log.css';
import React from "react";
import { PAGE_START } from "./App";

export default class Log extends React.Component {

    componentDidMount() {
        this.scrollDown();
    }

    componentDidUpdate() {
        this.scrollDown();
    }

    scrollDown() {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
    }

    clear() {
        if (window.confirm("Vážně chcete vymazat záznamy?\nTímto nevratně přijdete o dosavadní data.")) {
            this.props.logger.clear();
            this.props.logger.logDebug("Log cleared")
        } else {
            this.props.logger.logDebug("Log not cleared")
        }

        this.forceUpdate()
    }

    render() {
        const records = this.props.logger.records;
        return (
            <div className="Log">
                <div className="Log-button Log-clear" onClick={() => this.clear()}>⎚ Vymazat</div>
                <div className="Log-button Log-back" onClick={() => this.props.changePage(PAGE_START)}>⤺ Zpět</div>
                {records.map((record, i) => <p key={i} className={"Log-record Log-" + record.type.toLowerCase()}>{record.formattedMessage}</p>)}
            </div>
        );
    }
}

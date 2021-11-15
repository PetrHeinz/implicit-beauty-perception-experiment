import './Log.css';
import React from "react";
import { PAGE_START } from "./App";

export default class Log extends React.Component {

    clear() {
        if (window.confirm("Do you really want to clear the log?\nYou will irreversibly lose the data.")) {
            this.props.logger.clear();
            this.props.logger.logDebug("Log cleared")
        } else {
            this.props.logger.logDebug("Log not cleared")
        }

        this.forceUpdate()
    }

    render() {
        const records = this.props.logger.records.reverse();
        return (
            <div className="Log">
                <div className="Log-button Log-clear" onClick={() => this.clear()}>⎚ Clear</div>
                <div className="Log-button Log-back" onClick={() => this.props.changePage(PAGE_START)}>⤺ Back</div>
                {records.map((record, i) => <p key={i} className={"Log-record Log-" + record.type.toLowerCase()}>{record.formattedMessage}</p>)}
            </div>
        );
    }
}

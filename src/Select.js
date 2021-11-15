import './Select.css';
import React from "react";
import seedrandom from "seedrandom";
import { PAGE_START } from "./App";
import Choice from "./Choice";
import Timer from "./Timer";

export default class Select extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: null,
            isSelectable: false,
            isConfirmed: false,
        };

        const rng = seedrandom(props.seed);
        this.seedA = rng();
        this.seedB = rng();
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isSelectable: true})
            this.props.logger.logDebug("Choices became selectable");
        }, this.props.selectableDelaySeconds * 1000);

        this.props.logger.logDebug("Select initialized with seed '" + this.props.seed + "'");
    }

    select(choice) {
        if (!this.state.isSelectable) {
            return this.props.logger.logError("Not selectable, cannot select '" + choice + "'");
        }
        if (this.state.selected !== null) {
            return this.props.logger.logError("Already selected '" + this.state.selected + "', cannot select '" + choice + "'");
        }

        this.props.logger.logInfo("Selected '" + choice + "'");
        this.setState({selected: choice});
    }

    confirm(choice) {
        if (this.state.confirmed) {
            return this.props.logger.logError("Already confirmed '" + this.state.selected + "', cannot confirm '" + choice + "'");
        }
        if (this.state.selected === null) {
            return this.props.logger.logError("Nothing selected, cannot confirm '" + choice + "'");
        }
        if (this.state.selected !== choice) {
            return this.props.logger.logError("Selected '" + this.state.selected + "', cannot confirm '" + choice + "'");
        }

        this.props.logger.logInfo("Confirmed '" + choice + "'");
        this.setState({confirmed: true});

        this.props.changePage(PAGE_START);
    }

    render() {
        return (
            <div className="Select">
                <Choice name="A"
                        seed={this.seedA}
                        isSelectable={this.state.isSelectable}
                        onSelect={choice => this.select(choice)}
                        onConfirm={choice => this.confirm(choice)}
                        logger={this.props.logger}
                />
                <Choice name="B"
                        seed={this.seedB}
                        isSelectable={this.state.isSelectable}
                        onSelect={choice => this.select(choice)}
                        onConfirm={choice => this.confirm(choice)}
                        logger={this.props.logger}
                />
                <Timer seconds={this.props.timoutSeconds} changePage={this.props.changePage} logger={this.props.logger}/>
                {this.state.selected !== null && <div className={"Select-flash Choice-" + this.state.selected}/>}
            </div>
        );
    }
}

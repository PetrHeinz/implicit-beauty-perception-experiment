import './Start.css';
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
        setTimeout(() => this.setState({isSelectable: true}), this.props.isSelectableAfterMs);
    }

    select(choice) {
        if (!this.state.isSelectable) {
            console.log("Not selectable, cannot select '" + choice + "'");
            return;
        }
        if (this.state.selected !== null) {
            console.log("Already selected '" + this.state.selected + "', cannot select '" + choice + "'");
            return;
        }

        console.log("Selected '" + choice + "'");
        this.setState({selected: choice});
    }

    confirm(choice) {
        if (this.state.confirmed) {
            console.log("Already confirmed '" + this.state.selected + "', cannot confirm '" + choice + "'");
            return;
        }
        if (this.state.selected === null) {
            console.log("Nothing selected, cannot confirm '" + choice + "'");
            return;
        }
        if (this.state.selected !== choice) {
            console.log("Selected '" + this.state.selected + "', cannot confirm '" + choice + "'");
            return;
        }

        console.log("Confirmed '" + choice + "'");
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
                />
                <Choice name="B"
                        seed={this.seedB}
                        isSelectable={this.state.isSelectable}
                        onSelect={choice => this.select(choice)}
                        onConfirm={choice => this.confirm(choice)}
                />
                <Timer seconds={this.props.timoutAfterSeconds} tick={10} changePage={this.props.changePage}/>
            </div>
        );
    }
}

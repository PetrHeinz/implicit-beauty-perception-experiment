import './Start.css';
import React from "react";
import Choice from "./Choice";
import Timer from "./Timer";

export default class Select extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: null,
            confirmed: false,
        };
    }

    select(choice) {
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
    }

    render() {
        return (
            <div className="Select">
                <Choice onSelect={choice => this.select(choice)} onConfirm={choice => this.confirm(choice)} name="A"/>
                <Choice onSelect={choice => this.select(choice)} onConfirm={choice => this.confirm(choice)} name="B"/>
                <Timer seconds={5} tick={10} onTimeout={this.props.onTimeout}/>
            </div>
        );
    }
}

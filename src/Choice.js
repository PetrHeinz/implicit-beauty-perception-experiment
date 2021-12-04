import './Choice.css';
import React from "react";
import seedrandom from "seedrandom";
import ChoiceButton from "./ChoiceButton";

export default class Choice extends React.Component {

    constructor(props) {
        super(props);
        const rng = seedrandom(this.props.seed);
        this.photo = "./photos/T" + this.props.index + this.props.name + ".png";
        this.x = rng();
        this.y = rng();
    }

    componentDidMount() {
        this.props.logger.logDebug("Choice '" + this.props.name + "' initialized with seed '" + this.props.seed + "'");
    }

    render() {
        return (
            <div
                className={"Choice Choice-" + this.props.name + " " + (this.props.isSelectable ? "Choice-selectable" : "")}>
                <div className="Choice-border">
                    <div className="Choice-photo" onClick={() => this.props.onConfirm(this.props.name)}>
                        <img src={this.photo} alt={"Photo " + this.props.name} />
                    </div>
                    <div className="Choice-name">{this.props.name}</div>
                    {this.props.isSelectable && <ChoiceButton onClick={() => this.props.onSelect(this.props.name)} x={this.x} y={this.y}/>}
                </div>
            </div>
        );
    }
}

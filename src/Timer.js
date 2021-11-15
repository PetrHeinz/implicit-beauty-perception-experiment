import React from "react";
import './Timer.css';
import { PAGE_START } from "./App";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: props.seconds * 1000,
        }
        this.tickInterval = null;
    }

    componentDidMount() {
        this.tickInterval = setInterval(() => this.tick(), this.props.tick)
    }

    componentWillUnmount() {
        clearInterval(this.tickInterval)
        this.setState({time: this.props.seconds * 1000})
    }

    tick() {
        const time = this.state.time - this.props.tick;
        this.setState({time: time})
        if (time < 0) {
            this.props.changePage(PAGE_START);
        }
    }

    render() {
        return (
            <div className="Timer">
                {(this.state.time / 1000).toFixed(2)} s
            </div>
        );
    }
}

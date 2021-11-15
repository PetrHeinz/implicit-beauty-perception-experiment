import Start from "./Start";
import Select from "./Select";
import React from "react";

const PAGE_START = 'start';
const PAGE_SELECT = 'select';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: PAGE_START,
        };
    }

    changePage(page) {
        this.setState({page: page});
    }

    getPage() {
        if (this.state.page === PAGE_START) {
            return <Start onStart={() => this.changePage(PAGE_SELECT)}/>;
        }

        if (this.state.page === PAGE_SELECT) {
            return <Select seed={Math.random()} onTimeout={() => this.changePage(PAGE_START)}/>;
        }

        return <h1>404 Not Found</h1>
    }

    render() {
        return (
            <div className="App">
                {this.getPage()}
            </div>
        );
    }
}

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

    render() {
        return (
            <div className="App">
                {this.state.page === PAGE_START ? <Start onStart={() => this.changePage(PAGE_SELECT)} /> : null}
                {this.state.page === PAGE_SELECT ? <Select onTimeout={() => this.changePage(PAGE_START)} /> : null}
            </div>
        );
    }
}
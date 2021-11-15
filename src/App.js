import Start from "./Start";
import Select from "./Select";
import React from "react";

export const PAGE_START = 'start';
export const PAGE_SELECT = 'select';

const CHOICE_TIMEOUT_SECONDS = 5;
const CHOICE_SELECTABLE_DELAY_SECONDS = 1.5;

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
            return <Start changePage={(page) => this.changePage(page)}/>;
        }

        if (this.state.page === PAGE_SELECT) {
            return <Select seed={Math.random()}
                           timoutSeconds={CHOICE_TIMEOUT_SECONDS}
                           selectableDelaySeconds={CHOICE_SELECTABLE_DELAY_SECONDS}
                           changePage={(page) => this.changePage(page)}
            />;
        }

        return <h1>404 Not Found</h1>;
    }

    render() {
        return (
            <div className="App">
                {this.getPage()}
            </div>
        );
    }
}

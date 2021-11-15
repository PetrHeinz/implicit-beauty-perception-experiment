import Start from "./Start";
import Select from "./Select";
import React from "react";

export const PAGE_START = 'start';
export const PAGE_SELECT = 'select';

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
                           timoutAfterSeconds="15"
                           isSelectableAfterMs="1500"
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

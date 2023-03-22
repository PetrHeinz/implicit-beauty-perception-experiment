import Log from "./Log";
import Logger from "./Logger";
import SelectSequence from "./SelectSequence";
import Start from "./Start";
import React from "react";
import Tutorial from "./Tutorial";

export const PAGE_START = 'start';
export const PAGE_TUTORIAL = 'tutorial';
export const PAGE_SELECT = 'select';
export const PAGE_LOG = 'log';

const CHOICE_TIMEOUT_SECONDS = 7;
const CHOICE_SELECTABLE_DELAY_SECONDS = 1.5;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: PAGE_START,
        };
        this.logger = new Logger();
    }

    componentDidMount() {
        this.logger.logInfo("Application initialized");

        const date = new Date();
        this.logger.logDebug("Current date: " + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay());
        this.logger.logDebug("Time zone offset: " + date.getTimezoneOffset());
    }

    changePage(page) {
        this.logger.logDebug("Changing page to '" + page + "'");
        this.setState({page: page});
    }

    getPage() {
        if (this.state.page === PAGE_START) {
            return <Start changePage={(page) => this.changePage(page)} logger={this.logger}/>;
        }

        if (this.state.page === PAGE_TUTORIAL) {
            return <Tutorial seed={Math.random()}
                             timeoutSeconds={CHOICE_TIMEOUT_SECONDS}
                             selectableDelaySeconds={CHOICE_SELECTABLE_DELAY_SECONDS}
                             onEnd={() => this.changePage(PAGE_SELECT)}
                             onReset={() => this.changePage(PAGE_START)}
                             logger={this.logger}
            />;
        }

        if (this.state.page === PAGE_SELECT) {
            return <SelectSequence seed={Math.random()}
                                   indexes={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                                   indexesSwitched={[7, 10, 14]}
                                   timeoutSeconds={CHOICE_TIMEOUT_SECONDS}
                                   selectableDelaySeconds={CHOICE_SELECTABLE_DELAY_SECONDS}
                                   changePage={(page) => this.changePage(page)}
                                   logger={this.logger}
            />;
        }

        if (this.state.page === PAGE_LOG) {
            return <Log changePage={(page) => this.changePage(page)} logger={this.logger}/>;
        }

        this.logger.logError("Page '" + this.state.page + "' not found");

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

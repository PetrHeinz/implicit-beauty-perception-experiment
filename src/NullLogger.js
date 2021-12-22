import Logger from "./Logger";

export default class NullLogger extends Logger {
    constructor() {
        super();

        this.records = [];
        this.useLocalStorage = false;
    }

    log(type, message) {
        // Do nothing
    }
}

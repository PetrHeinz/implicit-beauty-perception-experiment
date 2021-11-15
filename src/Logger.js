export default class Logger {
    constructor() {
        this.records = JSON.parse(window.localStorage.getItem('logger')) || [];
        this.useLocalStorage = true;
    }

    logDebug(message) {
        this.log('DEBUG', message);
    }

    logInfo(message) {
        this.log('INFO', message);
    }

    logError(message) {
        this.log('ERROR', message);
    }

    clear() {
        this.records = [];
        this.save();
    }

    save() {
        if (this.useLocalStorage) {
            try {
                window.localStorage.setItem('logger', JSON.stringify(this.records));
            } catch (error) {
                this.useLocalStorage = false;
                this.logError("Could not save log to the local storage: " + error);
            }
        }
    }

    log(type, message) {
        const date = new Date();
        const formattedTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
        const record = {
            date: date,
            type: type,
            message: message,
            formattedTime: formattedTime,
            formattedMessage: formattedTime + " " + type + ": " + message,
        };

        this.records.push(record);

        console.log(record.formattedMessage);

        this.save();
    }
}

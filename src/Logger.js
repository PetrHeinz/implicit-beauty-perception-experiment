export default class Logger {
    constructor() {
        this.records = [];
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
    }
}

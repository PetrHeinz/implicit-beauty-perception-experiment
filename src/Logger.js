export default class Logger {
    logDebug(message) {
        this.log('DEBUG', message);
    }

    logInfo(message) {
        this.log('INFO', message);
    }

    logError(message) {
        this.log('ERROR', message);
    }

    log(type, message) {
        console.log(this.time() + " " + type + ": " + message);
    }

    time() {
        const date = new Date();
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()  + "." + date.getMilliseconds();
    }
}

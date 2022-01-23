import React, { useEffect, useState } from "react";
import './Timer.css';

const TICK_MILLISECONDS = 10;
const MILLISECONDS_IN_SECOND = 1000;

export default function Timer({index, seconds, onTimeout, logger, running=true}) {

    const [time, setTime] = useState(seconds * MILLISECONDS_IN_SECOND);

    useEffect(() => {
        let interval = null;

        if (!running) {
            return;
        }

        if (time > 0) {
            interval = setInterval(() => setTime(time - TICK_MILLISECONDS), TICK_MILLISECONDS)
        } else {
            logger.logInfo("Timeout");
            onTimeout();
            clearInterval(interval);
            setTime(seconds * MILLISECONDS_IN_SECOND)
        }

        return () => clearInterval(interval);
    }, [time, running, seconds, onTimeout, logger])

    useEffect(() => setTime(seconds * MILLISECONDS_IN_SECOND), [index, seconds]);

    return (
        <div className="Timer">
            {(time / MILLISECONDS_IN_SECOND).toFixed(2)} s
        </div>
    );
}

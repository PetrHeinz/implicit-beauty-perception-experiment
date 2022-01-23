import React, { useEffect, useState } from "react";
import './Timer.css';

const TICK_MILLISECONDS = 10;
const MILLISECONDS_IN_SECOND = 1000;

export default function Timer({index, seconds, onTimeout, logger, running = true}) {

    const [time, setTime] = useState(seconds * MILLISECONDS_IN_SECOND);
    const [lastNow, setLastNow] = useState(running ? Date.now() : null);

    useEffect(() => {
        if (running && lastNow === null) {
            setLastNow(Date.now());
        }

        const interval = setInterval(() => {
            if (!running || lastNow === null) {
                return;
            }

            const now = Date.now();
            const elapsedMilliseconds = now - lastNow;

            setTime(t => t - elapsedMilliseconds);
            setLastNow(now);
        }, TICK_MILLISECONDS);

        return () => clearInterval(interval);
    }, [running, lastNow]);

    useEffect(() => {
        if (time <= 0) {
            logger.logInfo("Timeout");
            onTimeout();

            setTime(seconds * MILLISECONDS_IN_SECOND);
            setLastNow(running ? Date.now() : null);
        }
    }, [running, time, seconds, onTimeout, logger]);

    useEffect(() => {
        setTime(seconds * MILLISECONDS_IN_SECOND);
    }, [index, seconds]);

    useEffect(() => {
        setLastNow(running ? Date.now() : null);
    }, [running]);

    return (
        <div className="Timer">
            {(time / MILLISECONDS_IN_SECOND).toFixed(2)} s
        </div>
    );
}

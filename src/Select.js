import './Select.css';
import React, { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import { SWITCH_PROBABILITY } from "./App";
import Choice from "./Choice";
import NullLogger from "./NullLogger";
import Timer from "./Timer";

export default function Select({index, seed, selectableDelaySeconds, timoutSeconds, onEnd, onReset, logger}) {

    const [selected, setSelected] = useState(null);
    const [isSelectable, setSelectable] = useState(false);
    const [isConfirmed, setConfirmed] = useState(false);
    const [isShowingResult, setShowingResult] = useState(false);
    const [isSwitched, setSwitched] = useState(false);

    const rng = seedrandom(seed);
    const seedSwitch = seedrandom()();
    const rngSwitch = seedrandom(seedSwitch);
    const seedA = rng();
    const seedB = rng();

    useEffect(() => {
        logger.logDebug("Select " + index + " initialized with seed '" + seed + "' (seed for switch '" + seedSwitch + "')");
    }, [logger, index, seed, seedSwitch]);

    useEffect(() => {
        setTimeout(() => {
            setSelectable(true);
            logger.logDebug("Choices became selectable");
        }, selectableDelaySeconds * 1000);
    }, [index, selectableDelaySeconds, logger]);

    const select = choice => {
        if (!isSelectable) {
            return logger.logError("Not selectable, cannot select '" + choice + "'");
        }
        if (selected !== null) {
            return logger.logError("Already selected '" + selected + "', cannot select '" + choice + "'");
        }

        logger.logInfo("Selected '" + choice + "'");
        setSelected(choice);

        if (rngSwitch() < SWITCH_PROBABILITY) {
            logger.logInfo("Switched choices!");
            setSwitched(true);
        }
    }

    const confirm = choice => {
        if (isConfirmed) {
            return logger.logError("Already confirmed '" + selected + "', cannot confirm '" + choice + "'");
        }
        if (selected === null) {
            return logger.logError("Nothing selected, cannot confirm '" + choice + "'");
        }
        if (selected !== choice) {
            return logger.logError("Selected '" + selected + "', cannot confirm '" + choice + "'" + (isSwitched ? " (switched)" : ""));
        }

        logger.logInfo("Confirmed '" + choice + "'" + (isSwitched ? " (switched)" : ""));
        setConfirmed(true);
        setShowingResult(true);
    }

    const getPhoto = name => {
        if (isSwitched) {
            name = (name === "A" ? "B" : "A");
        }

        return "./photos/T" + index + name + ".png";
    }

    const parentOnEnd = onEnd;
    onEnd = () => {
        setSelected(null);
        setSelectable(false);
        setConfirmed(false);
        setShowingResult(false);
        setSwitched(false);

        parentOnEnd()
    };

    if (isShowingResult) {
        return (
            <div className={"Select Result " + (selected !== null ? "Result-" + selected : "") }>
                {isConfirmed && <Choice photo={getPhoto(selected)} name={selected} isSelectable={false} logger={new NullLogger()}/>}
                {!isConfirmed && selected !== null && <p>Nepotvrdili jste Vámi vybranou možnost {selected}.</p>}
                {!isConfirmed && selected === null && <p>Nevybrali jste žádnou možnost.</p>}
                <button className="Result-button" onClick={() => onEnd()}>Další</button>
                <div className="Result-reset" onClick={() => onReset()}>⤺</div>
            </div>
        );
    }

    return (
        <div className="Select">
            <Choice name="A"
                    photo={getPhoto("A")}
                    seed={seedA}
                    isSelectable={isSelectable}
                    onSelect={choice => select(choice)}
                    onConfirm={choice => confirm(choice)}
                    logger={logger}
            />
            <Choice name="B"
                    photo={getPhoto("B")}
                    seed={seedB}
                    isSelectable={isSelectable}
                    onSelect={choice => select(choice)}
                    onConfirm={choice => confirm(choice)}
                    logger={logger}
            />
            <Timer index={index} seconds={timoutSeconds} onTimeout={() => setShowingResult(true)} logger={logger}/>
            {selected !== null && <div className={"Select-flash Choice-" + selected}/>}
        </div>
    );
}

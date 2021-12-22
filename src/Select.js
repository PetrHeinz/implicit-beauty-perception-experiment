import './Select.css';
import React, { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import Choice from "./Choice";
import NullLogger from "./NullLogger";
import Timer from "./Timer";

export default function Select({index, seed, selectableDelaySeconds, timoutSeconds, onEnd, logger}) {

    const [selected, setSelected] = useState(null);
    const [isSelectable, setSelectable] = useState(false);
    const [isConfirmed, setConfirmed] = useState(false);
    const [isShowingResult, setShowingResult] = useState(false);

    const rng = seedrandom(seed);
    const seedA = rng();
    const seedB = rng();

    useEffect(() => {
        logger.logDebug("Select " + index + " initialized with seed '" + seed + "'");
    }, [logger, index, seed]);

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
    }

    const confirm = choice => {
        if (isConfirmed) {
            return logger.logError("Already confirmed '" + selected + "', cannot confirm '" + choice + "'");
        }
        if (selected === null) {
            return logger.logError("Nothing selected, cannot confirm '" + choice + "'");
        }
        if (selected !== choice) {
            return logger.logError("Selected '" + selected + "', cannot confirm '" + choice + "'");
        }

        logger.logInfo("Confirmed '" + choice + "'");
        setConfirmed(true);
        setShowingResult(true);
    }

    const parentOnEnd = onEnd;
    onEnd = () => {
        setSelected(null);
        setSelectable(false);
        setConfirmed(false);
        setShowingResult(false);

        parentOnEnd()
    };

    if (isShowingResult) {
        return (
            <div className={"Select Result " + (selected !== null ? "Result-" + selected : "") }>
                {isConfirmed && <Choice index={index} name={selected} isSelectable={false} logger={new NullLogger()}/>}
                {!isConfirmed && selected !== null && <p>You have not confirmed your choice of {selected}.</p>}
                {!isConfirmed && selected === null && <p>You have not selected any choice.</p>}
                <button className="Result-button" onClick={() => onEnd()}>Next</button>
            </div>
        );
    }

    return (
        <div className="Select">
            <Choice index={index}
                    name="A"
                    seed={seedA}
                    isSelectable={isSelectable}
                    onSelect={choice => select(choice)}
                    onConfirm={choice => confirm(choice)}
                    logger={logger}
            />
            <Choice index={index}
                    name="B"
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

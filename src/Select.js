import './Select.css';
import React, { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import Choice from "./Choice";
import NullLogger from "./NullLogger";
import Timer from "./Timer";

export default function Select({index, shouldSwitch, seed, selectableDelaySeconds, timeoutSeconds, onEnd, onReset, logger}) {

    const [selected, setSelected] = useState(null);
    const [isSelectable, setSelectable] = useState(false);
    const [isConfirmed, setConfirmed] = useState(false);
    const [isShowingResult, setShowingResult] = useState(false);

    const rng = seedrandom(seed);
    const seedA = rng();
    const seedB = rng();

    useEffect(() => {
        logger.logDebug("Select " + index + " initialized with seed '" + seed + "'" + (shouldSwitch ? " (should switch)" : ""));
    }, [logger, index, seed, shouldSwitch]);

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

        if (shouldSwitch) {
            logger.logInfo("Switched choices!");
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
            return logger.logError("Selected '" + selected + "', cannot confirm '" + choice + "'" + (shouldSwitch ? " (switched)" : ""));
        }

        logger.logInfo("Confirmed '" + choice + "'" + (shouldSwitch ? " (switched)" : ""));
        setConfirmed(true);
        setShowingResult(true);
    }

    const getPhoto = name => {
        if (shouldSwitch && selected !== null) {
            name = (name === "A" ? "B" : "A");
        }

        return "./photos/T" + index + name + ".jpg";
    }

    const parentOnEnd = onEnd;
    onEnd = () => {
        let resultInput = document.querySelector(".Result-input");
        if (resultInput) {
            logger.logInfo("Reason for the choice: '" + resultInput.value + "'");
        }
        setSelected(null);
        setSelectable(false);
        setConfirmed(false);
        setShowingResult(false);

        parentOnEnd()
    };

    if (isShowingResult) {
        return (
            <div className={"Select Result " + (selected !== null ? "Result-" + selected : "") }>
                {isConfirmed && <><Choice photo={getPhoto(selected)} name={selected} isSelectable={false} logger={new NullLogger()}/><textarea className="Result-input" rows={3} placeholder={"Nyní krátce vysvětlete proč jste si vybral/-a tuto fotografii"}/></>}
                {!isConfirmed && selected !== null && <p>Nepotvrdili jste Vámi vybranou možnost {selected}.<br/>Po stisknutí tlačítka 'Vybrat' potvrďte svůj výběr kliknutím na samotnou fotografii.</p>}
                {!isConfirmed && selected === null && <p>Nevybrali jste žádnou možnost.<br/>Výběr proveďte kliknutím na tlačítko 'Vybrat' u Vámi zvolené fotografie.</p>}
                <button style={{marginTop: isConfirmed ? "5vh" : ""}} className="Result-button" onClick={() => onEnd()}>Další</button>
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
            <Timer index={index} seconds={timeoutSeconds} onTimeout={() => setShowingResult(true)} logger={logger}/>
            {selected !== null && <div className={"Select-flash Choice-" + selected}/>}
        </div>
    );
}

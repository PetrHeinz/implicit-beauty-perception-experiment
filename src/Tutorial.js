import './Select.css';
import React, { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import Choice from "./Choice";
import NullLogger from "./NullLogger";
import Timer from "./Timer";

export default function Tutorial({seed, selectableDelaySeconds, timoutSeconds, onEnd, onReset, logger}) {

    const TUTORIAL_TEXT_GOAL = "Podívejte se na fotografie vpravo a rozhodněte, která z fotografií Vám připadá krásnější. Na celé rozhodnutí máte " + timoutSeconds + " vteřin.";
    const TUTORIAL_TEXT_SELECTION = "Nyní se na obrazovce objevila 2 tlačítka 'Vybrat'. Klikněte na to u Vámi zvolené fotografie. Výběr poté potvrdíte kliknutím na samotnou fotografii.";

    const [selected, setSelected] = useState(null);
    const [isSelectable, setSelectable] = useState(false);
    const [isConfirmed, setConfirmed] = useState(false);
    const [isShowingResult, setShowingResult] = useState(false);
    const [tutorialText, setTutorialText] = useState(TUTORIAL_TEXT_GOAL);

    const rng = seedrandom(seed);
    const seedA = rng();
    const seedB = rng();

    useEffect(() => {
        logger.logDebug("Tutorial initialized with seed '" + seed + "'");
    }, [logger, seed]);

    useEffect(() => {
        if (isSelectable || tutorialText !== null) {
            return;
        }

        setTimeout(() => {
            setSelectable(true);
            setTutorialText(TUTORIAL_TEXT_SELECTION);
            logger.logDebug("Choices became selectable");
        }, selectableDelaySeconds * 1000);
    }, [isSelectable, tutorialText, selectableDelaySeconds, logger]);

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

    const getPhoto = name => "./photos/T0" + name + ".png";

    const restartTutorial = () => {
        logger.logDebug("Restarting tutorial");

        setTutorialText(TUTORIAL_TEXT_GOAL);
        setSelected(null);
        setSelectable(false);
        setConfirmed(false);
        setShowingResult(false);
    };

    if (isShowingResult) {
        return (
            <div className={"Select Result " + (selected !== null ? "Result-" + selected : "") }>
                {isConfirmed && <Choice photo={getPhoto(selected)} name={selected} isSelectable={false} logger={new NullLogger()}/>}
                {!isConfirmed && selected !== null && <p>Nepotvrdili jste Vámi vybranou možnost {selected}.</p>}
                {!isConfirmed && selected === null && <p>Nevybrali jste žádnou možnost.</p>}
                <button className="Result-button" onClick={() => restartTutorial()}>Chci si to ještě zopakovat</button>
                <br />
                {isConfirmed && <button className="Result-button" onClick={() => onEnd()}>Jsem připraven/a</button>}
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
            <Timer index={0}
                   running={tutorialText === null}
                   seconds={timoutSeconds}
                   onTimeout={() => setShowingResult(true)}
                   logger={logger}
            />
            {selected !== null && <div className={"Select-flash Choice-" + selected}/>}
            {tutorialText !== null && <div className="Select-tutorial">{tutorialText}<button className="Select-tutorial-button" onClick={() => setTutorialText(null)}>Rozumím</button></div>}
        </div>
    );
}

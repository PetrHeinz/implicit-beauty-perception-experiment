import './Select.css';
import React, { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import { PAGE_START } from "./App";
import Select from "./Select";

export default function SelectSequence({indexes, indexesSwitched, seed, selectableDelaySeconds, timeoutSeconds, changePage, logger}) {

    const [step, setStep] = useState(0);

    const rng = seedrandom(seed);
    const seeds = indexes.map(() => rng());

    useEffect(
        () => logger.logDebug("SelectSequence initialized with seed '" + seed + "'"),
        [logger, seed],
    );

    const reset = () => {
        if (window.confirm("Vážně chcete restartovat experiment?")) {
            logger.logDebug("Resetting the experiment");
            changePage(PAGE_START);
        } else {
            logger.logDebug("Reset not confirmed, continuing");
        }
    };

    if (step >= indexes.length) {
        logger.logDebug("Select sequence ended");

        return (
            <div className="SelectSequence Result">
                <p>Děkujeme za Vaši účast!</p>
                <button className="Result-button" onClick={() => changePage(PAGE_START)}>Konec</button>
            </div>
        );
    }

    return (
        <Select index={indexes[step]}
                shouldSwitch={indexesSwitched.indexOf(indexes[step]) !== -1}
                seed={seeds[step]}
                selectableDelaySeconds={selectableDelaySeconds}
                timeoutSeconds={timeoutSeconds}
                onEnd={() => setStep(step + 1)}
                onReset={() => reset()}
                logger={logger}
        />
    );
}

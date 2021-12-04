import React, { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import { PAGE_START } from "./App";
import Select from "./Select";

export default function SelectSequence({indexes, seed, selectableDelaySeconds, timoutSeconds, changePage, logger}) {

    const [step, setStep] = useState(0);

    const rng = seedrandom(seed);
    const seeds = indexes.map(() => rng());

    useEffect(
        () => logger.logDebug("SelectSequence initialized with seed '" + seed + "'"),
        [logger, seed],
    );

    const nextStep = () => {
        if (step + 1 < indexes.length) {
            setStep(step + 1);
        } else {
            changePage(PAGE_START);
        }
    };

    return (
        <Select index={indexes[step]}
                seed={seeds[step]}
                selectableDelaySeconds={selectableDelaySeconds}
                timoutSeconds={timoutSeconds}
                onEnd={() => nextStep()}
                logger={logger}
        />
    );
}

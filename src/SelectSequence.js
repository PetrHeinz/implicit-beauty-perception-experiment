import React, { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import Select from "./Select";

export default function SelectSequence({indexes, seed, selectableDelaySeconds, timoutSeconds, logger}) {

    const [step, setStep] = useState(0);

    const rng = seedrandom(seed);
    const seeds = indexes.map(() => rng());

    useEffect(
        () => logger.logDebug("SelectSequence initialized with seed '" + seed + "'"),
        [logger, seed],
    );

    const nextStep = () => {
        setStep(step + 1);
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

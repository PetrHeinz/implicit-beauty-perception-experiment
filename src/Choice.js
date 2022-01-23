import './Choice.css';
import React, { useEffect } from "react";
import seedrandom from "seedrandom";
import ChoiceButton from "./ChoiceButton";

export default function Choice({name, photo, seed, isSelectable, onSelect, onConfirm, logger}) {

    const rng = seedrandom(seed);
    const x = rng();
    const y = rng();

    useEffect(
        () => logger.logDebug("Choice '" + name + "' ('" + photo + "') initialized with seed '" + seed + "'"),
        [logger, name, photo, seed],
    );

    return (
        <div
            className={"Choice Choice-" + name + " " + (isSelectable ? "Choice-selectable" : "")}>
            <div className="Choice-border">
                <div className="Choice-photo" onClick={() => onConfirm(name)}>
                    <img src={photo} alt={"Photo " + name} />
                </div>
                <div className="Choice-name">{name}</div>
                {isSelectable && <ChoiceButton onClick={() => onSelect(name)} x={x} y={y}/>}
            </div>
        </div>
    );
}

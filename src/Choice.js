import './Choice.css';
import seedrandom from "seedrandom";
import ChoiceButton from "./ChoiceButton";

export default function Choice(props) {
    const rng = seedrandom(props.seed);

    return (
        <div className={"Choice Choice-" + props.name}>
            <div className="Choice-border">
                <img className="Choice-photo"
                     onClick={() => props.onConfirm(props.name)}
                     src={"https://picsum.photos/600?random=" + rng()}
                     alt={"Photo " + props.name}
                />
                <div className="Choice-name">{props.name}</div>
                <ChoiceButton onClick={() => props.onSelect(props.name)} x={rng()} y={rng()}/>
            </div>
        </div>
    );
}

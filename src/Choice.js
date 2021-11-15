import './Choice.css';
import ChoiceButton from "./ChoiceButton";

export default function Choice(props) {
    return (
        <div className={"Choice Choice-" + props.name}>
            <div className="Choice-border">
                <img className="Choice-photo"
                     onClick={() => props.onConfirm(props.name)}
                     src={"https://picsum.photos/600?random=" + Math.random()}
                     alt={"Photo " + props.name}
                />
                <div className="Choice-name">{props.name}</div>
                <ChoiceButton onClick={() => props.onSelect(props.name)} x={Math.random()} y={Math.random()} />
            </div>
        </div>
    );
}

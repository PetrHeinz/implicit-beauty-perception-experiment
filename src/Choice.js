import './Choice.css';
import ChoiceSelect from "./ChoiceSelect";

export default function Choice(props) {
    return (
        <div className={"Choice Choice-" + props.name}>
            <div className="Choice-border">
                <img className="Choice-photo"
                     src={"https://picsum.photos/600?random=" + Math.random()}
                     alt={"Photo " + props.name}/>
                <div className="Choice-name">{props.name}</div>
                <ChoiceSelect x={Math.random()} y={Math.random()} />
            </div>
        </div>
    );
}

import './Choice.css';

export default function Choice(props) {
    return (
        <div className={"Choice Choice-" + props.name}>
            <div className="Choice-border">
                <img className="Choice-photo"
                     src={"https://picsum.photos/600?random=" + props.name}
                     alt={"Photo " + props.name}/>
                <div className="Choice-name">{props.name}</div>
            </div>
        </div>
    );
}
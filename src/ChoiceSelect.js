export default function ChoiceSelect(props) {
    return (
        <button className="Choice-button" style={{left: 5 + (30 * props.x) + "vw", top: 5 + (30 * props.y) + "vh"}}>
            Select
        </button>
    );
}

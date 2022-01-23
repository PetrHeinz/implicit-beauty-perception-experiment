export default function ChoiceButton(props) {
    return (
        <button className="Choice-button"
                onClick={props.onClick}
                style={{left: 5 + (30 * props.x) + "vw", top: 5 + (30 * props.y) + "vh"}}
        >
            Vybrat
        </button>
    );
}

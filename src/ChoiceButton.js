export default function ChoiceButton(props) {
    return (
        <button className="Choice-button"
                onClick={props.onClick}
                style={{left: 5 + (15 * props.y) + "vw", top: 5 + (30 * props.y) + "vh"}}
        >
            Vybrat
        </button>
    );
}

import './Start.css';

export default function Start() {
    return (
        <div className="Start">
            <div className="Start-logo">✵</div>
            <h1 className="Start-text">Implicit Beauty Perception Experiment</h1>
            <button className="Start-button" onClick={event => event.target.textContent = 'No.'}>Start</button>
        </div>
    );
}

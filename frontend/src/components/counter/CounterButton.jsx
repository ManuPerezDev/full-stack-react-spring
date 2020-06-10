import React, {useState} from "react";
import PropTypes from 'prop-types';
import "./Counter.css"

function Counter(){
    const [counter, setCounter] = useState(0);

    return (
        <div className="Counter">
            <CounterButton incrementMethod={(by) => setCounter(counter + by)}
                           decrementMethod={(by) => setCounter(counter - by)}/>
            <CounterButton by={5} incrementMethod={(by) => setCounter(counter + by)}
                           decrementMethod={(by) => setCounter(counter - by)}/>
            <CounterButton by={10} incrementMethod={(by) => setCounter(counter + by)}
                           decrementMethod={(by) => setCounter(counter - by)}/>
            <span className="count">{counter}</span>
            <div>
                <button className="reset" onClick={() => setCounter(0)}>Reset</button>
            </div>
        </div>
    );
}

const CounterButton = (props) => {
    return (
        <div className="Counter">
            <button onClick={() => props.incrementMethod(props.by)}>+{props.by}</button>
            <button onClick={() => props.decrementMethod(props.by)}>-{props.by}</button>
        </div>
    )
}

CounterButton.defaultProps = {
    by : 1
}

CounterButton.propTypes = {
    by : PropTypes.number
}

export default Counter;

import { useState } from "react";

const ItemCount = ({ stock, initial, onChange }) => {

    const [counter, setCounter] = useState(initial);

    const upUnit = () => {
        if (counter >= stock) return;
        setCounter(counter + 1);
        onChange(counter + 1);
    }

    const downUnit = () => {
        if (counter < 1) return;
        setCounter(counter - 1);
        onChange(counter - 1);
    }

    return <div className="botonesCantidad">
        <button onClick={downUnit}>-</button>
        <span>{counter}</span>
        <button onClick={upUnit}>+</button>
    </div>;
};

export default ItemCount;

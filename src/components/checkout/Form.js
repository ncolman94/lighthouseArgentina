import BuyWithGoogle from "./BuyWithGoogle";
import EmptyForm from "./EmptyForm";

const Form = ({ buyer, validation, setBuyer, setValidation, buyerInfo }) => {
    return <div className="checkout">
        {buyerInfo.name !== '' ?
            <BuyWithGoogle buyerInfo={buyerInfo} />
            :
            <EmptyForm buyer={buyer} validation={validation} setBuyer={setBuyer} setValidation={setValidation} />
        }
    </div>
};

export default Form;
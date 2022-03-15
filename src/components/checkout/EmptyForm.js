import { Link } from "react-router-dom";
import loginWithGoogle from "../../img/loginWithGoogle.svg";

const EmptyForm = ({ buyer, validation, setBuyer, setValidation }) => {
  const elements = [
    {
      label: "Nombre Completo",
      type: "text",
      name: "name",
    },
    {
      label: "Teléfono",
      type: "tel",
      name: "phone",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
    },
    {
      label: "Confirmar Email",
      type: "email",
      name: "confirm_email",
    },
  ];

  return (
    <div>
      <p>Por favor, complete sus datos</p>
      <form>
        {elements.map((elem) => {
          return (
            <div key={elem.name}>
              <label htmlFor={elem.name}>{elem.label}</label>
              <input
                type={elem.type}
                name={elem.name}
                id={elem.name}
                patern={elem.pattern}
                value={buyer[elem.name]}
                onChange={(e) => {
                  setBuyer({ ...buyer, [elem.name]: e.target.value });
                  setValidation({ ...validation, [elem.name]: "" });
                }}
              />
              <span className="errorTip">{validation[elem.name]}</span>
            </div>
          );
        })}
      </form>
      <p>O inicie sesión mediante</p>
      <Link to={"/login-checkout"}>
        <img src={loginWithGoogle} alt="Ingrese con Google" />
      </Link>
    </div>
  );
};

export default EmptyForm;

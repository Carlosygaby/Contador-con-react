import { useState } from "react";

const ImputsDelContador = ({ cuentaRegresiva }) => {
  const [inputValue, setImputValue] = useState(0);

  const handleChange = (event) => {
    setImputValue(event.target.value);
    console.log(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    cuentaRegresiva(Number(inputValue));
  };
  return (
    <>
      <div className="row mb-2">
        <div className="col-12"></div>
        <label className="etiqueta" htmlFor="regresivo">
          Ingrese el tiempo para cuenta regresiva
        </label>
      </div>
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <input
              id="regresivo"
              name="regresivo"
              type="time"
              value={inputValue}
              onChange={handleChange}
            />
            <button className="btn btn-secondary ml-2" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ImputsDelContador;

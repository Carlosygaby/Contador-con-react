import { useState } from "react";

const ImputsDelContador = ({ cuentaRegresiva }) => {
  const [inputValue, setImputValue] = useState(0);

  const handleChange = (event) => {
    setImputValue(event.target.value);
    console.log(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const timeParts = inputValue.split(":");
    let hours = parseInt(timeParts[0], 10) || 0;
    let minutes = parseInt(timeParts[1], 10) || 0;
    let seconds = 0;

    if (timeParts.length === 3) {
      (seconds = parseInt(timeParts[2])), 10 || 0;
    }
    const objetoTiempo = {
      horasIzquierda: Math.floor(hours / 10),
      horasDerecha: hours % 10,
      minutosIzquierda: Math.floor(minutes / 10),
      minutosDerecha: minutes % 10,
      segundosIzquierda: Math.floor(seconds / 10),
      segundosDerecha: seconds % 10,
    };
    console.log(event);
    console.log(objetoTiempo);
    cuentaRegresiva(objetoTiempo);
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
              step={1}
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

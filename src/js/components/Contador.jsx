import ImputsDelContador from "./ImputsDelContador";
import { useState, useEffect } from "react";
import ButtonsDelContador from "./ButtonsDelContador";

// objeto contador fijo en cero para poder compararlo con el contador activo
const contadorCero = {
  horasIzquierda: 0,
  horasDerecha: 0,
  minutosIzquierda: 0,
  minutosDerecha: 0,
  segundosIzquierda: 0,
  segundosDerecha: 0,
};
const Contador = () => {
  //  Estados del contador,valor del input y el incremento o decremento
  const [contador, setContador] = useState({
    horasIzquierda: 0,
    horasDerecha: 0,
    minutosIzquierda: 0,
    minutosDerecha: 0,
    segundosIzquierda: 0,
    segundosDerecha: 0,
  });
  const [inputValue, setInputValue] = useState(null);
  const [incremento, setIncremento] = useState(1);

  const objetoContador = () => {
    return contador;
  };

  //  Funcion para que funcione regresivamente el contador
  /* const cuentaRegresiva = (value) => {
    const {}
    if (value <= 0 ) {
      alert("El numero no puede ser menor a cero");
      return;
    }
    setInputValue({ ...contador, value });
  }; */
  //  Funcion para rteiniciar el contador
  const reiniciar = () => {
    setContador({
      horasIzquierda: 0,
      horasDerecha: 0,
      minutosIzquierda: 0,
      minutosDerecha: 0,
      segundosIzquierda: 0,
      segundosDerecha: 0,
    });
    setInputValue(null);
  };
  // Funcion para detener el contador
  const detener = () => {
    setIncremento(0);
  };
  // Funcion para reanudar el contador
  const reaunudar = () => {
    setIncremento(1);
  };

  // Funcion para comparar el contador con el cero
  const comparacionContador = (contador, contadorCero) => {
    if (JSON.stringify(contador) === JSON.stringify(contadorCero)) {
      return true;
    }
    return false;
  };
  if (JSON.stringify(contador) === JSON.stringify(contadorCero)) {
  }
  //  Ejecucion del intervalo del contador al montar el componente y al cambiar la dependencia incremento con su funcion limpiadora
  useEffect(() => {
    const intervaloId = setInterval(() => {
      if (incremento !== 0) {
        setContador((prevcontador) => {
          const {
            horasIzquierda,
            horasDerecha,
            minutosIzquierda,
            minutosDerecha,
            segundosIzquierda,
            segundosDerecha,
          } = prevcontador;
          if (segundosDerecha < 9) {
            return {
              ...prevcontador,
              segundosDerecha: segundosDerecha + incremento,
            };
          } else if (segundosIzquierda < 5) {
            return {
              ...prevcontador,
              segundosIzquierda: segundosIzquierda + incremento,
              segundosDerecha: 0,
            };
          } else if (minutosDerecha < 9) {
            return {
              ...prevcontador,
              minutosDerecha: minutosDerecha + incremento,
              segundosIzquierda: 0,
              segundosDerecha: 0,
            };
          } else if (minutosIzquierda < 5) {
            return {
              ...prevcontador,
              minutosIzquierda: minutosIzquierda + incremento,
              minutosDerecha: 0,
              segundosIzquierda: 0,
              segundosDerecha: 0,
            };
          } else if (horasDerecha < 9) {
            return {
              ...prevcontador,
              horasDerecha: horasDerecha + incremento,
              minutosIzquierda: 0,
              minutosDerecha: 0,
              segundosIzquierda: 0,
              segundosDerecha: 0,
            };
          } else {
            return {
              ...prevcontador,
              horasIzquierda: horasIzquierda + incremento,
              horasDerecha: 0,
              minutosIzquierda: 0,
              minutosDerecha: 0,
              segundosIzquierda: 0,
              segundosDerecha: 0,
            };
          }
        });
      }
    }, 1000);

    return () => clearInterval(intervaloId);
  }, [incremento]);

  //  Cambio de incrementar a decrementar cuando el inputValue sea igual al contador y si el contador llega a 0 vuelve a incrementar
  useEffect(() => {
    if (inputValue !== null && contador === inputValue) {
      alert("Alcanzaste el tiempo ingresado!");
      setIncremento(-1);
    }
    if (comparacionContador) {
      setIncremento(1);
      setInputValue(null);
    }
  }, [contador, inputValue]);

  //  Renderizacion del componente
  return (
    <>
      <div className="container text-center align-content-center justify-content-beetween mt-4 reloj ">
        <div className="row mb-5">
          <div className="sm-col-3 col-12">
            <h1 className="la-hora">
              <i className="fa-solid fa-clock"></i>
              {objetoContador().horasIzquierda}
              {objetoContador().horasDerecha}:
              {objetoContador().minutosIzquierda}
              {objetoContador().minutosDerecha}:
              {objetoContador().segundosIzquierda}
              {objetoContador().segundosDerecha}
            </h1>
          </div>
        </div>

        {<ImputsDelContador /* cuentaRegresiva={cuentaRegresiva} */ />}
        <ButtonsDelContador
          reiniciar={reiniciar}
          detener={detener}
          reanudar={reaunudar}
        />
      </div>
    </>
  );
};

export default Contador;

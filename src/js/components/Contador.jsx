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

  // Funcion para que funcione regresivamente el contador
  const cuentaRegresiva = (objetoTiempo) => {
    console.log("Valor recibido:", objetoTiempo);
    const esCero =
      JSON.stringify(objetoTiempo) === JSON.stringify(contadorCero);
    console.log("Es cero:", esCero);
    if (esCero) {
      alert("El numero no puede ser menor a cero");
      return;
    }
    console.log("Estableciendo inputValue a:", objetoTiempo);
    setInputValue(objetoTiempo);
  };
  //  Funcion para reiniciar el contador
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
  };

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
          // Si estamos en cuenta regresiva y llegamos a cero, detenemos
          if (
            incremento === -1 &&
            comparacionContador(prevcontador, contadorCero)
          ) {
            alert("¡Tiempo finalizado!");
            return contadorCero;
          }
          if (incremento === 1) {
            // Lógica ascendente (igual que antes)
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
          } else {
            // Lógica descendente
            if (segundosDerecha > 0) {
              return { ...prevcontador, segundosDerecha: segundosDerecha - 1 };
            } else if (segundosIzquierda > 0) {
              return {
                ...prevcontador,
                segundosIzquierda: segundosIzquierda - 1,
                segundosDerecha: 9,
              };
            } else if (minutosDerecha > 0) {
              return {
                ...prevcontador,
                minutosDerecha: minutosDerecha - 1,
                segundosIzquierda: 5,
                segundosDerecha: 9,
              };
            } else if (minutosIzquierda > 0) {
              return {
                ...prevcontador,
                minutosIzquierda: minutosIzquierda - 1,
                minutosDerecha: 9,
                segundosIzquierda: 5,
                segundosDerecha: 9,
              };
            } else if (horasDerecha > 0) {
              return {
                ...prevcontador,
                horasDerecha: horasDerecha - 1,
                minutosIzquierda: 5,
                minutosDerecha: 9,
                segundosIzquierda: 5,
                segundosDerecha: 9,
              };
            } else if (horasIzquierda > 0) {
              return {
                ...prevcontador,
                horasIzquierda: horasIzquierda - 1,
                horasDerecha: 9,
                minutosIzquierda: 5,
                minutosDerecha: 9,
                segundosIzquierda: 5,
                segundosDerecha: 9,
              };
            } else {
              return contadorCero;
            }
          }
        });
      }
    }, 1000);
    return () => clearInterval(intervaloId);
  }, [incremento]);

  //  Cambio de incrementar a decrementar cuando el inputValue sea igual al contador y si el contador llega a 0 vuelve a incrementar
  useEffect(() => {
    if (
      inputValue !== null &&
      JSON.stringify(contador) === JSON.stringify(inputValue)
    ) {
      alert("¡Alcanzaste el tiempo ingresado!");
      setIncremento(-1);
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

        {<ImputsDelContador cuentaRegresiva={cuentaRegresiva} />}
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

const ButtonsDelContador = ({ reiniciar, detener, reanudar }) => {
  return (
    <>
      <div className="row mt-5 botones-contador">
        <div className="col-4">
          <button
            type="button"
            className="btn btn-secondary fs-5"
            onClick={reiniciar}
          >
            Reinicira Contador
          </button>
        </div>
        <div className="col-4">
          <button
            type="button"
            className="btn btn-secondary fs-5"
            onClick={detener}
          >
            Detener Contador
          </button>
        </div>
        <div className="col-4">
          <button
            type="button"
            className="btn btn-secondary fs-5"
            onClick={reanudar}
          >
            Reaunudar contador
          </button>
        </div>
      </div>
    </>
  );
};

export default ButtonsDelContador;

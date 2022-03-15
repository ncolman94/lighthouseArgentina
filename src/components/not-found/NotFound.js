const NotFound = ({ from }) => {
  const msg = {
    cat: <p>No existen elementos asociados a la categoría seleccionada.</p>,
    pag: <h1>Página No encontrada.</h1>,
    prd: <h1>No existe el producto buscado.</h1>,
    ord: <h1>Aún No has realizado ninguna orden.</h1>,
    fav: <h1>Aún No has marcado ningún favorito.</h1>,
  };

  return <div>{msg[from]}</div>;
};

export default NotFound;

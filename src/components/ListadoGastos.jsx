import Gasto from './Gasto';

function ListadoGastos({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) {
    return (
        <div className="listado-gastos contenedor">
            {
                filtro ? ( //Si hay un filtro
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay Gastos en la Categoria'}</h2>
                        {gastosFiltrados.map((gasto) => ( //Traer todos los gastos filtrados
                            <Gasto
                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2>{gastos.length ? 'Gastos' : 'No hay Gastos Aun'}</h2>
                        {gastos.map((gasto) => ( //Si no, mostrar todos los gastos
                            <Gasto
                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default ListadoGastos;
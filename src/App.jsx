import { useState, useEffect } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import { generarId } from './helpers/index.js';
import IconoNuevoGasto from './img/nuevo-gasto.svg'; //Importando imagen

function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto'))?? 0); //Presupuesto
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false); //Validar presupuesto true-false
  const [modal, setModal] = useState(false); //Mostrar modal
  const [animarModal, setAnimarModal] = useState(false); //Mostrar formulario con intervalo de tiempo
  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos'))?? []); //Busco el dato en LS y convierto a arreglo con JSON.parse

  const [gastoEditar, setGastoEditar] = useState({});

  const[filtro, setFiltro]=useState(""); //Para filtrar - Almacena el id seleccionado del combo
  const[gastosFiltrados, setGastosFiltrados]=useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) { //Si el objeto gasto editar tiene algo
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  //Guardar el presupuesto en LocalStorage (key=presupuesto)
  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto?? 0); //Añadir presupuesto al LS. Si no hay nada guarda 0
  }, [presupuesto]); //Cuando presupuesto cambie

  //Guardar gastos en localstorage
  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos)?? []); //Convertir el arreglo porque LS no guarda eso
    console.log(gastos);
  }, [gastos]);

  //Filtrar gastos
  useEffect(()=>{
    if(filtro){ //Si hay algo seleccionado
      const gastosFiltrados=gastos.filter((gasto)=>{
        return gasto.categoria===filtro; //gasto.categoria = categoria del elemento, filtro = categoria seleccionada del combo
      });

      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  //Obtener el presupuesto almacenado en LocalStorage
  useEffect(()=>{
    const presupuestoLS=Number(localStorage.getItem('presupuesto'))??0; //Si no hay presupuesto su valor será 0
    if(presupuestoLS>0){
      setIsValidPresupuesto(true);
    }
  }, []); //Cuando quiero que cargue una vez

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }

  const guardarGasto = (gasto) => { //Guardar gasto desde Modal - Se llama a la función desde allá
    if (gasto.id) {
      //Editar
      const gastosActualizados = gastos.map((gastoState) => {
        return gastoState.id===gasto.id? gasto : gastoState; //Identificar id, y actualizar la información
      });

      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      //Guardar nuevo
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]); //Copia de gastos desde gasto (param)
    }

    setAnimarModal(false); //Convertir en false para que la animación se ejecute nuevamente
    setTimeout(() => {
      setModal(false); //Cerrar modal si es false
    }, 500); //Cerrar la animacion en 0,5 s
  }

  const eliminarGasto=(id)=>{
    const gastosActualizados=gastos.filter((gasto)=>{
      return gasto.id!==id; //Filtra los id distintos al ingresado
    });

    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && //Si isValidPresupuesto es true
        (<>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}  
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="icono nuevo gasto"
              onClick={handleNuevoGasto} />
          </div>
        </>)}
      {modal && ( //Si Modal es true
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  )
}

export default App

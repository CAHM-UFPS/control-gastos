import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';
import BotonCerrar from '../img/cerrar.svg';

function Modal({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}){
    const[mensaje, setMensaje]=useState("");

    const[nombre, setNombre]=useState("");
    const[cantidad, setCantidad]=useState("");
    const[categoria, setCategoria]=useState("");
    const[fecha, setFecha]=useState("");
    const[id, setId]=useState("");

    useEffect(()=>{ //Editar
        if(Object.keys(gastoEditar).length>0){ //Si el objeto gasto editar tiene algo
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
          }
    }, []);

    const handleCerrar=()=>{
        setAnimarModal(false); //Convertir en false para que la animación se ejecute nuevamente
        setGastoEditar({});
        setTimeout(()=>{
            setModal(false); //Cerrar modal si es false
        }, 500); //Cerrar la animacion en 0,5 s
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        if([nombre, cantidad, categoria].includes("")){
            setMensaje("Todos los campos son obligatorios");
            
            setTimeout(()=>{
                setMensaje("");
            }, 3000);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha}); //Llaves generan el objeto
    }

    return(
        <div className="modal">
            <div className="cerrar-modal">
                <img src={BotonCerrar} alt="cerrar modal"
                onClick={handleCerrar}/>
            </div>
            <form onSubmit={handleSubmit} className={`formulario ${animarModal?("animar"):("cerrar")}`}> {/*Cambiar clase de formulario evaluando estado de AnimarModal*/}
            {mensaje&& <Mensaje tipo="error">{mensaje}</Mensaje>}
                <legend>{gastoEditar.nombre? 'Editar Gasto': 'Nuevo Gasto'}</legend>
                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input id="nombre" type="text" placeholder="Añade el Nombre del Gasto"
                    value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad Gasto</label>
                    <input id="cantidad" type="number" placeholder="Añade la Cantidad a Gastar - Ej: 500"
                    value={cantidad} onChange={(e)=>{Number(setCantidad(e.target.value))}}/>
                </div>
                <div className='campo'>
                <label htmlFor="categoria">Categoria</label>
                    <select id="categoria" value={categoria} onChange={(e)=>{setCategoria(e.target.value)}}>
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value={gastoEditar.nombre? 'Guardar Cambios': 'Añadir Gasto'}/>
            </form>
        </div>
    )
}

export default Modal;
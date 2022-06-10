import { useEffect, useState } from "react";
import Mensaje from "./Mensaje";

function NuevoPresupuesto({presupuesto, setPresupuesto, setIsValidPresupuesto}){
    const [mensaje, setMensaje]=useState("");

    const handlePresupuesto=(e)=>{ //Validar formulario para que identifique si ingresan números 
        e.preventDefault();

        if(!presupuesto || presupuesto<0){
            setMensaje("No es un presupuesto válido");
            return; //Rompe el bloque if y no se ejecutan las otras lineas
        }
        
        setMensaje("");
        setIsValidPresupuesto(true);
    }

    return(
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label>Definir Presupuesto</label>
                    <input className="nuevo-presupuesto" type="number" placeholder="Añade tu Presupuesto"
                    value={presupuesto} onChange={(e)=>setPresupuesto(Number(e.target.value))}/>
                </div>
                <input type="submit" value="Añadir"/>
                {mensaje&&<Mensaje tipo="error">{mensaje}</Mensaje>} {/*Cuando hay children, se usan los dos cierres - && retorna algo si es true*/}
            </form>
        </div>
    )
}

export default NuevoPresupuesto;
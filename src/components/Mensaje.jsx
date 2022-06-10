import NuevoPresupuesto from "./NuevoPresupuesto";

function Mensaje({children, tipo}){
    return(
        <div className={`alerta ${tipo}`}> {/*Clase fija y clase dinámica*/}
            {children}
        </div>
    )
}

export default Mensaje;
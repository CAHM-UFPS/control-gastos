import { useEffect } from "react";
import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from "./ControlPresupuesto";

function Header({gastos, setGastos, presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto}){
    return(
        <header>
            <h1>Planificador de Gastos</h1>
            {isValidPresupuesto? //Si la condicion es true
            (<ControlPresupuesto
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />):
            (<NuevoPresupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />)} {/*Si la condicion es false */}
        </header>
    )
}

export default Header;
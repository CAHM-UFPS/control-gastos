import { useState, useEffect } from "react";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ControlPresupuesto({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}){
    
    const [disponible, setDisponible]=useState(0);
    const [gastado, setGastado]=useState(0);
    const[porcentaje, setPorcentaje]=useState(0);

    //Controlar variable gastos
    useEffect(()=>{
        const totalGastado=gastos.reduce((total, gasto)=>{ //variable acumulable y la instancia de gasto
            return Number(gasto.cantidad)+total;//Obtengo el total de todos los elementos en el arreglo y el valor inicializado de la variable 0 (gastoTotal+=total)
        }, 0);

        const totalDisponible=presupuesto-totalGastado; //Total gastado
        
        //Porcentaje - - -> (totalGastado/presupuesto)*100
        const nuevoPorcentaje=(((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2);//To fixed para dos digitos
        
        setGastado(totalGastado);
        setDisponible(totalDisponible);

        setTimeout(()=>{
            setPorcentaje(nuevoPorcentaje);
        }, 1500);
    }, [gastos]);
    
    const formatearCantidad=(cantidad)=>{ //Formato moneda
        return cantidad.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP'
        })
    }

    const handleReiniciarApp=()=>{
        const resultado=confirm("¿Está Seguro que quiere reiniciar el aplicativo?");

        if(resultado){ //Si es true
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }
    
    return(
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje>100? '#dc2626' : '#3b82f6', //Determinar el color de relleno de la grafica si el porcentaje cumple cierta condicion
                        trailColor: '#f5f5f5',
                        textColor: porcentaje>100? '#dc2626' : '#3b82f6' //Determinar el color de relleno del texto si el porcentaje cumple cierta condicion
                    })}
                    value={porcentaje}
                    text={`Gastado: ${porcentaje}%`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleReiniciarApp}>
                    Reiniciar App
                </button>
                <p>
                    <span>Presupuesto:</span>{formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible<0? 'negativo' : ''}`}> {/*Determinar la clase del parrafo según si el dinero disponible es menor a 0*/}
                    <span>Disponible:</span>{formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span>{formatearCantidad(gastado)}
                </p>    
            </div>
        </div>
    )
}

export default ControlPresupuesto;
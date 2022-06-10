//Metodos de ayuda reusables en otros proyectos

export const generarId=()=>{
    const random=Math.random().toString(36).substring(2);
    const fecha=Date.now().toString(36);

    return random+fecha;
}

export const formatearFecha=(fecha)=>{
    const fechaNueva=new Date(fecha); //Instancia fecha
    const opciones={ //Opciones formato
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones); //Retorna la fecha formateada
}
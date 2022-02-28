export const ConstruirCalendarioActual = (fechaActual) => {

    const diaInicialMes = fechaActual.clone().startOf('month').startOf('week')
    const diaFinalMes = fechaActual.clone().endOf('month').endOf('week')

    const day = diaInicialMes.clone().subtract(1, 'day');
    const calendario = []
    while (day.isBefore(diaFinalMes, 'day')) {
        calendario.push(
            Array(7)
                .fill(0)
                .map(() => day.add(1, 'day').clone())
        )
    }
    return  calendario;
}

export const ContruirCalendarioAnterior = (fechaAnterior) => {
    
    const diaInicialMes = fechaAnterior.clone().startOf('month').startOf('week')
    const diaFinalMes = fechaAnterior.clone().endOf('month').endOf('week')

    const day = diaInicialMes.clone().subtract(1, 'day');
    const calendario = []
    while (day.isBefore(diaFinalMes, 'day')) {
        calendario.push(
            Array(7)
                .fill(0)
                .map(() => day.add(1, 'day').clone())
        )
    }
    return  calendario;
}


export const ContruirCalendarioSiguiente = (fechaSiguiente) => {
    
    const diaInicialMes = fechaSiguiente.clone().startOf('month').startOf('week')
    const diaFinalMes = fechaSiguiente.clone().endOf('month').endOf('week')

    const day = diaInicialMes.clone().subtract(1, 'day');
    const calendario = []
    while (day.isBefore(diaFinalMes, 'day')) {
        calendario.push(
            Array(7)
                .fill(0)
                .map(() => day.add(1, 'day').clone())
        )
    }
    return  calendario;
}
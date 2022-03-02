import {
    ACTIVAR_CAROUSEL_TABLA_CONTRAPRESTACIONES
} from '../../../Constantes/Contraprestaciones/Contraprestaciones'

export const ActivarCarouselTablaContraprestacionesReducer = (opcion) => async (dispatch, getState) => {

    let data_tablas_contraprestaciones = getState().contraprestaciones.data_tablas_contraprestaciones

    let nuevoMostrando = false
    let esUltimo = false

    if(opcion == "retroceder"){

        let esPrimera = false
        let posSelec = 0

        await data_tablas_contraprestaciones.map((dat, pos) => {

            if(dat.mostrando == true){
                data_tablas_contraprestaciones[pos]['retroceder'] = true
                data_tablas_contraprestaciones[pos]['mostrando'] = false
                data_tablas_contraprestaciones[pos]['ocultando'] = true
                nuevoMostrando = true

                posSelec = pos
                
                if(pos == 0){
                    esPrimera = true
                }
    
            }else{
                
            }
        })

        if(esPrimera == true){
            posSelec = parseInt(data_tablas_contraprestaciones.length) - 1
            data_tablas_contraprestaciones[posSelec]['retroceder'] = true
            data_tablas_contraprestaciones[posSelec]['mostrando'] = true
            data_tablas_contraprestaciones[posSelec]['ocultando'] = false

        }else{
            posSelec = parseInt(posSelec) - 1
            data_tablas_contraprestaciones[posSelec]['retroceder'] = true
            data_tablas_contraprestaciones[posSelec]['mostrando'] = true
            data_tablas_contraprestaciones[posSelec]['ocultando'] = false
        }

    }else{
        await data_tablas_contraprestaciones.map((dat, pos) => {

            if(dat.mostrando == true){
                data_tablas_contraprestaciones[pos]['retroceder'] = false
                data_tablas_contraprestaciones[pos]['mostrando'] = false
                data_tablas_contraprestaciones[pos]['ocultando'] = true
                nuevoMostrando = true
    
                if(data_tablas_contraprestaciones.length == pos+1){
                    esUltimo = true
                }
    
            }else{
                if(nuevoMostrando == true){
                    nuevoMostrando = false
                    data_tablas_contraprestaciones[pos]['retroceder'] = false
                    data_tablas_contraprestaciones[pos]['mostrando'] = true
                    data_tablas_contraprestaciones[pos]['ocultando'] = false
                }
            }
        })
    
        if(esUltimo == true){
            data_tablas_contraprestaciones[0]['retroceder'] = false
            data_tablas_contraprestaciones[0]['mostrando'] = true
            data_tablas_contraprestaciones[0]['ocultando'] = false
        }
    }

    dispatch({
        type: ACTIVAR_CAROUSEL_TABLA_CONTRAPRESTACIONES,
        payload : data_tablas_contraprestaciones
    })

    return true

}
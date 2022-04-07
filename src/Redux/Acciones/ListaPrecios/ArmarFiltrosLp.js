import {
    OBTENER_DATA_FILTRO_LISTA_PRECIOS,
    OBTENER_UNICAMENTE_DATA_LISTA_PRECIOS,
    SELECCIONAR_TODO_FILTROS_LISTA_PRECIOS
} from '../../../Constantes/ListaPrecios/ListaPrecios'

export const ArmarFiltroLpReducer = (data) => async (dispatch, getState) => {

    const data_tabla_lista_precios = getState().listaPrecios.data_tabla_lista_precios

    let arr_filtro_categorias_lp    = []
    let arr_filtro_subcategorias_lp = []
    let arr_filtro_formato_lp       = []
    let arr_filtro_codsap_lp        = []
    let arr_filtro_materiales_lp    = []

    let encontroDataCategoria = false
    let encontroDataSubCatego = false
    let encontroDataFormato   = false
    let encontroDataCodSap    = false
    let encontroDataMaterial  = false

    // console.log("ARMAR FILTROS")

    await data_tabla_lista_precios.map(async (dat) => {

        encontroDataCategoria = false
        encontroDataSubCatego = false
        encontroDataFormato   = false
        encontroDataCodSap    = false
        encontroDataMaterial  = false
        
        // OBTENER FILTRO DATA DE CATEOGIRAS
        await arr_filtro_categorias_lp.map((arr_filtro) => {
            if(arr_filtro.data == dat.catnombre){
                encontroDataCategoria = true
                return true
            }
        })

        if(encontroDataCategoria == true){
            
        }else{
            await arr_filtro_categorias_lp.push({
                data : dat.catnombre,
                seleccionado : false
            })
        }

        // OBTENER FILTRO DATA DE SUBCATEOGIRAS
        arr_filtro_subcategorias_lp.map((arr_filtro) => {
            if(arr_filtro['data'] == dat.ltpsubcategoria){
                encontroDataSubCatego = true
            }
        })

        if(encontroDataSubCatego == false){
            arr_filtro_subcategorias_lp.push({
                data : dat.ltpsubcategoria,
                seleccionado : false
            })
        }

        // OBTENER FILTRO DATA DE FORMATO
        arr_filtro_formato_lp.map((arr_filtro) => {
            if(arr_filtro['data'] == dat.catnombre){
                encontroDataFormato = true
            }
        })

        if(encontroDataFormato == false){
            arr_filtro_formato_lp.push({
                data : dat.catnombre,
                seleccionado : false
            })
        }

        // OBTENER FILTRO DATA DE COD SAP
        arr_filtro_codsap_lp.map((arr_filtro) => {
            if(arr_filtro['data'] == dat.ltpcodigosap){
                encontroDataCodSap = true
            }
        })

        if(encontroDataCodSap == false){
            arr_filtro_codsap_lp.push({
                data : dat.ltpcodigosap,
                seleccionado : false
            })
        }

        // OBTENER FILTRO DATA DE MATERIAL
        arr_filtro_materiales_lp.map((arr_filtro) => {
            if(arr_filtro['data'] == dat.pronombre){
                encontroDataMaterial = true
            }
        })

        if(encontroDataMaterial == false){
            arr_filtro_materiales_lp.push({
                data : dat.pronombre,
                seleccionado : false
            })
        }
        

    })

    // console.log(arr_filtro_categorias_lp)
    // console.log(arr_filtro_subcategorias_lp)
    // console.log(arr_filtro_codsap_lp)

    // dispatch({
    //     type: OBTENER_DATA_FILTRO_LISTA_PRECIOS,
    //     payload : {
    //         fil_dat_customer_group    : [],
    //         fil_dat_categorias    : arr_filtro_categorias_lp,
    //         fil_dat_subcategorias : arr_filtro_subcategorias_lp,
    //         fil_dat_formato       : arr_filtro_formato_lp,
    //         fil_dat_codsap        : arr_filtro_codsap_lp,
    //         fil_dat_material      : arr_filtro_materiales_lp,
    //     }
    // })

}

export const SeleccionarCheckFiltrosReducer = (campo, posicion, valor) => (dispatch, getState) => {

    let fil_dat_customer_group = getState().listaPrecios.fil_dat_customer_group
    let fil_dat_categorias = getState().listaPrecios.fil_dat_categorias
    let fil_dat_subcategorias = getState().listaPrecios.fil_dat_subcategorias
    let fil_dat_formato = getState().listaPrecios.fil_dat_formato
    let fil_dat_codsap = getState().listaPrecios.fil_dat_codsap
    let fil_dat_material = getState().listaPrecios.fil_dat_material

    if(campo == "Customer Group"){
        fil_dat_customer_group[posicion]['seleccionado'] = valor
    }else if(campo == "categoria"){
        fil_dat_categorias[posicion]['seleccionado'] = valor
    }else if(campo == "subcategoria"){
        fil_dat_subcategorias[posicion]['seleccionado'] = valor
    }else if(campo == "formato"){
        fil_dat_formato[posicion]['seleccionado'] = valor
    }else if(campo == "codsap"){
        fil_dat_codsap[posicion]['seleccionado'] = valor
    }else if(campo == "material"){
        fil_dat_material[posicion]['seleccionado'] = valor
    }else{

    }
    
    dispatch({
        type: OBTENER_DATA_FILTRO_LISTA_PRECIOS,
        payload : {
            fil_dat_customer_group    : fil_dat_customer_group,
            fil_dat_categorias    : fil_dat_categorias,
            fil_dat_subcategorias : fil_dat_subcategorias,
            fil_dat_formato       : fil_dat_formato,
            fil_dat_codsap        : fil_dat_codsap,
            fil_dat_material      : fil_dat_material,
        }
    })

    dispatch(EstadoSeleccionarTodoFiltrosReducer())

}

export const RealizarFiltroReducer = (campo) => async (dispatch, getState) => {

    let data_tabla_lista_precios = getState().listaPrecios.data_tabla_lista_precios
    let {
        fil_dat_customer_group,
        fil_dat_categorias,
        fil_dat_subcategorias,
        fil_dat_formato,
        fil_dat_codsap,
        fil_dat_material
    } = getState().listaPrecios

    await data_tabla_lista_precios.map(async (dat, pos) => {

        data_tabla_lista_precios[pos]['mostrar'] = false

    })

    if(campo == "Customer Group"){
        await data_tabla_lista_precios.map(async (dat, pos) => {
            await fil_dat_customer_group.map((fil_dat, pos_fil) => {
                if(fil_dat.seleccionado == true){
                    if(fil_dat.data == dat.trenombre){
    
                        data_tabla_lista_precios[pos]['mostrar'] = true
                        
                    }
                }
            })
        })
    }else if(campo == "categoria"){
        await data_tabla_lista_precios.map(async (dat, pos) => {
            await fil_dat_categorias.map((fil_dat, pos_fil) => {
                if(fil_dat.seleccionado == true){
                    if(fil_dat.data == dat.catnombre){
    
                        data_tabla_lista_precios[pos]['mostrar'] = true
                        
                    }
                }
            })
        })
    }else if(campo == "subcategoria"){
        await data_tabla_lista_precios.map(async (dat, pos) => {
            await fil_dat_subcategorias.map((fil_dat, pos_fil) => {
                if(fil_dat.seleccionado == true){
                    if(fil_dat.data == dat.ltpsubcategoria){
    
                        data_tabla_lista_precios[pos]['mostrar'] = true
                        
                    }
                }
            })
        })
    }else if(campo == "formato"){
        await data_tabla_lista_precios.map(async (dat, pos) => {
            await fil_dat_formato.map((fil_dat, pos_fil) => {
                if(fil_dat.seleccionado == true){
                    if(fil_dat.data == dat.proformato){
                        data_tabla_lista_precios[pos]['mostrar'] = true   
                    }
                }
            })
        })
    }else if(campo == "codsap"){
        await data_tabla_lista_precios.map(async (dat, pos) => {
            await fil_dat_codsap.map((fil_dat, pos_fil) => {
                if(fil_dat.seleccionado == true){
                    if(fil_dat.data == dat.ltpcodigosap){
    
                        data_tabla_lista_precios[pos]['mostrar'] = true
                        
                    }
                }
            })
        })
    }else if(campo == "material"){
        await data_tabla_lista_precios.map(async (dat, pos) => {
            await fil_dat_material.map((fil_dat, pos_fil) => {
                if(fil_dat.seleccionado == true){
                    if(fil_dat.data == dat.pronombre){
    
                        data_tabla_lista_precios[pos]['mostrar'] = true
                        
                    }
                }
            })
        })
    }

    
    dispatch({
        type: OBTENER_UNICAMENTE_DATA_LISTA_PRECIOS,
        payload: data_tabla_lista_precios
    })

}

export const TerminarFiltrosReducer = (data_tabla_lista_precios) =>async (dispatch, getState) => {

    console.log("TERMINO")

    // let data_tabla_lista_precios = getState().listaPrecios.data_tabla_lista_precios
    // dispatch({
    //     type: OBTENER_UNICAMENTE_DATA_LISTA_PRECIOS,
    //     payload: data_tabla_lista_precios
    // })
}

export const EstadoSeleccionarTodoFiltrosReducer = () => async (dispatch, getState) => {

    let fil_dat_customer_group = getState().listaPrecios.fil_dat_customer_group
    let fil_dat_categorias = getState().listaPrecios.fil_dat_categorias
    let fil_dat_subcategorias = getState().listaPrecios.fil_dat_subcategorias
    let fil_dat_formato = getState().listaPrecios.fil_dat_formato
    let fil_dat_codsap = getState().listaPrecios.fil_dat_codsap
    let fil_dat_material = getState().listaPrecios.fil_dat_material


    let tiene_todo_seleccionado_customer_group = true
    let tiene_todo_seleccionado_categorias = true
    let tiene_todo_seleccionado_subcategorias = true
    let tiene_todo_seleccionado_formato  = true
    let tiene_todo_seleccionado_codsap   = true
    let tiene_todo_seleccionado_material = true

    
    await fil_dat_customer_group.map((fil_dat, pos) => {

        if(fil_dat.seleccionado == true){

        }else{
            tiene_todo_seleccionado_customer_group = false
        }

    })

    await fil_dat_categorias.map((fil_dat, pos) => {

        if(fil_dat.seleccionado == true){

        }else{
            tiene_todo_seleccionado_categorias = false
        }

    })

    await fil_dat_subcategorias.map((fil_dat, pos) => {

        if(fil_dat.seleccionado == true){

        }else{
            tiene_todo_seleccionado_subcategorias = false
        }

    })

    await fil_dat_formato.map((fil_dat, pos) => {

        if(fil_dat.seleccionado == true){

        }else{
            tiene_todo_seleccionado_formato = false
        }

    })

    await fil_dat_codsap.map((fil_dat, pos) => {

        if(fil_dat.seleccionado == true){

        }else{
            tiene_todo_seleccionado_codsap = false
        }

    })

    await fil_dat_material.map((fil_dat, pos) => {

        if(fil_dat.seleccionado == true){

        }else{
            tiene_todo_seleccionado_material = false
        }

    })

    dispatch({
        type: SELECCIONAR_TODO_FILTROS_LISTA_PRECIOS,
        payload: {
            fil_selectodo_dat_customer_group    : tiene_todo_seleccionado_customer_group,
            fil_selectodo_dat_categorias    : tiene_todo_seleccionado_categorias,
            fil_selectodo_dat_subcategorias : tiene_todo_seleccionado_subcategorias,
            fil_selectodo_dat_formato       : tiene_todo_seleccionado_formato,
            fil_selectodo_dat_codsap        : tiene_todo_seleccionado_codsap,
            fil_selectodo_dat_material      : tiene_todo_seleccionado_material,
        }
    })
}

export const SeleccionarTodoFiltrosLPReducer = (campo, valor) => async (dispatch, getState) => {

    let {
        fil_selectodo_dat_customer_group,
        fil_selectodo_dat_categorias,
        fil_selectodo_dat_subcategorias,
        fil_selectodo_dat_formato,
        fil_selectodo_dat_codsap,
        fil_selectodo_dat_material,

        fil_dat_customer_group,
        fil_dat_categorias,
        fil_dat_subcategorias,
        fil_dat_formato,
        fil_dat_codsap,
        fil_dat_material

    } = getState().listaPrecios

    if(campo == "Customer Group"){

        fil_selectodo_dat_customer_group = valor

        await fil_dat_customer_group.map((fil_dat, pos) => {
            fil_dat_customer_group[pos]['seleccionado'] = valor
        })

    }else if(campo == "categoria"){
        fil_selectodo_dat_categorias = valor

        await fil_dat_categorias.map((fil_dat, pos) => {
            fil_dat_categorias[pos]['seleccionado'] = valor
        })

    }else if(campo == "subcategoria"){
        fil_selectodo_dat_subcategorias = valor
        await fil_dat_subcategorias.map((fil_dat, pos) => {
            fil_dat_subcategorias[pos]['seleccionado'] = valor
        })
    }else if(campo == "formato"){
        fil_selectodo_dat_formato = valor
        await fil_dat_formato.map((fil_dat, pos) => {
            fil_dat_formato[pos]['seleccionado'] = valor
        })
    }else if(campo == "codsap"){
        fil_selectodo_dat_codsap = valor
        await fil_dat_codsap.map((fil_dat, pos) => {
            fil_dat_codsap[pos]['seleccionado'] = valor
        })
    }else if(campo == "material"){
        fil_selectodo_dat_material = valor
        await fil_dat_material.map((fil_dat, pos) => {
            fil_dat_material[pos]['seleccionado'] = valor
        })
    }else{
        
    }

    dispatch({
        type: SELECCIONAR_TODO_FILTROS_LISTA_PRECIOS,
        payload: {
            fil_selectodo_dat_customer_group    : fil_selectodo_dat_customer_group,
            fil_selectodo_dat_categorias    : fil_selectodo_dat_categorias,
            fil_selectodo_dat_subcategorias : fil_selectodo_dat_subcategorias,
            fil_selectodo_dat_formato       : fil_selectodo_dat_formato,
            fil_selectodo_dat_codsap        : fil_selectodo_dat_codsap,
            fil_selectodo_dat_material      : fil_selectodo_dat_material,
        }
    })



}
import React,{useEffect, useState} from 'react'
import '../../Estilos/Rutas/BancoImagenes/NuevoBancoImagenes.css'
import { 
    dataBancoImagen,
    EditandoImagenNuevoBancoImagenesReducer,
    EditarImagenNuevoBancoImagenReducer,
    AsignarSkuNuevoBancoImagenReducer,
    HabilitarAsignarSkuReducer,
    EditarFechaInicioFinalReducer
} from '../../Redux/Acciones/BancoImagen/BancoImagen';
import { useDispatch, useSelector } from "react-redux";
import FilaTablaBancoImagen from '../../Componentes/Rutas/BancoImagen/FilaTablaBancoImagen'
import IconoLupa from '../../Assets/Img/BancoImagen/lupa.png'

const NuevoBancoImagenes = () => {

    const dispatch = useDispatch()
    const { 
        prosSinImagenes, 
        prosConImagenes,
        prosInactivas,
        cargandoTablaBancoImagen,
        cargandoRegistroEditar 
    } = useSelector(({bancoImagen}) => bancoImagen);

    const cargarDatosTabla = async() => {
        await dispatch(dataBancoImagen())
    }

    useEffect(() => {
        cargarDatosTabla()
    },[])

    const [btnSeleccionado, setBtnSeleccionado] = useState("PENDIENTES")

    const [txtInputBuscar, setTxtInputBuscar] = useState("")

    return (
        <div style={{marginTop:'110px', paddingLeft:'40px', marginBottom:'80px', paddingRight:'38px'}}>

            <div 
                className='W700-S26-H35-C1E1E1E-L0015' 
                onClick={() => {
                    // console.log(prosConImagenes)
                    // console.log(prosInactivas)
                    // console.log(prosSinImagenes)
                }}
            >
                Banco de Imágen
            </div>
            
            <div className='Contenedor-Btns-Banco-Imagenes'>
                <div 
                    className={
                        btnSeleccionado == "PENDIENTES"
                        ?'Btn-Principal-Activado-Banco-Imagenes W600-S14-H19-CFFFFFF-L0015'
                        :'Btn-Principal-Desactivado-Banco-Imagenes W600-S14-H19-C1E1E1E-L0015'
                    }
                    onClick={() => {
                        setBtnSeleccionado("PENDIENTES")
                        setTxtInputBuscar("")
                    }}
                >
                    Pendientes ({prosSinImagenes.length})
                </div>
                <div 
                    className={
                        btnSeleccionado == "ACTIVOS"
                        ?'Btn-Principal-Activado-Banco-Imagenes W600-S14-H19-CFFFFFF-L0015'
                        :'Btn-Principal-Desactivado-Banco-Imagenes W600-S14-H19-C1E1E1E-L0015'
                    }
                    onClick={() => {
                        setBtnSeleccionado("ACTIVOS")
                        setTxtInputBuscar("")
                    }}
                >
                    Activos ({prosConImagenes.length})
                </div>
                <div 
                    className={
                        btnSeleccionado == "INACTIVO"
                        ?'Btn-Principal-Activado-Banco-Imagenes W600-S14-H19-CFFFFFF-L0015'
                        :'Btn-Principal-Desactivado-Banco-Imagenes W600-S14-H19-C1E1E1E-L0015'
                    }
                    onClick={() => {setBtnSeleccionado("INACTIVO")}}
                >
                    Inactivos ({prosInactivas.length})
                </div>
                <div className='Barra-Busqueda-Banco-Imagenes'>
                    <img className='Icono-Lupa-Buscar-Banco-Imagenes' src={IconoLupa} />
                    <input 
                        type="text" className="Input-Buscar-Nuevo-Banco-Imagen" 
                        placeholder='Buscar'
                        value={txtInputBuscar}
                        onChange={(e) => {
                            setTxtInputBuscar(e.target.value)
                        }}
                    />
                </div>
            </div>

            <div className='Contenedor-Tabla-Banco-Imagenes'>

                <table
                    className='Tabla-Principal-Nuevo-Banco-Imagenes'
                    style={{position:'relative', width:'100%'}}
                >

                    <thead className='W700-S14-H19-CFFFFFF-L0015'>
                        <tr>
                            <th
                                style={{
                                    paddingLeft:'10px',
                                    paddingRight:'10px'
                                }}
                            >
                                Item
                            </th>
                            <th
                                
                            >
                                <div
                                    style={{
                                        paddingLeft:'10px',
                                        paddingRight:'10px'
                                    }}
                                >
                                    SKU
                                </div>
                            </th>
                            <th>
                                Nombre
                            </th>
                            <th>
                                Categoría
                            </th>
                            <th style={{display:'flex', justifyContent: "center"}}>
                                <div style={{paddingRight:'15px'}}>Fecha de Inicio</div> - <div style={{paddingLeft:'15px'}}>Fecha de Fin</div>
                            </th>
                            {/* <th>
                                Fecha de Fin
                            </th> */}
                            <th
                                style={{
                                    paddingLeft:'15px',
                                    paddingRight:'15px'
                                }}
                            >
                                Imagen Producto
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            btnSeleccionado == "PENDIENTES"

                            ?prosSinImagenes.map((data, pos) => {
                                return(

                                    data.prosku.includes(txtInputBuscar) || data.pronombre.toLowerCase().includes(txtInputBuscar.toLowerCase())

                                    ?<FilaTablaBancoImagen
                                        data = {data}
                                        pos  = {pos}
                                        editandoFila = {() => {
                                            dispatch(EditandoImagenNuevoBancoImagenesReducer(btnSeleccionado, pos))
                                        }}
                                        editarImagen = {(imagen, sku, fechas) => {
                                            dispatch(EditarImagenNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos, fechas))
                                        }}
                                        txtInputBuscar = {txtInputBuscar}
                                    />
                                    :null
                                )
                            })
                            :btnSeleccionado == "ACTIVOS"
                                ?prosConImagenes.map((data, pos) => {
                                    return(

                                        data.prosku
                                        ?data.pronombre
                                            ?data.prosku.includes(txtInputBuscar) || data.pronombre.toLowerCase().includes(txtInputBuscar.toLowerCase())
                                                ?<FilaTablaBancoImagen
                                                    data = {data}
                                                    pos  = {pos}
                                                    habilitarAsignarSku = {() => {
                                                        dispatch(HabilitarAsignarSkuReducer(btnSeleccionado, pos))
                                                    }}
                                                    editandoFila = {() => {
                                                        dispatch(EditandoImagenNuevoBancoImagenesReducer(btnSeleccionado, pos))
                                                    }}
                                                    editarImagen = {(imagen, sku, fechas) => {
                                                        dispatch(EditarImagenNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos, fechas))
                                                    }}
                                                    txtInputBuscar = {txtInputBuscar}
                                                    mostrarNuevaFila = {pos == 2 ? true : false}
                                                    asignarSku = {(imagen, sku, fechas) => {
                                                        dispatch(AsignarSkuNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos, fechas))
                                                    }}
                                                />
                                                :null
                                            :data.prosku.includes(txtInputBuscar)
                                                ?<FilaTablaBancoImagen
                                                    data = {data}
                                                    pos  = {pos}
                                                    habilitarAsignarSku = {() => {
                                                        dispatch(HabilitarAsignarSkuReducer(btnSeleccionado, pos))
                                                    }}
                                                    editandoFila = {() => {
                                                        dispatch(EditandoImagenNuevoBancoImagenesReducer(btnSeleccionado, pos))
                                                    }}
                                                    editarImagen = {(imagen, sku, fechas) => {
                                                        dispatch(EditarImagenNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos, fechas))
                                                    }}
                                                    txtInputBuscar = {txtInputBuscar}
                                                    mostrarNuevaFila = {pos == 2 ? true : false}
                                                    asignarSku = {(imagen, sku, fechas) => {
                                                        dispatch(AsignarSkuNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos, fechas))
                                                    }}
                                                />
                                                :null
                                        :data.pronombre.toLowerCase().includes(txtInputBuscar.toLowerCase())
                                            ?<FilaTablaBancoImagen
                                                data = {data}
                                                pos  = {pos}
                                                habilitarAsignarSku = {() => {
                                                    dispatch(HabilitarAsignarSkuReducer(btnSeleccionado, pos))
                                                }}
                                                editandoFila = {() => {
                                                    dispatch(EditandoImagenNuevoBancoImagenesReducer(btnSeleccionado, pos))
                                                }}
                                                editarImagen = {(imagen, sku, fechas) => {
                                                    dispatch(EditarImagenNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos, fechas))
                                                }}
                                                txtInputBuscar = {txtInputBuscar}
                                                mostrarNuevaFila = {pos == 2 ? true : false}
                                                asignarSku = {(imagen, sku, fechas) => {
                                                    dispatch(AsignarSkuNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos, fechas))
                                                }}
                                            />
                                            :null
                                    )
                                })
                                :btnSeleccionado == "INACTIVO"
                                    ?prosInactivas.map((data, pos) => {

                                        let tieneFechaInicio = false
                                        if(data.profechainicio){
                                            tieneFechaInicio = true
                                        }

                                        return(
    
                                            data.prosku
                                            ?data.pronombre
                                                ?data.prosku.includes(txtInputBuscar) || data.pronombre.toLowerCase().includes(txtInputBuscar.toLowerCase())
                                                    ?<FilaTablaBancoImagen
                                                        data = {data}
                                                        pos  = {pos}
                                                        editandoFila = {() => {
                                                            dispatch(EditandoImagenNuevoBancoImagenesReducer(btnSeleccionado, pos))
                                                        }}
                                                        editarImagen = {(imagen, sku, fechas) => {
                                                            dispatch(EditarImagenNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos, fechas))
                                                        }}
                                                        txtInputBuscar = {txtInputBuscar}
                                                        tieneFechaInicio = {tieneFechaInicio}
                                                        EditarFechaInicioFinalReducer = {(fecha) => {
                                                            dispatch(EditarFechaInicioFinalReducer(btnSeleccionado, pos, fecha ))
                                                        }}
                                                    />
                                                    :null
                                                :data.prosku.includes(txtInputBuscar)
                                                    ?<FilaTablaBancoImagen
                                                        data = {data}
                                                        pos  = {pos}
                                                        editandoFila = {() => {
                                                            dispatch(EditandoImagenNuevoBancoImagenesReducer(btnSeleccionado, pos))
                                                        }}
                                                        editarImagen = {(imagen, sku, fechas) => {
                                                            dispatch(EditarImagenNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos, fechas))
                                                        }}
                                                        txtInputBuscar = {txtInputBuscar}
                                                        tieneFechaInicio = {tieneFechaInicio}
                                                        EditarFechaInicioFinalReducer = {(fecha) => {
                                                            dispatch(EditarFechaInicioFinalReducer(btnSeleccionado, pos, fecha ))
                                                        }}
                                                    />
                                                    :null
                                            :data.pronombre.toLowerCase().includes(txtInputBuscar.toLowerCase())
                                                ?<FilaTablaBancoImagen
                                                    data = {data}
                                                    pos  = {pos}
                                                    editandoFila = {() => {
                                                        dispatch(EditandoImagenNuevoBancoImagenesReducer(btnSeleccionado, pos))
                                                    }}
                                                    editarImagen = {(imagen, sku, fechas) => {
                                                        dispatch(EditarImagenNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos, fechas))
                                                    }}
                                                    txtInputBuscar = {txtInputBuscar}
                                                    tieneFechaInicio = {tieneFechaInicio}
                                                    EditarFechaInicioFinalReducer = {(fecha) => {
                                                        dispatch(EditarFechaInicioFinalReducer(btnSeleccionado, pos, fecha ))
                                                    }}
                                                />
                                                :null
                                        )
                                    })
                                    :null
                        }
                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default NuevoBancoImagenes
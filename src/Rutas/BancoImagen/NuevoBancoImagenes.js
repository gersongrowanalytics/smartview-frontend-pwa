import React,{useEffect, useState} from 'react'
import '../../Estilos/Rutas/BancoImagenes/NuevoBancoImagenes.css'
import IconoAgregarAzul from '../../Assets/Img/BancoImagen/agregaAzul.png'
import IconoAgregar     from '../../Assets/Img/BancoImagen/agregarNueva.png'
import IconoEditar      from '../../Assets/Img/BancoImagen/Editar.png'
import IconoSinImagen   from '../../Assets/Img/BancoImagen/SinImagen.png'
import { 
    dataBancoImagen,
    EditandoImagenNuevoBancoImagenesReducer,
    EditarImagenNuevoBancoImagenReducer
} from '../../Redux/Acciones/BancoImagen/BancoImagen';
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Spin } from 'antd';
import FilaTablaBancoImagen from '../../Componentes/Rutas/BancoImagen/FilaTablaBancoImagen'

const NuevoBancoImagenes = () => {

    const dispatch = useDispatch()
    const { 
        prosSinImagenes, 
        prosConImagenes,
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

    return (
        <div style={{marginTop:'110px', paddingLeft:'40px', marginBottom:'80px', paddingRight:'38px'}}>

            <div className='W700-S26-H35-C1E1E1E-L0015' onClick={() => console.log(prosSinImagenes)}>
                Banco de Imágen
            </div>
            
            <div className='Contenedor-Btns-Banco-Imagenes'>
                <div 
                    className={
                        btnSeleccionado == "PENDIENTES"
                        ?'Btn-Principal-Activado-Banco-Imagenes W600-S14-H19-CFFFFFF-L0015'
                        :'Btn-Principal-Desactivado-Banco-Imagenes W600-S14-H19-C1E1E1E-L0015'
                    }
                    onClick={() => {setBtnSeleccionado("PENDIENTES")}}
                >
                    Pendientes ({prosSinImagenes.length})
                </div>
                <div 
                    className={
                        btnSeleccionado == "ACTIVOS"
                        ?'Btn-Principal-Activado-Banco-Imagenes W600-S14-H19-CFFFFFF-L0015'
                        :'Btn-Principal-Desactivado-Banco-Imagenes W600-S14-H19-C1E1E1E-L0015'
                    }
                    onClick={() => {setBtnSeleccionado("ACTIVOS")}}
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
                    Inactivos (0)
                </div>
                <div className='Barra-Busqueda-Banco-Imagenes'>

                </div>
            </div>

            <div className='Contenedor-Tabla-Banco-Imagenes'>

                <table
                    className='Tabla-Principal-Nuevo-Banco-Imagenes'
                    style={{position:'relative', width:'100%'}}
                >

                    <thead className='W700-S14-H19-CFFFFFF-L0015'>
                        <tr>
                            <th>
                                Item
                            </th>
                            <th>
                                SKU
                            </th>
                            <th>
                                Nombre
                            </th>
                            <th>
                                Categoría
                            </th>
                            <th>
                                Fecha de Inicio
                            </th>
                            <th>
                                Fecha de Fin
                            </th>
                            <th>
                                Imagen Producto
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            btnSeleccionado == "PENDIENTES"

                            ?prosSinImagenes.map((data, pos) => {
                                return(
                                    <FilaTablaBancoImagen
                                        data = {data}
                                        pos  = {pos}
                                        editandoFila = {() => {
                                            dispatch(EditandoImagenNuevoBancoImagenesReducer(btnSeleccionado, pos))
                                        }}
                                        editarImagen = {(imagen, sku) => {
                                            dispatch(EditarImagenNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos))
                                        }}
                                    />
                                )
                            })
                            :btnSeleccionado == "ACTIVOS"
                                ?prosConImagenes.map((data, pos) => {
                                    return(
                                        <FilaTablaBancoImagen
                                            data = {data}
                                            pos  = {pos}
                                            editandoFila = {() => {
                                                dispatch(EditandoImagenNuevoBancoImagenesReducer(btnSeleccionado, pos))
                                            }}
                                            editarImagen = {(imagen, sku) => {
                                                dispatch(EditarImagenNuevoBancoImagenReducer(btnSeleccionado, imagen, sku, pos))
                                            }}
                                        />
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
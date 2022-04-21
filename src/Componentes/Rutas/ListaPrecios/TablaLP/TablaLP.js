import React, {useState} from 'react'
import funFormatoDecimal from '../../../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import IconoFlechaAbajo from '../../../../Assets/Img/Tabla/flechaabajo.png'
import '../../../../Estilos/Componentes/ListaPrecios/TablaLP.css'
import { 
    Tooltip,
    Modal,
    Spin
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import IconoEditarBlanco from '../../../../Assets/Img/BancoImagen/editarBlanco.png'
import IconoEditar from '../../../../Assets/Img/BancoImagen/Editar.png'
import {useDispatch} from "react-redux";
import IconoEliminar from '../../../../Assets/Img/ListaPrecios/eliminar.png'
import IconoEliminarBlanco from '../../../../Assets/Img/ListaPrecios/eliminarBlanco.png'

import IconoGuardar from '../../../../Assets/Img/ListaPrecios/guardar.png'
import IconoGuardarBlanco from '../../../../Assets/Img/ListaPrecios/guardar-blanco.png'

import {
    HabilitarEdicionLpReducer,
    CambiarValorInputLpReducer,
    EliminarLpReducer,
    EditarLpReducer
} from '../../../../Redux/Acciones/ListaPrecios/OpcionesLp'

const TablaLP = (props) => {

    const data_tabla_lista_precios = props.data_tabla_lista_precios
    const cargando_eliminar_fila_lista_precios = props.cargando_eliminar_fila_lista_precios
    const cargando_editar_fila_lista_precios = props.cargando_editar_fila_lista_precios
    const dispatch = useDispatch()

    const [mostrarModalEditar, setMostrarModalEditar] = useState(false)
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false)
    const [ltpidSeleccionado, setLtpidSeleccionado] = useState(0)
    const [posicionSeleccionado, setPosicionSeleccionado] = useState(0)

    return (
        <div>
            <table
                className='Tabla-Principal'
                style={{position:'relative', width:'100%'}}
            >


                <thead className="Wbold-S14-H19-CFFFFFF">
                    <tr>

                        <th
                            rowSpan={2}
                            style={{
                                position: "sticky",
                                left: "0",
                                zIndex: "5",
                                backgroundColor: "#1EC0ED",
                                // borderRight: "1px solid white"
                            }}
                        >
                            Item
                            <div
                                style={{
                                    position:'absolute',
                                    width:'2px',
                                    height:'100%',
                                    background:'white',
                                    right:'-2px',
                                    top:'0'
                                }}
                            >

                            </div>
                        </th>

                        <th 
                            rowSpan={2}
                            style={{
                                position: "sticky",
                                left: "42px",
                                zIndex: "5",
                                backgroundColor: "#1EC0ED",
                                // borderRight: "1px solid white"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Categoría
                                </div>
                                {/* <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div> */}
                                <div
                                    style={{
                                        position:'absolute',
                                        width:'2px',
                                        height:'100%',
                                        background:'white',
                                        right:'-2px',
                                        top:'0'
                                    }}
                                >

                                </div>
                                

                            </div>
                            {/* <div className='Contenedor-Filtro-Tabla-LP'>
                                <div>
                                    
                                </div>
                            </div> */}
                        </th>

                        <th 
                            rowSpan={2}
                            style={{
                                position: "sticky",
                                left: "117px",
                                zIndex: "2",
                                backgroundColor: "#1EC0ED",
                                textAlign: "left",
                                // borderRight: "1px solid white"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Subcategoría
                                </div>
                                {/* <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div> */}
                            </div>
                            <div
                                style={{
                                    position:'absolute',
                                    width:'2px',
                                    height:'100%',
                                    background:'white',
                                    right:'-2px',
                                    top:'0'
                                }}
                            >

                            </div>
                        </th>




                        <th 
                            rowSpan={2} 
                            style={{
                                position: "sticky",
                                left: "215px",
                                zIndex: "2",
                                backgroundColor: "#1EC0ED",
                                textAlign: "left",
                                // borderRight: "1px solid white"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Código SAP
                                </div>
                                {/* <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div> */}
                            </div>
                            <div
                                style={{
                                    position:'absolute',
                                    width:'2px',
                                    height:'100%',
                                    background:'white',
                                    right:'-2px',
                                    top:'0'
                                }}
                            >

                            </div>
                        </th>
                        <th 
                            rowSpan={2}
                            style={{
                                position: "sticky",
                                left: "304px",
                                zIndex: "2",
                                backgroundColor: "#1EC0ED",
                                textAlign: "left",
                                // borderRight: "1px solid white"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                                style={{
                                    width: "150px"
                                }}
                            >
                                <div>
                                    EAN
                                </div>
                                {/* <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div> */}
                            </div>
                            <div
                                style={{
                                    position:'absolute',
                                    width:'2px',
                                    height:'100%',
                                    background:'white',
                                    right:'-2px',
                                    top:'0'
                                }}
                            >

                            </div>
                        </th>
                        
                        <th 
                            rowSpan={2}
                            style={
                                data_tabla_lista_precios.length > 0
                                ?{
                                    position: "sticky",
                                    left: "466px",
                                    zIndex: "2",
                                    backgroundColor: "#1EC0ED",
                                    textAlign: "left",
                                    // borderRight: "1px solid white"
                                }
                                :{

                                }
                            }
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                                style={{
                                    width:'285px'
                                }}
                            >
                                <div>
                                    Material
                                </div>
                                {/* <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div> */}
                            </div>

                            <div
                                style={{
                                    position:'absolute',
                                    width:'2px',
                                    height:'100%',
                                    background:'white',
                                    right:'-2px',
                                    top:'0'
                                }}
                            >

                            </div>
                        </th>
                        {/* <th rowSpan={2}>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Descripción de producto
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th> */}
                        <th 
                            rowSpan={2}
                            style={{
                                borderRight: "1px solid white",
                                paddingLeft: "18px"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Unidad de<br/>
                                    Venta
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th 
                            rowSpan={2}
                            style={{
                                borderRight: "1px solid white"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Precio Lista<br/>
                                    sin IGV
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th 
                            rowSpan={2}
                            style={{
                                borderRight: "1px solid white"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    % Alza
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th 
                            rowSpan={2}
                            style={{
                                borderRight: "1px solid white"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    SD/TPR
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th 
                            rowSpan={2}
                            style={{
                                borderRight: "1px solid white"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Precio Lista<br/>
                                    con IGV
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th 
                            colspan="4" 
                            style={{
                                background:'#004291', paddingTop:'5px', paddingBottom:'5px',
                                borderRight:'2px solid white',
                                borderLeft:'2px solid white',
                                height: "0px"
                            }}

                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                MAYORISTA
                            </div>
                        </th>
                        <th 
                            colspan="4"
                            style={{
                                background:'#0057BE', paddingTop:'5px', paddingBottom:'5px',
                                borderRight:'2px solid white',
                                borderLeft:'2px solid white',
                                height: "0px"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                MINORISTA
                            </div>
                        </th>
                        <th 
                            colspan="4" style={{background:'#004291', height: "0px"}}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                BODEGA
                            </div>
                        </th>
                    </tr>
                    <tr>                                
                        <th
                            style={{
                                background:'#1E7DED',
                                borderLeft: "2px solid white"
                            }}
                        >

                            <div
                                className='Contenedor-Cabecera-Tabla'
                                style={{background:'#1E7DED'}}
                            >
                                <div>
                                    MF Ruta
                                    {/* Mayorista */}
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th
                            style={{background:'#1E7DED'}}
                        >

                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Reventa
                                    {/* Mayorista */}
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th
                            style={{background:'#1E7DED'}}
                        >

                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Margen
                                    {/* Mayorista */}
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th
                            style={{background:'#1E7DED'}}
                        >

                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Marcaje
                                    {/* Mayorista */}
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th
                            style={{
                                background:'#1E7DED',
                                borderLeft: "1px solid white"
                            }}
                        >

                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    MF Ruta
                                    {/* Minorista */}
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th
                            style={{background:'#1E7DED'}}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Reventa
                                    {/* Minorista */}
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th
                            style={{background:'#1E7DED'}}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Margen
                                    {/* Minorista */}
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th
                            style={{background:'#1E7DED'}}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Marcaje
                                    {/* Minorista */}
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>

                        {/* BODEGA */}

                        <th
                            style={{
                                background:'#1E7DED',
                                borderLeft: "2px solid white"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    MF Ruta
                                    {/* Horizontal */}
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>

                        <th
                            style={{background:'#1E7DED'}}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Reventa
                                    {/* Bodega */}
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>

                        <th
                            style={{background:'#1E7DED'}}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Margen
                                    {/* Bodega */}
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>

                        <th
                            style={{background:'#1E7DED'}}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    PVP
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                    </tr>


                </thead>
                
                

                
                <tbody>
                    {
                        data_tabla_lista_precios.map((dat, pos) => {
                            return(
                                dat.mostrar == true
                                ?<tr 
                                    className={'W600-S12-H16-C1E1E1E Contenedor-Fila-TablaLp'}
                                >                                    

                                    <td 
                                        className={
                                            dat.editando == true
                                            ?'W600-S12-H16-C1E1E1E'
                                            :'W600-S12-H16-C1E1E1E Contenedor-Opciones-TablaLp'
                                        }
                                    >

                                        <div 
                                            // className='Contenedor-Opciones-TablaLp'
                                            style={{
                                                placeContent: "center",
                                                position:'absolute',
                                                left:'0',
                                                display:'flex',
                                                top:'0px'
                                            }}
                                        >
                                            <Tooltip
                                                placement="bottom" 
                                                title={"Editar"}
                                            >
                                                <div
                                                    className='Contenedor-Icono-Opciones-Nuevo-Banco-Imagenes'
                                                    style={{
                                                        width: "24px",
                                                        height: "24px",
                                                        marginTop: "2px",
                                                    }}
                                                >
                                                    <img 
                                                        className='Icon-Editar-Nuevo-Banco-Imagenes'
                                                        src={IconoEditar}
                                                        onClick={() => {
                                                            // editandoFila()
                                                            // refInputImagen.current.click()
                                                            dispatch(HabilitarEdicionLpReducer(pos))
                                                        }}
                                                        style={{
                                                            width:'13px',
                                                            position: "absolute",
                                                            left: "5px",
                                                            top: "6px",
                                                        }}
                                                    />

                                                    <img 
                                                        className='Icon-Editar-Blanco-Nuevo-Banco-Imagenes'
                                                        src={IconoEditarBlanco}
                                                        onClick={() => {
                                                            // editandoFila()
                                                            // refInputImagen.current.click()
                                                            dispatch(HabilitarEdicionLpReducer(pos))
                                                        }}
                                                        style={{
                                                            width:'13px',
                                                            position: "absolute",
                                                            left: "5px",
                                                            top: "6px",
                                                        }}
                                                        

                                                    />
                                                </div>
                                            </Tooltip>
                                        </div>

                                    </td>

                                    <td
                                        className={
                                            dat.editando == true
                                            ?'W600-S12-H16-C1E1E1E'
                                            :'W600-S12-H16-C1E1E1E Contenedor-Opciones-TablaLp'
                                        }
                                        style={{
                                            position: "sticky",
                                            left: "42px",
                                            zIndex: "0",
                                            backgroundColor: "white",
                                            top: "48px",
                                            textAlign: "left"
                                        }}
                                    >

                                        <div 
                                            // className='Contenedor-Opciones-TablaLp'
                                            style={{
                                                // placeContent: "center",
                                                position:'absolute',
                                                left:'0',
                                                display:'flex',
                                                top:'0px',
                                                marginLeft: "-12px",
                                            }}
                                        >
                                            
                                            <Tooltip
                                                placement="bottom" 
                                                title={"Eliminar"}
                                            >
                                                <div
                                                    className='Contenedor-Icono-Opciones-Nuevo-Banco-Imagenes'
                                                    style={{
                                                        width: "24px",
                                                        height: "24px",
                                                        marginTop: "2px",
                                                    }}
                                                >
                                                    <img 
                                                        className='Icon-Editar-Nuevo-Banco-Imagenes'
                                                        src={IconoEliminar}
                                                        onClick={() => {
                                                            // dispatch(EliminarLpReducer())
                                                            setMostrarModalEliminar(true)
                                                            setLtpidSeleccionado(dat.ltpid)
                                                        }}
                                                        style={{
                                                            width:'12px',
                                                            top:'5px',
                                                            left: "6px"
                                                        }}
                                                    />

                                                    <img 
                                                        className='Icon-Editar-Blanco-Nuevo-Banco-Imagenes'
                                                        src={IconoEliminarBlanco}
                                                        onClick={() => {
                                                            // dispatch(EliminarLpReducer())
                                                            setMostrarModalEliminar(true)
                                                            setLtpidSeleccionado(dat.ltpid)
                                                        }}
                                                        style={{
                                                            width:'12px',
                                                            top:'5px'
                                                        }}
                                                    />

                                                </div>
                                            </Tooltip>
                                            <Tooltip
                                                placement="bottom" 
                                                title={"Guardar"}
                                            >
                                                <div
                                                    className='Contenedor-Icono-Opciones-Nuevo-Banco-Imagenes'
                                                    style={{
                                                        position:'relative',
                                                        width: "24px",
                                                        height: "24px",
                                                        marginTop: "2px",
                                                        marginLeft:'1px'
                                                    }}
                                                >
                                                    <img 
                                                        className='Icon-Editar-Nuevo-Banco-Imagenes'
                                                        src={IconoGuardar}
                                                        onClick={() => {
                                                            setMostrarModalEditar(true)
                                                            setPosicionSeleccionado(pos)
                                                        }}
                                                        style={{
                                                            width:'26px',
                                                            position:'absolute',
                                                            left: "-1px",
                                                            top: "-1px"
                                                        }}
                                                    />

                                                    <img 
                                                        className='Icon-Editar-Blanco-Nuevo-Banco-Imagenes'
                                                        src={IconoGuardarBlanco}
                                                        onClick={() => {
                                                            setMostrarModalEditar(true)
                                                            setPosicionSeleccionado(pos)
                                                        }}
                                                        style={{
                                                            width:'16px',
                                                            position:'absolute',
                                                            right:'20px',
                                                            left: "4px",
                                                            top: "4px"
                                                        }}
                                                    />

                                                </div>
                                            </Tooltip>
                                        </div>  

                                    </td>




                                    {
                                        dat.editando == true
                                        ?null
                                        :<td
                                            // className='W600-S12-H16-C1E1E1E Contenedor-Item-TablaLp'
                                            className={
                                                dat.ltpduplicadocomplejo == true
                                                ?'W600-S12-H16-CE41A37 Contenedor-Item-TablaLp'
                                                :'W600-S12-H16-C1E1E1E Contenedor-Item-TablaLp'
                                            }
                                        >

                                            {pos+1}
                                            <div
                                                style={{
                                                    position:'absolute',
                                                    width:'2px',
                                                    height:'100%',
                                                    background:'white',
                                                    right:'-2px',
                                                    top:'0'
                                                }}
                                            >

                                            </div>

                                        </td>
                                    }

                                    {
                                        dat.editando == true
                                        ?null
                                        :<td 
                                            // className='W600-S12-H16-C1E1E1E Contenedor-Categoria-TablaLp'
                                            className={
                                                dat.ltpduplicadocomplejo == true
                                                ?'W600-S12-H16-CE41A37 Contenedor-Categoria-TablaLp'
                                                :'W600-S12-H16-C1E1E1E Contenedor-Categoria-TablaLp'
                                            }
                                            style={{
                                                position: "sticky",
                                                left: "42px",
                                                zIndex: "0",
                                                backgroundColor: "white",
                                                top: "48px",
                                                textAlign: "left"
                                            }}
                                        >
                                            {dat.catnombre}
                                            <div
                                                style={{
                                                    position:'absolute',
                                                    width:'2px',
                                                    height:'100%',
                                                    background:'white',
                                                    right:'-2px',
                                                    top:'0'
                                                }}
                                            >

                                            </div>
                                        </td>
                                    }

                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                        style={{
                                            position: "sticky",
                                            left: "117px",
                                            zIndex: "0",
                                            backgroundColor: "white",
                                            top: "48px",
                                            textAlign: "left"
                                        }}
                                    >
                                        {dat.ltpsubcategoria}
                                        <div
                                            style={{
                                                position:'absolute',
                                                width:'2px',
                                                height:'100%',
                                                background:'white',
                                                right:'-2px',
                                                top:'0'
                                            }}
                                        >

                                        </div>
                                    </td>

                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                        style={{
                                            position: "sticky",
                                            left: "215px",
                                            zIndex: "0",
                                            backgroundColor: "white",
                                            top: "48px",
                                            textAlign: "left"
                                        }}
                                    >
                                        {dat.ltpcodigosap}
                                        <div
                                            style={{
                                                position:'absolute',
                                                width:'2px',
                                                height:'100%',
                                                background:'white',
                                                right:'-2px',
                                                top:'0'
                                            }}
                                        >

                                        </div>
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                        style={{
                                            position: "sticky",
                                            left: "304px",
                                            zIndex: "0",
                                            backgroundColor: "white",
                                            top: "48px",
                                            textAlign: "left"
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "150px"
                                            }}
                                        >
                                            {dat.ltpean}
                                        </div>
                                        <div
                                            style={{
                                                position:'absolute',
                                                width:'2px',
                                                height:'100%',
                                                background:'white',
                                                right:'-2px',
                                                top:'0'
                                            }}
                                        >

                                        </div>
                                    </td>
                                    {/* <td className='W600-S12-H16-C1E1E1E'>{dat.ltpcodigosap}</td> */}
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                        style={{
                                            position: "sticky",
                                            left: "466px",
                                            zIndex: "0",
                                            backgroundColor: "white",
                                            top: "48px",
                                            textAlign: "left"
                                        }}
                                    >
                                        <div
                                            style={{
                                                width:'310px'
                                            }}
                                        >
                                            {
                                                dat.editando == true
                                                ?<div
                                                    className='W600-S12-H16-CC4C4C4'
                                                >
                                                    <input 
                                                        className='Input-Editando-TablaLp'
                                                        value={dat.pronombreeditando}
                                                        onChange={(e) => {
                                                            dispatch(CambiarValorInputLpReducer(pos, e.target.value))
                                                        }}
                                                    />
                                                </div>
                                                :dat.ltpeditandonombre == true
                                                    ?dat.ltpdescripcionproducto
                                                    :dat.pronombre
                                            }
                                        </div>
                                        <div
                                            style={{
                                                position:'absolute',
                                                width:'2px',
                                                height:'100%',
                                                background:'white',
                                                right:'-2px',
                                                top:'0'
                                            }}
                                        >

                                        </div>
                                    </td>
                                    {/* <td className='W600-S12-H16-C1E1E1E'>{dat.pronombre}</td> */}

                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >{dat.ltpunidadventa}</td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltppreciolistasinigv, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        {
                                            funFormatoDecimal(dat.ltpalza * 100, 2)
                                        }%
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        {
                                            funFormatoDecimal(dat.ltpsdtpr * 100, 2)
                                        }%
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltppreciolistaconigv, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        {
                                            funFormatoDecimal(dat.ltpmfrutamayorista * 100, 2)
                                        }%
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltpreventamayorista, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        {
                                            funFormatoDecimal(dat.ltpmargenmayorista * 100, 2)
                                        }%
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltpmarcajemayorista, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    
                                    {/* MINORISTA */}
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        {
                                            funFormatoDecimal(dat.ltpmfrutaminorista * 100, 2)
                                        }%
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltpreventaminorista, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        {
                                            funFormatoDecimal(dat.ltpmargenminorista * 100, 2)
                                        }%
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltpmarcajeminorista, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>

                                    {/* BODEGA */}
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        {
                                            funFormatoDecimal(dat.ltpmfrutahorizontal * 100, 2)
                                        }%
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltpreventabodega, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        {
                                            funFormatoDecimal(dat.ltpmargenbodega * 100, 2)
                                        }%
                                    </td>
                                    <td 
                                        className={
                                            dat.ltpduplicadocomplejo == true
                                            ?'W600-S12-H16-CE41A37'
                                            :'W600-S12-H16-C1E1E1E'
                                        }
                                    >
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltppvp, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>

                                </tr>
                                :null
                            )
                        })
                    }
                </tbody>
                
            </table>

            <Modal
                visible={mostrarModalEliminar}
                footer={null}
                centered
                closeIcon={<div></div>}
                width = "310px"
                height = "139px"
                className='Modal-Eliminar-Lp-TablaLp'
            >
                <div>
                    <div 
                        className='W600-S14-H19-C1E1E1E-L0015'
                        style={{
                            textAlignLast: "center",
                            marginBottom:'10px'
                        }}
                    >
                        Eliminar Fila
                    </div>
                    <div 
                        className='W400-S12-H16-C1E1E1E-L0015'
                        style={{
                            textAlignLast: "center"
                        }}
                    >
                        ¿Está seguro que desea eliminar la Fila?
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop:'20px'
                        }}
                    >
                        <Spin
                            spinning={cargando_eliminar_fila_lista_precios}
                            indicator={
                                <LoadingOutlined style={{ fontSize: 18 }} spin />
                            }
                        >
                            <div
                                style={{
                                    width: "66px",
                                    height: "24px",
                                    background: "#3646C4",
                                    border: "1px solid #3646C3",
                                    boxSizing: "border-box",
                                    borderRadius: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight:'10px',
                                    cursor:'pointer'
                                }}
                                className="W700-S12-H16-CFFFFFF-L0015"
                                onClick={async () => {
                                    await dispatch(EliminarLpReducer(ltpidSeleccionado))
                                    setMostrarModalEliminar(false)
                                }}
                            >
                                Aceptar
                            </div>
                        </Spin>
                        <div
                            className='W600-S12-H16-C1E1E1E-L0015'
                            style={{
                                width: "67px",
                                height: "24px",
                                border: "1px solid #1E1E1E",
                                boxSizing: "border-box",
                                borderRadius: "14px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor:'pointer'
                            }}
                            onClick={() => {
                                setMostrarModalEliminar(false)
                            }}
                        >
                            Cancelar
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                visible={mostrarModalEditar}
                footer={null}
                centered
                closeIcon={<div></div>}
                width = "310px"
                height = "139px"
                className='Modal-Eliminar-Lp-TablaLp'
            >
                <div>
                    <div 
                        className='W600-S14-H19-C1E1E1E-L0015'
                        style={{
                            textAlignLast: "center",
                            marginBottom:'10px'
                        }}
                    >
                        Editar Fila
                    </div>
                    <div 
                        className='W400-S12-H16-C1E1E1E-L0015'
                        style={{
                            textAlignLast: "center"
                        }}
                    >
                        ¿Está seguro que desea editar la Fila?
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop:'20px'
                        }}
                    >
                        <Spin
                            spinning={cargando_editar_fila_lista_precios}
                            indicator={
                                <LoadingOutlined style={{ fontSize: 18 }} spin />
                            }
                        >
                            <div
                                style={{
                                    width: "66px",
                                    height: "24px",
                                    background: "#3646C4",
                                    border: "1px solid #3646C3",
                                    boxSizing: "border-box",
                                    borderRadius: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight:'10px',
                                    cursor:'pointer'
                                }}
                                className="W700-S12-H16-CFFFFFF-L0015"
                                onClick={async () => {
                                    await dispatch(EditarLpReducer(posicionSeleccionado))
                                    setMostrarModalEditar(false)
                                }}
                            >
                                Aceptar
                            </div>
                        </Spin>
                        <div
                            className='W600-S12-H16-C1E1E1E-L0015'
                            style={{
                                width: "67px",
                                height: "24px",
                                border: "1px solid #1E1E1E",
                                boxSizing: "border-box",
                                borderRadius: "14px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor:'pointer'
                            }}
                            onClick={() => {
                                setMostrarModalEditar(false)
                            }}
                        >
                            Cancelar
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default TablaLP
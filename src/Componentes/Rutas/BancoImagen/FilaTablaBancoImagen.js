import React, {useEffect, useRef, useState} from 'react'
import { 
    Tooltip, Spin,
    Input,
    DatePicker
} from 'antd';
import IconoAgregarAzul from '../../../Assets/Img/BancoImagen/agregaAzul.png'
import IconoAgregar     from '../../../Assets/Img/BancoImagen/agregarNueva.png'
import IconoEditar      from '../../../Assets/Img/BancoImagen/Editar.png'
import IconoSinImagen   from '../../../Assets/Img/BancoImagen/SinImagen.png'

import IconoEditarBlanco   from '../../../Assets/Img/BancoImagen/editarBlanco.png'
import IconoAgregarBlanco   from '../../../Assets/Img/BancoImagen/plusBlanco.png'
import moment from 'moment';

import {
    CheckCircleOutlined,
    LoadingOutlined
} from '@ant-design/icons';


const FilaTablaBancoImagen = (props) => {

    const data = props.data
    const pos = props.pos
    const editandoFila   = props.editandoFila
    const editarImagen   = props.editarImagen
    const habilitarAsignarSku     = props.habilitarAsignarSku
    const asignarSku     = props.asignarSku
    const txtInputBuscar = props.txtInputBuscar
    const mostrarNuevaFila = props.mostrarNuevaFila
    const tieneFechaInicio = props.tieneFechaInicio
    const EditarFechaInicioFinalReducer = props.EditarFechaInicioFinalReducer

    const refInputImagen = useRef(null)
    const refInputImagenNuevoSku = useRef(null)

    const [seleccionarImg, setSeleccionarImg] = useState("")
    const [seleccionarImgNuevoSku, setSeleccionarImgNuevoSku] = useState("")
    const [fechasVencimiento, setFechasVencimiento] = useState([])
    const [errorInputDate, setErrorInputDate] = useState(false)

    return (
        <>
            <input 
                type={"file"}
                style={{display:'none'}}
                ref={refInputImagen}
                onChange={(e) => {
                    let reader = new FileReader()
                    reader.onload = function(){
                        
                        // console.log(reader.result)
                        setSeleccionarImg(reader.result)
                        // dispatch(OpcionesImagenPrevImagenReducer(reader.result, row.index, row.original.proimagen))
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }} 
            />

            <input 
                type={"file"}
                style={{display:'none'}}
                ref={refInputImagenNuevoSku}
                onChange={(e) => {
                    let reader = new FileReader()
                    reader.onload = function(){
                        
                        // console.log(reader.result)
                        setSeleccionarImgNuevoSku(reader.result)
                        // dispatch(OpcionesImagenPrevImagenReducer(reader.result, row.index, row.original.proimagen))
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }} 
            />
            
            <tr 
                className={
                    data.desapareciendo == true
                    ?'W600-S12-H16-C1E1E1E-L0015 Fila-Desaparecer-Nuevo-Banco-Imagenes'
                    :'W600-S12-H16-C1E1E1E-L0015'
                }

                style={
                    data.agregarsku == true
                    ?{
                        background: "#FFFFFF",
                        boxSizing: "border-box",
                        boxShadow: "0px 4px 4px #E5E5E5",
                        borderTop: "1px solid #E5E5E5",
                        borderBottom: "1px solid #E5E5E5",
                    }
                    :{
                        position:'relative',
                    }
                }
                onClick={() => {
                    console.log(data)
                }}
            >
                <td
                    onClick={() => {
                        
                    }}
                >
                    {pos+1}
                    {
                        data.cargandoEdicion == true
                        ?<div
                            style={{
                                width:'100%',
                                height:'100%',
                                position:'absolute',
                                left:'0',
                                top:'0',
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                cursor:'not-allowed'
                            }}
                        >
                            <Spin
                                spinning={data.cargandoEdicion}
                                style={{marginTop:'14px'}}
                                indicator={<LoadingOutlined style={{ color: "#004FB8" }} spin />}
                            >
                                
                            </Spin>

                        </div>
                        :null
                    }
                </td>
                <td>
                    {data.prosku}
                </td>
                <td
                    style={{
                        textAlign: "left"
                    }}
                >
                    {data.pronombre}
                </td>
                <td>
                    {data.catnombre}
                </td>
                <td>

                <Input.Group compact>
                    <DatePicker.RangePicker 
                        style={
                            errorInputDate == true
                            ?{ width: '70%', border:'1px solid red' }
                            :{ width: '70%' }
                        } 
                        format={'DD/MM/YYYY'}
                        placeholder={['DD/MM/YYYY', 'DD/MM/YYYY']}
                        onChange={(e, fecha) => {
                            setFechasVencimiento(fecha)
                            EditarFechaInicioFinalReducer(fecha)
                            // console.log(fecha)
                        }}
                        // defaultValue={[moment('10/02/2015', 'DD/MM/YYYY'), moment('15/03/2016', 'DD/MM/YYYY')]}
                        defaultValue={
                            // data.profechainicio
                            tieneFechaInicio == true
                            ?[moment(data.profechainicio, 'YYYY/MM/DD'), moment(data.profechafinal, 'YYYY-MM-DD')]
                            :[moment("2022/01/01", 'YYYY/MM/DD'), moment("9999/12/01", 'YYYY/MM/DD')]
                        }
                        value={
                            tieneFechaInicio == true
                            ?[moment(data.profechainicio, 'YYYY/MM/DD'), moment(data.profechafinal, 'YYYY-MM-DD')]
                            :[moment("2022/01/01", 'YYYY/MM/DD'), moment("9999/12/01", 'YYYY/MM/DD')]
                        }
                    />
                </Input.Group>

                </td>
                {/* <td>
                    {"-"}
                </td> */}


                {
                    data.editando == true && seleccionarImg != ""
                    ?<td
                        style={{
                            width: "58px",
                            height: "45px"
                        }}
                    >
                        <div className='Contenedor-Icons-Editando-Nuevo-Banco-Imagenes'>
                            
                            <img 
                                src={seleccionarImg} 
                                className="Img-Preload-Nuevo-Banco-Imagenes"
                            />

                            <Tooltip
                                placement="bottom" 
                                title={"Guardar"}
                            >
                                <div 
                                    className='Contenedor-Check-Icon-Preload-Nuevo-Banco-Imagen'
                                    onClick={() => {
                                        
                                        if(fechasVencimiento.length == 0){
                                            
                                            if(data.profechainicio){
                                                setErrorInputDate(false)
                                                editarImagen(seleccionarImg, data.prosku, fechasVencimiento)
                                            }else{
                                                setErrorInputDate(true)
                                            }
                                        }else{
                                            setErrorInputDate(false)
                                            editarImagen(seleccionarImg, data.prosku, fechasVencimiento)
                                        }

                                    }}
                                >
                                    <CheckCircleOutlined 
                                        className='Check-Icon-Preload-Nuevo-Banco-Imagen'
                                    />
                                </div>
                            </Tooltip>
                        </div>
                        
                    </td>
                    :<td
                        style={{
                            width: "58px",
                            height: "45px"
                        }}
                    >
                        <div className='Contenedor-Img-Nuevo-Banco-Imagenes'>
                            <img 
                                className='Img-Nuevo-Banco-Imagenes'
                                src={
                                    data.proimagen == "/"
                                    ?IconoSinImagen
                                    :data.proimagen
                                }
                            />
                        </div>
                        <div className='Contenedor-Icons-Nuevo-Banco-Imagenes'>
                            <Tooltip
                                placement="bottom" 
                                title={"Editar"}
                            >
                                <div
                                    className='Contenedor-Icono-Opciones-Nuevo-Banco-Imagenes'
                                >
                                    <img 
                                        className='Icon-Editar-Nuevo-Banco-Imagenes'
                                        src={IconoEditar}
                                        onClick={() => {
                                            editandoFila()
                                            refInputImagen.current.click()
                                        }}
                                    />

                                    <img 
                                        className='Icon-Editar-Blanco-Nuevo-Banco-Imagenes'
                                        src={IconoEditarBlanco}
                                        onClick={() => {
                                            editandoFila()
                                            refInputImagen.current.click()
                                        }}
                                        

                                    />
                                </div>
                            </Tooltip>
                            <Tooltip
                                placement="bottom" 
                                title={"Agregar nuevo SKU"}
                            >
                                <div
                                    className='Contenedor-Icono-Opciones-Nuevo-Banco-Imagenes'
                                >
                                    <img 
                                        className='Icon-Editar-Nuevo-Banco-Imagenes'
                                        src={IconoAgregar}
                                        onClick={() => {
                                            habilitarAsignarSku()
                                        }}
                                    />

                                    <img 
                                        className='Icon-Editar-Blanco-Nuevo-Banco-Imagenes'
                                        src={IconoAgregarBlanco}
                                        onClick={() => {
                                            habilitarAsignarSku()
                                        }}
                                    />

                                </div>
                            </Tooltip>
                        </div>
                    </td>
                }
            </tr>

            {
                // mostrarNuevaFila == true
                data.agregarsku == true
                ?<tr 
                    className={
                        data.desapareciendo == true
                        ?'W600-S12-H16-C1E1E1E-L0015 Fila-Desaparecer-Nuevo-Banco-Imagenes'
                        :'W600-S12-H16-C1E1E1E-L0015'
                    }

                    style={{position:'relative'}}
                >
                    <td
                        onClick={() => {
                            
                        }}
                    >
                        {pos+1}
                        {
                            data.cargandoEdicion == true
                            ?<div
                                style={{
                                    width:'100%',
                                    height:'100%',
                                    position:'absolute',
                                    left:'0',
                                    top:'0',
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    cursor:'not-allowed'
                                }}
                            >
                                <Spin
                                    spinning={data.cargandoEdicion}
                                    style={{marginTop:'14px'}}
                                    indicator={<LoadingOutlined style={{ color: "#004FB8" }} spin />}
                                >
                                    
                                </Spin>

                            </div>
                            :null
                        }
                    </td>
                    <td>
                        {data.prosku}
                    </td>
                    <td
                        style={{
                            textAlign: "left"
                        }}
                    >
                        {data.pronombre}
                    </td>
                    <td>
                        {data.catnombre}
                    </td>
                    <td>

                    <Input.Group compact>
                        <DatePicker.RangePicker 
                            style={
                                errorInputDate == true
                                ?{ width: '70%', border:'1px solid red' }
                                :{ width: '70%' }
                            } 
                            format={'DD/MM/YYYY'}
                            placeholder={['DD/MM/YYYY', 'DD/MM/YYYY']}
                            onChange={(e, fecha) => {
                                setFechasVencimiento(fecha)
                            }}
                            // defaultValue={[moment('10/02/2015', 'DD/MM/YYYY'), moment('15/03/2016', 'DD/MM/YYYY')]}
                            defaultValue={
                                data.profechainicio
                                ?[]
                                :[]
                            }
                        />
                    </Input.Group>

                    </td>

                    {
                        // data.editando == true && seleccionarImg != ""
                        true == true
                        ?<td
                            style={{
                                width: "58px",
                                height: "45px"
                            }}
                        >
                            <div className='Contenedor-Icons-Editando-Nuevo-Banco-Imagenes'>
                                
                                <img 
                                    src={
                                        seleccionarImgNuevoSku == ""
                                        ?IconoSinImagen
                                        :seleccionarImgNuevoSku
                                    } 
                                    // className="Img-Preload-Nuevo-Banco-Imagenes"
                                    className={
                                        seleccionarImgNuevoSku == ""
                                        ?"Img-Nuevo-Banco-Imagenes"
                                        :"Img-Preload-Nuevo-Banco-Imagenes"
                                    }
                                    style={
                                        seleccionarImgNuevoSku == ""
                                        ?{
                                            marginTop: "15px",
                                            cursor:'pointer'
                                        }
                                        :{
                                            cursor:'pointer'
                                        }
                                    }
                                    onClick={() => {
                                        refInputImagenNuevoSku.current.click()
                                    }}
                                />

                                <Tooltip
                                    placement="bottom" 
                                    title={"Guardar"}
                                >
                                    <div 
                                        className='Contenedor-Check-Icon-Preload-Nuevo-Banco-Imagen'
                                        onClick={() => {
                                            
                                            if(fechasVencimiento.length == 0){
                                                
                                                if(data.profechainicio){
                                                    setErrorInputDate(false)
                                                    asignarSku(seleccionarImgNuevoSku, data.prosku, fechasVencimiento)
                                                }else{
                                                    setErrorInputDate(true)
                                                }
                                            }else{
                                                setErrorInputDate(false)
                                                asignarSku(seleccionarImgNuevoSku, data.prosku, fechasVencimiento)
                                            }

                                        }}
                                    >
                                        <CheckCircleOutlined 
                                            className='Check-Icon-Preload-Nuevo-Banco-Imagen'
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                            
                        </td>
                        :<td
                            style={{
                                width: "58px",
                                height: "45px"
                            }}
                        >
                            <div className='Contenedor-Img-Nuevo-Banco-Imagenes'>
                                <img 
                                    className='Img-Nuevo-Banco-Imagenes'
                                    src={
                                        data.proimagen == "/"
                                        ?IconoSinImagen
                                        :data.proimagen
                                    }
                                />
                            </div>
                            <div className='Contenedor-Icons-Nuevo-Banco-Imagenes'>
                                <Tooltip
                                    placement="bottom" 
                                    title={"Editar"}
                                >
                                    <div
                                        className='Contenedor-Icono-Opciones-Nuevo-Banco-Imagenes'
                                    >
                                        <img 
                                            className='Icon-Editar-Nuevo-Banco-Imagenes'
                                            src={IconoEditar}
                                            onClick={() => {
                                                editandoFila()
                                                refInputImagen.current.click()
                                            }}
                                        />

                                        <img 
                                            className='Icon-Editar-Blanco-Nuevo-Banco-Imagenes'
                                            src={IconoEditarBlanco}
                                            onClick={() => {
                                                editandoFila()
                                                refInputImagen.current.click()
                                            }}
                                            

                                        />
                                    </div>
                                </Tooltip>
                            </div>
                        </td>
                    }
                </tr>
                :null
            }

        </>
    )
}

export default FilaTablaBancoImagen
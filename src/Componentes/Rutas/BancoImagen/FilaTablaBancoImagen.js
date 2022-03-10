import React, {useRef, useState} from 'react'
import { Tooltip, Spin } from 'antd';
import IconoAgregarAzul from '../../../Assets/Img/BancoImagen/agregaAzul.png'
import IconoAgregar     from '../../../Assets/Img/BancoImagen/agregarNueva.png'
import IconoEditar      from '../../../Assets/Img/BancoImagen/Editar.png'
import IconoSinImagen   from '../../../Assets/Img/BancoImagen/SinImagen.png'
import {
    CheckCircleOutlined,
    LoadingOutlined
} from '@ant-design/icons';

const FilaTablaBancoImagen = (props) => {

    const data = props.data
    const pos = props.pos
    const editandoFila = props.editandoFila
    const editarImagen = props.editarImagen

    const refInputImagen = useRef(null)

    const [seleccionarImg, setSeleccionarImg] = useState("")

    return (
        <>
            <input 
                type={"file"}
                style={{display:'none'}}
                ref={refInputImagen}
                onChange={(e) => {
                    let reader = new FileReader()
                    reader.onload = function(){
                        
                        console.log(reader.result)
                        setSeleccionarImg(reader.result)
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

                style={{position:'relative'}}
            >
                <td>
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
                <td>
                    {data.pronombre}
                </td>
                <td>
                    {data.catnombre}
                </td>
                <td>
                    {"-"}
                </td>
                <td>
                    {"-"}
                </td>


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
                                        editarImagen(seleccionarImg, data.prosku)
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
                                <img 
                                    className='Icon-Editar-Nuevo-Banco-Imagenes'
                                    src={IconoEditar}
                                    onClick={() => {
                                        editandoFila()
                                        refInputImagen.current.click()
                                    }}
                                />
                            </Tooltip>
                            <Tooltip
                                placement="bottom" 
                                title={"Agregar nuevo SKU"}
                            >
                                <img 
                                    className='Icon-Editar-Nuevo-Banco-Imagenes'
                                    src={IconoAgregar}
                                />
                            </Tooltip>
                        </div>
                    </td>
                }
            </tr>
        </>
    )
}

export default FilaTablaBancoImagen
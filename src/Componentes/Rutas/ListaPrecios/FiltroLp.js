import React, {useState} from 'react'
import IconoFlechaAbajoNegro from '../../../Assets/Img/Tabla/flechaabajonegro.png'
import { Checkbox  } from 'antd';

const FiltroLp = (props) => {

    const fil_data = props.fil_data
    const titulo = props.titulo
    const tamanio = props.tamanio
    const aceptarFiltro = props.aceptarFiltro
    const seleccionarLista = props.seleccionarLista
    const seleccionartodo = props.seleccionartodo
    const funSeleccionarTodo = props.funSeleccionarTodo

    const mostrarCuerpo = props.mostrarCuerpo
    const setMostrarCuerpo = props.setMostrarCuerpo

    // const [mostrarCuerpo, setMostrarCuerpo] = useState(false)

    return (
        <div
            className='Contenedor-Btn-Filtro-Lista-Precios'
        >

            <div 
                className='Btn-Filtro-Lista-Precio W600-S14-H19-C1E1E1E-L0015'
                onClick={() => {
                    setMostrarCuerpo(!mostrarCuerpo)
                }}
            >
                {titulo}
                <img src={IconoFlechaAbajoNegro} className="Icono-Flecha-Abajo-Negrita-Lp" />
            </div>
            <div>
                {
                    mostrarCuerpo == true
                    ?<div
                        className='Contenedor-Filtro-Lp'
                        style={
                            tamanio == 0
                            ?{}
                            :{width:tamanio+"px"}
                        }
                    >
                        
                        <div className='Titulo-Filtro-Lp'>
                            <Checkbox 
                                onChange={(e) => {
                                    console.log(e.target.checked)
                                    funSeleccionarTodo(e.target.checked)
                                }}
                                className="Check-Filtro-Lp W400-S12-H16-C1E1E1E-L0015"
                                checked={seleccionartodo}
                            >Seleccionar Todo</Checkbox>
                        </div>

                        <div className='Cuerpo-Filtro-Lp'>
                            {
                                // titulo == "Customer Group"
                                // ?fil_data.map((grupo, pos) => {
                                //     return(
                                //         <div
                                //             style={{marginBottom:'5px'}}
                                //         >
                                //             <Checkbox 
                                //                 onChange={(e) => {
                                //                     seleccionarLista(pos, e.target.checked)
                                //                 }}
                                //                 className="Check-Filtro-Lp W400-S12-H16-C1E1E1E-L0015"
                                //             >
                                //                 {
                                //                     grupo.trenombre == "ZA"
                                //                     ?grupo.trenombre+" - Estratégico"
                                //                     :grupo.trenombre == "ZB"
                                //                         ?grupo.trenombre+" - Táctico"
                                //                         :grupo.trenombre == "ZC"
                                //                             ?grupo.trenombre+" - Broker"
                                //                             :null
                                //                 }
                                //             </Checkbox>
                                //         </div>
                                //     )
                                // })
                                // :fil_data.map((data, pos) => {
                                fil_data.map((data, pos) => {
                                    return(
                                        <div
                                            style={{marginBottom:'5px'}}
                                        >
                                            <Checkbox 
                                                onChange={(e) => {
                                                    // console.log(e.target.checked)
                                                    seleccionarLista(pos, e.target.checked)
                                                }}
                                                className="Check-Filtro-Lp W400-S12-H16-C1E1E1E-L0015"
                                                checked={data.seleccionado}
                                            >
                                                {
                                                    data.data
                                                }
                                            </Checkbox>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='Btns-Filtro-Lp'>
                            <div 
                                className='Btn-Aceptar-Filtro-Lp W700-S10-H13-CFFFFFF-L0015' 
                                onClick={() => {
                                    // console.log(fil_data)
                                    aceptarFiltro()
                                    setMostrarCuerpo(false)
                                }}
                            >
                                Aceptar
                            </div>
                            <div 
                                className='Btn-Cancelar-Filtro-Lp W600-S10-H13-C1E1E1E-L0015'
                                onClick={() => {
                                    setMostrarCuerpo(false)
                                }}
                            >
                                Cancelar
                            </div>
                        </div>

                    </div>
                    :null
                }
            </div>
         
        </div>
    )
}

export default FiltroLp
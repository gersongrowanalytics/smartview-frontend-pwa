import React from 'react'
import { Checkbox, Row, Col, Button, Modal } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import {
    SeleccionarTodoSucursalesCrearUsuarioReducer,
    SeleccionarZonaCrearUsuarioReducer,
    SeleccionarSucursalCrearUsuarioReducer
} from '../../../../Redux/Acciones/Administrativo/Usuarios/Usuarios'

const ModalSeleccionarDt = (props) => {

    const dispatch = useDispatch()

    const mostrarModal = props.mostrarModal
    const setMostrarModal = props.setMostrarModal

    const {
        zonas,
        sucursalesUsuario,
        gsus
    } = useSelector(({sucursales}) => sucursales);

    return (
        <div>
            <Modal
                centered
                title={null}
                visible={mostrarModal}
                footer={null}
                closeIcon={<div></div>}
                width="1363px"
                height="738px"
                className='Caja-Modal-Zona'
                onCancel={() => setMostrarModal(false)}
            >


                <>
                
                

                    <div style={{marginLeft:'40px'}}>
                        <Row>
                            <Col xl={24} style={{marginBottom:'10px'}}>
                                <Checkbox 
                                    className='Wbold-S14-H19-C1E1E1E'
                                    
                                    // checked={zona.zonpromociondescarga}
                                    onChange={(e) => {
                                        dispatch(SeleccionarTodoSucursalesCrearUsuarioReducer(e.target.checked))
                                    }}
                                >Seleccionar todo</Checkbox>
                            </Col>
                        </Row>

                        {
                            <Row>
                                {
                                    zonas.map((zona, posicionZona) => {
                                        return(
                                            <Col xl={8} style={{marginBottom:'40px'}}>
                                                <div style={{marginBottom:'10px'}}>
                                                    {
                                                        <Checkbox 
                                                            className='Wbold-S14-H19-C1E1E1E'
                                                            checked={zona.zonpromocioncrear}
                                                            onChange={(e) => {
                                                                dispatch(SeleccionarZonaCrearUsuarioReducer(posicionZona, e.target.checked))
                                                            }}
                                                        >{zona.zonnombre}</Checkbox>
                                                    }
                                                </div>
                                                {
                                                    sucursalesUsuario.map((sucursal, posicionSucursal) => {
                                                        return(
                                                            sucursal.zonid == zona.zonid
                                                            ?<div>
                                                                <Checkbox 
                                                                    className='Wnormal-S14-H19-C1E1E1E'
                                                                    checked={sucursal.sucpromocioncrear}
                                                                    onChange={(e) => {
                                                                        dispatch(SeleccionarSucursalCrearUsuarioReducer(posicionSucursal, e.target.checked))
                                                                    }}
                                                                >{sucursal.sucnombre}</Checkbox>
                                                            </div>
                                                            :null
                                                        )
                                                    })
                                                }
                                                
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        }

                    
                        {/* <Row>
                            <Col xl={8} style={{marginBottom:'40px'}}>
                                <div style={{marginBottom:'10px'}}>
                                    {
                                        <Checkbox 
                                            className='Wbold-S14-H19-C1E1E1E'
                                            onChange={(e) => {
                                                // dispatch(SeleccionarTodosGruposReducer(e.target.checked))
                                            }}
                                        >{"Grupos"}</Checkbox>
                                    }
                                </div>
                                {
                                    gsus.map((gsu, pos) => {
                                        return(
                                            <div>
                                                <Checkbox 
                                                    className='Wnormal-S14-H19-C1E1E1E'
                                                    onChange={(e) => {
                                                        dispatch(SeleccionarSucursalesGrupoReduecer(pos, e.target.checked))
                                                    }}
                                                    checked={gsu.gsupromociondescarga}
                                                >
                                                    {gsu.gsunombre}
                                                </Checkbox>
                                            </div>
                                        )
                                    })
                                }
                                
                                
                            </Col>
                        </Row> */}
                        
                    </div>

                
                
                </>



            </Modal>
        </div>
    )
}

export default ModalSeleccionarDt
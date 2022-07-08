import React from 'react'
import { Modal } from 'antd'
import { Row, Col } from 'antd'

import '../../../Estilos/Componentes/Status/ModalStatus.css'
import { CloseCircleOutlined } from '@ant-design/icons'

const ModalStatus = (props) => {

    const modalAbierto = props.modalAbierto
    const setAbrilModal = props.setAbrilModal
    return (
        <div>
            <Modal
             centered
             title={null}
             visible={modalAbierto}
             footer={null}
             closeIcon={<CloseCircleOutlined style={{fontSize: '25px'}}/>}
             width="969px"
             height="363px"
             className='Caja-Modal-ReenviarElemento'
             onCancel={() => setAbrilModal(false)}
             >
                <div>
                    <Row>
                        <Col lg={24} xl={24}>
                            <div className='Contenedor-Modal-Datos'>
                                <div className='Caja-Promociones' style={{marginRight: '26px'}}>
                                    <div className='Txt-Caja-Promociones'>Mecánicas Promocionales</div>
                                    <div className='Numero-Caja-Promociones'>100</div>
                                </div>
                                <div className='Caja-Lima' style={{marginRight: '26px'}}>
                                    <div className='Txt-Caja-Lima'>Lima</div>
                                    <div className='Numero-Caja-Lima'>20</div>
                                </div>
                                <div className='Caja-Norte' style={{marginRight: '26px'}}>
                                    <div className='Txt-Caja-Lima'>Norte</div>
                                    <div className='Numero-Caja-Lima'>20</div>
                                </div>
                                <div className='Caja-Centro' style={{marginRight: '26px'}}>
                                    <div className='Txt-Caja-Lima'>Centro</div>
                                    <div className='Numero-Caja-Lima'>20</div>
                                </div>
                                <div className='Caja-Sur'>
                                    <div className='Txt-Caja-Lima'>Norte</div>
                                    <div className='Numero-Caja-Lima'>20</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '17px'}}>
                        <Col lg={24} xl={24}>
                            <div className='Contenedor-Modal-Tabla-Status'>
                                <table className='Modal-Tabla-Status'>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Base de Datos</th>
                                            <th>Responsable</th>
                                            <th>Usuario</th>
                                            <th>DeadLine</th>
                                            <th>Fecha de Carga</th>
                                            <th>Fecha de Carga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    )
}

export default ModalStatus
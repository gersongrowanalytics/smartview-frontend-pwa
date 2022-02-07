import React from 'react'
import {Col, Row, Card, Button, InputNumber} from "antd";
import PromocionesCarousel from './PromocionesCarousel'
import {useDispatch} from "react-redux";
import {
    editarPromocionReducer, 
    aceptarEdicionPromocionReducer,
    guardarImagenPromocionReducer
} from '../../../Redux/Acciones/Promociones/Promociones'

const CanalPromociones = (props) => {
    const {
        posicionCanal, 
        scaid, 
        cscid, 
        nombreCanal, 
        promociones, 
        colorSeleciconadoPromo, 
        porcentaje,
        permisos
    } = props
    
    const dispatch = useDispatch();

    const editarPromocion = async (posicionPromocion) =>  {
        dispatch(editarPromocionReducer(posicionCanal, posicionPromocion))
    }

    const aceptarEdicionPromocion = async (posicionPromocion, scaid, cspid, valorizado, planchas) => {
        dispatch(aceptarEdicionPromocionReducer(posicionCanal, posicionPromocion, scaid, cspid, valorizado, planchas))
    }

    const editarImagenesPromocion = async (prpid, prbid, producto, bonificado, posicionPromocion) => {
        // console.log(prpid)
        // console.log(prbid)
        // // console.log(producto)
        // console.log(posicionCanal)
        // // console.log(bonificado)
        // console.log(posicionPromocion)
        await dispatch(guardarImagenPromocionReducer(
            prpid,
            prbid,
            producto,
            bonificado,
            posicionCanal,
            posicionPromocion
        ))
        return true
    }

    return (
        <>
            <div
                style={{
                    width: "80px",
                    height: "275px",
                    background: "white",
                    position: "absolute",
                    zIndex: "1"
                }}
            ></div>
            <Col 
                xl={24} md={24} sm={24} xs={24}
                style={{
                    marginLeft: "120px"
                }}
            >
                <Row
                    style = {{
                        boxSizing    : 'border-box',
                        padding      : '0',
                        marginBottom : '35px',
                        marginLeft   : '10px'
                    }}
                >
                    <PromocionesCarousel 
                        heading                         = "Example Slider"
                        posicionCanal                   = {posicionCanal}
                        cscid                           = {cscid}
                        slides                          = {promociones} 
                        editarPromocion                 = {editarPromocion}
                        porcentaje                      = {porcentaje}
                        colorSeleciconadoPromo          = {colorSeleciconadoPromo}
                        nombreCanal                     = {nombreCanal}
                        aceptarEdicionPromocionReducer  = {aceptarEdicionPromocion}
                        scaid                           = {scaid}
                        permisos                        = {permisos}
                        editarImagenesPromocion         = {editarImagenesPromocion}
                    />
                </Row>
            </Col>
        </>
    )
}

export default CanalPromociones

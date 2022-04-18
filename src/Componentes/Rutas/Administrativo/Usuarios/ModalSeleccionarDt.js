import React from 'react'
import { Checkbox, Row, Col, Button, Modal } from 'antd';

const ModalSeleccionarDt = (props) => {

    const mostrarModal = props.mostrarModal
    const setMostrarModal = props.setMostrarModal

    return (
        // <div>
        //     <Modal
        //         centered
        //         title={null}
        //         visible={mostrarModal}
        //         footer={null}
        //         closeIcon={<div></div>}
        //         width="1063px"
        //         height="438px"
        //         className='Caja-Modal-Zona'
        //         onCancel={() => setMostrarModal(false)}
        //     >


        //         <>
                
                

        //             <div style={{marginLeft:'40px'}}>
        //                 <Row>
        //                     <Col xl={24} style={{marginBottom:'10px'}}>
        //                         <Checkbox 
        //                             className='Wbold-S14-H19-C1E1E1E'
                                    
        //                             // checked={zona.zonpromociondescarga}
        //                             onChange={(e) => {
        //                                 dispatch(SeleccionarTodoSucursalesDescargarReducer(e.target.checked))
        //                             }}
        //                         >Seleccionar todo</Checkbox>
        //                     </Col>
        //                 </Row>

        //                 {
        //                     <Row>
        //                         {
        //                             zonas.map((zona, posicionZona) => {
        //                                 return(
        //                                     <Col xl={8} style={{marginBottom:'40px'}}>
        //                                         <div style={{marginBottom:'10px'}}>
        //                                             {
        //                                                 modulo_descarga_seleccionado == "Catalogo"
        //                                                 ?<div className='Wbold-S14-H19-C1E1E1E'>
        //                                                     {zona.zonnombre}
        //                                                 </div>
        //                                                 :<Checkbox 
        //                                                     className='Wbold-S14-H19-C1E1E1E'
        //                                                     checked={zona.zonpromociondescarga}
        //                                                     onChange={(e) => {
        //                                                         dispatch(SeleccionarZonaDescargarReducer(posicionZona, e.target.checked))
        //                                                     }}
        //                                                 >{zona.zonnombre}</Checkbox>
        //                                             }
        //                                         </div>
        //                                         {
        //                                             sucursalesUsuario.map((sucursal, posicionSucursal) => {
        //                                                 return(
        //                                                     sucursal.zonid == zona.zonid
        //                                                     ?modulo_descarga_seleccionado == "Catalogo"
        //                                                         ?<div 
        //                                                             style={
        //                                                                 posicionSucursal == 0
        //                                                                 ?{display:'flex', position:'relative', height:'25px'}
        //                                                                 :{display:'flex', position:'relative', height:'25px'}
        //                                                             }
        //                                                             onClick={() => {
        //                                                                 dispatch(SeleccionarUnaSucursalDescargaReducer(posicionSucursal, !sucursal.sucpromociondescarga))
        //                                                             }}
        //                                                         >
        //                                                             <div className='Btn-Radio-Descargar'>
        //                                                                 {
        //                                                                     sucursal.sucpromociondescarga == true
        //                                                                     ?<div className='Btn-Circulo-Radio-Descargar'>

        //                                                                     </div>
        //                                                                     :null
        //                                                                 }
        //                                                             </div>
        //                                                             <div style={{position: "absolute", left: "25px"}}>
        //                                                                 {sucursal.sucnombre}
        //                                                             </div>
        //                                                         </div>
        //                                                         :<div>
        //                                                             <Checkbox 
        //                                                                 className='Wnormal-S14-H19-C1E1E1E'
        //                                                                 checked={sucursal.sucpromociondescarga}
        //                                                                 onChange={(e) => {
        //                                                                     dispatch(SeleccionarSucursalDescargaReducer(posicionSucursal, e.target.checked))
        //                                                                 }}
        //                                                             >{sucursal.sucnombre}</Checkbox>
        //                                                         </div>
        //                                                     :null
        //                                                 )
        //                                             })
        //                                         }
                                                
        //                                     </Col>
        //                                 )
        //                             })
        //                         }
        //                     </Row>
        //                 }

                    
        //                 <Row>
        //                     <Col xl={8} style={{marginBottom:'40px'}}>
        //                         <div style={{marginBottom:'10px'}}>
        //                             {
        //                                 modulo_descarga_seleccionado == "Catalogo"
        //                                 ?<div className='Wbold-S14-H19-C1E1E1E'>
        //                                     Grupos 
        //                                 </div>
        //                                 :<Checkbox 
        //                                     className='Wbold-S14-H19-C1E1E1E'
        //                                     onChange={(e) => {
        //                                         dispatch(SeleccionarTodosGruposReducer(e.target.checked))
        //                                     }}
        //                                 >{"Grupos"}</Checkbox>
        //                             }
        //                         </div>
        //                         {
        //                             gsus.map((gsu, pos) => {
        //                                 return(
        //                                     <div>
        //                                         {
        //                                             modulo_descarga_seleccionado == "Catalogo"
        //                                             ?<div 
        //                                                 style={{display:'flex', position:'relative', height:'25px'}}
        //                                                 onClick={() => {
        //                                                     dispatch(SeleccionarUnaSucursalesGrupoReduecer(pos, !gsu.gsupromociondescarga))
        //                                                 }}
        //                                             >
        //                                                 <div className='Btn-Radio-Descargar'>
        //                                                     {
        //                                                         gsu.gsupromociondescarga == true
        //                                                         ?<div className='Btn-Circulo-Radio-Descargar'>

        //                                                         </div>
        //                                                         :null
        //                                                     }
        //                                                 </div>
        //                                                 <div style={{position: "absolute", left: "25px"}}>
        //                                                     {gsu.gsunombre}
        //                                                 </div>
        //                                             </div>
        //                                             :<Checkbox 
        //                                                 className='Wnormal-S14-H19-C1E1E1E'
        //                                                 onChange={(e) => {
        //                                                     dispatch(SeleccionarSucursalesGrupoReduecer(pos, e.target.checked))
        //                                                 }}
        //                                                 checked={gsu.gsupromociondescarga}
        //                                             >{gsu.gsunombre}</Checkbox>
        //                                         }
        //                                     </div>
        //                                 )
        //                             })
        //                         }
                                
                                
        //                     </Col>
        //                 </Row>
                        
        //             </div>

                
                
        //         </>



        //     </Modal>
        // </div>
        <></>
    )
}

export default ModalSeleccionarDt
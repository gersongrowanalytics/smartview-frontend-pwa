import React, {useState} from 'react'
import { Input, Checkbox, Spin } from 'antd'
import FlechaAbajo from '../../../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo-white.png'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";

const TablaUsuarios = (props) => {

    const { 
        usuarios,
        cargandoTablaUsuarios,
        indexRegistro,
    } = useSelector(({usuarios}) => usuarios);

    const busquedaAbierto = props.busquedaAbierto
    const setbusquedaAbierto = props.setbusquedaAbierto
    const seleccionarUsuarioEditar = props.seleccionarUsuarioEditar
    const txtBuscarUsuario = props.txtBuscarUsuario

    return (
        <div>
            <Spin
                size='large'
                spinning={cargandoTablaUsuarios}
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            >
                <div className='Contenedor-Tabla-Adm-Usuarios'>
                    <table className='Tabla-Adm-Usuarios'>
                        <thead> 
                            <tr>
                                <th style={{width: '10%'}}>
                                    <div>
                                        <span>Item</span>
                                        {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img> */}
                                    </div>
                                </th>
                                <th style={{width: '40%'}}>
                                    <div
                                        style={{cursor:'pointer'}}
                                        onClick={() => setbusquedaAbierto(!busquedaAbierto)}    
                                    >
                                        <span>Nombre y Apellido</span>
                                        {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '6px'}}></img> */}
                                    </div>
                                    {/* <div 
                                        className={ busquedaAbierto == true 
                                            ? 'Contenedor-Busqueda-Adm-Usuario'
                                            : 'Contenedor-Busqueda-Adm-Usuario-Ocultar'}
                                    >
                                        <div className='Cabecera-Buscar-Adm-Usuario'>
                                            <Input placeholder="Buscar" suffix={<SearchOutlined />} className='Buscar-Tabla-Adm-Usuario'/>
                                        </div>
                                        {
                                            [{},{},{},{},{}].map((e) => {
                                                return (
                                                    <div className='Opcion-Busqueda-Adm-Usuario'>
                                                        <Checkbox className='Checkbox-Opcion-Adm-Usuario'/>
                                                        <span className='Txt-Opcion-Busqueda-Adm-Usuario'>
                                                            Nombre de Persona Apellido
                                                        </span>
                                                        
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className='Footer-Buscar-Adm-Usuario'>
                                            <div className='Btn-Opcion-Busqueda-Adm-Usuario' style={{marginRight:'5px'}}>
                                                Aceptar
                                            </div>
                                            <div className='Btn-Opcion-Busqueda-Adm-Usuario'>
                                                Cancelar
                                            </div>
                                        </div>
                                    </div> */}
                                </th>
                                <th style={{width: '20%'}}>
                                    <div>
                                        <span>Tipo de usuario</span>
                                        {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img> */}
                                    </div>
                                </th>
                                <th style={{width: '30%'}}>
                                    <div>
                                        <span>Pais</span>
                                        {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img> */}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usuarios.map((usuario,posicion) => {

                                    let mostarPais = false

                                    usuario.paises.map((pais) => {
                                        if(pais.painombre.includes(txtBuscarUsuario) || pais.painombre.toLowerCase().includes(txtBuscarUsuario.toLowerCase())){
                                            mostarPais = true
                                        }
                                    })

                                    return (
                                        usuario.pernombrecompleto.includes(txtBuscarUsuario) || usuario.pernombrecompleto.toLowerCase().includes(txtBuscarUsuario.toLowerCase()) ||
                                        usuario.tpunombre.includes(txtBuscarUsuario) || usuario.tpunombre.toLowerCase().includes(txtBuscarUsuario.toLowerCase())  
                                        || mostarPais == true
                                        ?<tr 
                                            onClick={() => seleccionarUsuarioEditar(usuario)}
                                            key={usuario.usuid}
                                        >
                                            <td>
                                                {indexRegistro + posicion}
                                            </td>
                                            <td style={{textAlign:'initial'}}>
                                                <div 
                                                    className='Text-Nombre-Completo' 
                                                    title={usuario.pernombrecompleto}
                                                >
                                                    {usuario.pernombrecompleto}
                                                </div>
                                            </td>
                                            <td style={{textAlign:'initial'}}>
                                                {usuario.tpunombre}
                                            </td>
                                            <td>
                                                {
                                                    ( usuario.paises.length >= '2' ) 
                                                    ? (
                                                        <div 
                                                            className='Lista-Banderas'
                                                            style={{
                                                                marginLeft: "-22px"
                                                            }}
                                                        >
                                                            {
                                                                usuario.paises.map((pais, posicion) => {
                                                                    if (posicion == '0') {
                                                                        return (
                                                                            <img src={pais.paiiconomas} className='Banderas-lista' 
                                                                                key={pais.paiid}/>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                            <div className='Banderas-Lista-Hover'>
                                                                {
                                                                    usuario.paises.map((pais, posicion) => {
                                                                        if (posicion >= '1') {
                                                                            return (
                                                                                <img src={pais.paiicono} className='Banderas-lista' 
                                                                                    key={pais.paiid}/>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    ) 
                                                    : (
                                                        usuario.paises.map((pais) => {
                                                            return (
                                                                <>
                                                                    <img src={pais.paiicono} className='Banderas-lista' 
                                                                        key={pais.paiid}/>
                                                                    {pais.painombre}
                                                                </>
                                                            )
                                                        })
                                                    )                                                            
                                                }
                                            </td>
                                        </tr>
                                        : null
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </Spin>
        </div>
    )
}

export default TablaUsuarios
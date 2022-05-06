import React from 'react'
import { Modal } from 'antd'
import Avatar from 'react-avatar-edit'
import Camara from '../../../Assets/Img/MiPerfil/Foto_perfil_cámara.png'

const ModalImagen = (props) => {
    const imagenPrevi = props.imagenPrevi
    const modalAbiertoEditarImagen = props.modalAbiertoEditarImagen
    const setAbrilModal = props.setAbrilModal
    const setImagenPrevisualizar = props.setImagenPrevisualizar
    const setImagenRecortadaCircular = props.setImagenRecortadaCircular
    const imagenRecortada = props.imagenRecortada
    const setImagenUsuario = props.setImagenUsuario
    const imagenUsu = props.imagenUsu

    let cerrarEditor = () => {
        setImagenRecortadaCircular("")
    }
      
    let recortarImagen = (imagenCircularBase64) => {
        setImagenRecortadaCircular(imagenCircularBase64)
    }
    
    let antesCargarImagen = (elem) => {
        if(elem.target.files[0].size > 71680){
          alert("¡El archivo es demasiado grande!");
          elem.target.value = "";
        };
    }
    
    const confirmarEdicionImagen = (imagen) => {
        setImagenPrevisualizar(imagen)
        setAbrilModal(false)
        localStorage.setItem('usuimagen', imagen)
        setImagenUsuario(imagen)
    }

    const cancelarEdicionImagen = () => {
        setAbrilModal(false)
        if(imagenUsu){
            setImagenUsuario(imagenUsu)
        }
    }

    return (
        <div>
            <Modal
                centered
                title={null}
                visible={modalAbiertoEditarImagen}
                footer={null}
                closeIcon={<div></div>}
                width="750px"
                height="324px"
                className='Caja-Modal-ReenviarElemento'
                onCancel={() => setAbrilModal(false)}
            >
                <div>
                    <div style={{ display: 'flex'}}>
                        <Avatar
                            width={390}
                            height={295}
                            onCrop={(e) => recortarImagen(e)}
                            onClose={() => cerrarEditor()}
                            onBeforeFileLoad={(e) => antesCargarImagen(e)}
                            src={imagenPrevi}
                        />
                        <img
                            src={imagenRecortada}
                            alt="Preview"
                            style={{width: '290px', marginLeft: '15px'}}
                        />
                    </div>
                    <div
                        className='Contenedor-Botones-Modal'
                        style={{marginTop: '20px'}}
                    >
                        <button 
                            className='Boton-Aceptar-Eliminar-Modal'
                            onClick={() => {confirmarEdicionImagen(imagenRecortada)}}
                        >
                            Aceptar
                        </button>
                        <button 
                            className='Boton-Cancelar-Eliminar-Modal'
                            onClick={() => { cancelarEdicionImagen() }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ModalImagen
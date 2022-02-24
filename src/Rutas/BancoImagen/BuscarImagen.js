import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useAsyncDebounce } from 'react-table'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { BusquedaBancoImagenReducer } from '../../Redux/Acciones/BancoImagen/BancoImagen';

export const BuscarImagen = (props) => {
  
  const dispatch = useDispatch() 
  
  const buscarTxtBuscar = (texto) => {
    let urlImagen = props.datosImagenes[0].proimagen
    dispatch(BusquedaBancoImagenReducer(texto, urlImagen))
  }

  return (
    <span>
      <Input 
        className='Campo-Buscar'
        onChange={e => {
          // setValue(e.target.value);
          // onChange(e.target.value);
          buscarTxtBuscar(e.target.value)
        }}
        placeholder=" Buscar"
        suffix={
          <SearchOutlined />
        }
      />
    </span>
  )
}

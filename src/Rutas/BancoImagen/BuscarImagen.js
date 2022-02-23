import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useAsyncDebounce } from 'react-table'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { BusquedaBancoImagenReducer } from '../../Redux/Acciones/BancoImagen/BancoImagen';

export const BuscarImagen = () => {

  const dispatch = useDispatch() 

  const buscarTxtBuscar = (e) => {
    // console.log(e)
    dispatch(BusquedaBancoImagenReducer(e))
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

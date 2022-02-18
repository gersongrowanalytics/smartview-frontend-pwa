import React, { useMemo, useEffect, useState } from 'react'
import { useTable, useGlobalFilter } from 'react-table'
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from 'antd';
import { COLUMN_GROUP } from './Columnas'
import './TablaBancoImagen.css'
import { FiltroGlobal } from './FiltroGlobal'
import { dataBancoImagen } from '../../Redux/Acciones/BancoImagen/BancoImagen';

const BancoImagen = () => {

    const dispatch = useDispatch()
    const columns = useMemo(() => COLUMN_GROUP, [])
    const [ConImagenes, setConImagenes] = useState([])
    const [SinImagenes, setSinImagenes] = useState([])
    const [Imagenes, setImagenes] = useState([])
    const [FocusBoton, setFocusBoton] = useState(false)

    const { prosSinImagenes, prosConImagenes } = useSelector(({bancoImagen}) => bancoImagen)

    let data = useMemo(() => Imagenes, [Imagenes])
    
    useEffect(() => {
      dispatch(dataBancoImagen())
      setImagenes(JSON.parse(prosConImagenes))
      setConImagenes(JSON.parse(prosConImagenes))
      setSinImagenes(JSON.parse(prosSinImagenes))
    },[])
    
    const DataSinImagenes = () => {
      setImagenes(SinImagenes)
      setFocusBoton(true)
    }

    const DataConImagenes = () => {
      setImagenes(ConImagenes)
      setFocusBoton(false)
    }
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
      } = useTable({
        columns,
        data,
      },
      useGlobalFilter
      )

    const { globalFilter } = state;

  return (
    <div>
      <Row>
        <Col lg={24} xl={24} style={{marginTop: "19px", marginBottom: "11px"}}>
          <span className='Titulo'>Banco de Imagen</span>
        </Col>
      </Row>
      <Row>
        <Col md={17} lg={10} xl={10} style={{marginBottom:"19px"}}>
          <button className={FocusBoton ? 'Botones-Activo' : 'Botones'} 
            style={{marginLeft:"39px"}}
            onClick={DataSinImagenes}
            >
            <span className='Botones-Texto'>Pendientes ({SinImagenes.length})</span>
          </button>
          <button className={FocusBoton ? 'Botones' : 'Botones-Activo'}
            onClick={DataConImagenes}>
            <span className='Botones-Texto'>Activos ({ConImagenes.length})</span>
          </button>
          <button className='Botones'>
            <span className='Botones-Texto'>Inactivos</span>
          </button>
        </Col>
        <Col md={7} lg={14} xl={14} className="Buscar">
          <FiltroGlobal
                  filter={globalFilter}
                  setFilter={setGlobalFilter}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={22} xl={22} offset={1}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Col>    
      </Row>
    </div>
  )
}

export default BancoImagen
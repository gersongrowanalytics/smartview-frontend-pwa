import React, { useMemo, useEffect, useState } from 'react'
import { useTable, useGlobalFilter } from 'react-table'
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Spin } from 'antd';
import './TablaBancoImagen.css'
import { BuscarImagen } from './BuscarImagen'
import { 
    dataBancoImagen, 
    EditandoFilaBancoImagenesReducer,
    OpcionesImagenPrevImagenReducer,
    AgregarImagenBancoImagenReducer,
    CancelarEditarBancoImagenReducer,
    CargandoEditarFilaBancoImagenReducer
} from '../../Redux/Acciones/BancoImagen/BancoImagen';
import ImagenDefault  from '../../Assets/Img/BancoImagen/SinImagen.png';
import Editar from '../../Assets/Img/BancoImagen/Editar.png';
import { CheckCircleTwoTone,CloseCircleTwoTone,PlusCircleOutlined } from '@ant-design/icons';
import Fechas from '../../Componentes/Rutas/BancoImagen/Fechas';

const BancoImagen = () => {

    const dispatch = useDispatch()   
    const [FocusBoton, setFocusBoton] = useState(false)
    const [data, setdata] = useState([]);
    const [imagenPrevi, setimagenPrevi] = useState("")

    const { 
      prosSinImagenes, 
      prosConImagenes,
      cargandoTablaBancoImagen,
      cargandoRegistroEditar 
    } = useSelector(({bancoImagen}) => bancoImagen);

    console.log(cargandoTablaBancoImagen)
    const cargarDatosTabla = async() => {
      await dispatch(dataBancoImagen())
    }

    useEffect(() => {
        cargarDatosTabla()
        DataConImagenes()
    },[])

    useEffect(() => {
        setdata(prosSinImagenes)
    }, [prosSinImagenes])

    useEffect(() => {
        setdata(prosConImagenes)
    }, [prosConImagenes])
    
    const Columnas = [
        {
          Header: 'Item',
          accessor: 'proid',
        },
        {
            Header: 'SKU',
            accessor: 'prosku',
        },
        {
            Header: 'Nombre',
            accessor: 'pronombre',
        },
        {
            Header: 'Categoria',
            accessor: 'catnombre',
        },
        {
            Header: 'Fecha Inicio',
            accessor: 'created_at',
            Cell: ({row}) => {
                return(
                    <>
                        <Fechas
                            fecha={row.original.created_at}
                        ></Fechas>
                    </>
                )
            }
        },
        {
            Header: 'Fecha Final',
            accessor: 'updated_at',
            Cell: ({row}) => {
                return(
                    <>
                        <Fechas
                            fecha={row.original.updated_at}
                        ></Fechas>
                    </>
                )
            }
        },
        {
            Header: 'Imagen Producto',
            accessor: 'proimagen',
            Cell: ({ row }) => {   
                return (
                    <>
                        {
                            row.original.editando == true ? (
                                <div id='test'>
                                    {
                                        <>
                                            {
                                                row.original.imagenPrev == '0' ? (
                                                    <>
                                                        <div className='imagen-upload'>
                                                            <label htmlFor="file-input">
                                                                <img id='editarImagen' src={Editar} style={{height: "65px", cursor: 'pointer'}}></img>
                                                            </label>
                                                            <div id="previsualizacion"></div>
                                                            <input 
                                                                id='file-input' 
                                                                type="file"
                                                                onChange={(e) => {
                                                                    let reader = new FileReader()
                                                                    reader.onload = function(){
                                                                        let prev = document.getElementById('previsualizacion'),
                                                                            image = document.createElement('img');

                                                                        setimagenPrevi(reader.result)
                                                                        image.src = reader.result;
                                                                        
                                                                        prev.innerHTML = '';
                                                                        prev.append(image);

                                                                        dispatch(OpcionesImagenPrevImagenReducer(reader.result, row.index, row.original.proimagen))
                                                                    };
                                                                    reader.readAsDataURL(e.target.files[0]);
                                                                }}  
                                                            />
                                                        </div>    
                                                        <PlusCircleOutlined style={{fontSize: '40px', cursor: 'pointer'}}></PlusCircleOutlined>                      
                                                    </>
                                                ) : (
                                                    <>
                                                        <img 
                                                            id='imagenPrev' 
                                                            src={imagenPrevi}
                                                            style={{height: '65px'}}
                                                        />  
                                                        <CheckCircleTwoTone             
                                                            style={{fontSize: '30px', cursor: 'pointer', marginRight: '5px'}}
                                                            onClick={()=>ConfirmarEditar(row.original.imagenPrev, row.original.prosku, row.index, row.original.proimagen)}
                                                        />
                                                        <CloseCircleTwoTone
                                                            twoToneColor="#eb2f96"
                                                            style={{fontSize: '30px', cursor: 'pointer'}}
                                                            onClick={() => dispatch(CancelarEditarBancoImagenReducer(row.index, row.original.proimagen))}
                                                        />
                                                    </>  
                                                )
                                            }
                                        </>
                                    }
                                </div>
                            ) : (
                                <div>
                                    { 
                                        row.original.proimagen === "/" ? (
                                            <img src={ImagenDefault} style={{height: "65px"}}  ></img> 
                                        ) : (
                                            <img src={row.original.proimagen} style={{height: "65px"}}></img>
                                        ) 
                                    }
                                </div> 
                            )
                        }
                    </>  
                );
            },
        }
    ];

    const columns = useMemo(() => Columnas, [prosSinImagenes,prosConImagenes])
    
    const ConfirmarEditar = async (imagenPrev, prosku, posicion, proimagen) => {
        dispatch(CargandoEditarFilaBancoImagenReducer(true, posicion, proimagen))
        setTimeout(() => {
            dispatch(AgregarImagenBancoImagenReducer(imagenPrev, prosku, posicion, proimagen))
        }, 5000)
        if (proimagen == '/') {
            DataSinImagenes()
        }
    }
    const DataSinImagenes = () => {
        setdata(prosSinImagenes)
        setFocusBoton(true)
    }
  
    const DataConImagenes = () => {
        setdata(prosConImagenes)
        setFocusBoton(false)
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
      } = useTable({
        columns,
        data,
      })

    return (
        <div>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{marginTop: "19px", marginBottom: "11px"}}>
                    <span className='Titulo'>Banco de Imagen</span>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={10} xl={10} style={{marginBottom:"19px"}}>
                    <button 
                        className={FocusBoton ? 'Botones-Activo' : 'Botones'} 
                        style={{marginLeft:"39px"}}
                        onClick={DataSinImagenes}
                    >
                        {
                            prosSinImagenes.length == 0 ? (
                                <span className='Botones-Texto'>Pendientes</span>
                            ) : (
                                <span className='Botones-Texto'>Pendientes ({prosSinImagenes.length})</span>
                            )
                        }
                    </button>
                    <button 
                        className={FocusBoton ? 'Botones' : 'Botones-Activo'}
                        onClick={DataConImagenes}
                    >
                        {
                            prosConImagenes.length == 0 ? (
                                <span className='Botones-Texto'>Activos</span>
                            ) : (
                                <span className='Botones-Texto'>Activos ({prosConImagenes.length})</span>
                            )
                        }
                    </button>
                    <button className='Botones'>
                        <span className='Botones-Texto'>Inactivos</span>
                    </button>
                </Col>
                <Col xs={24} sm={24} md={24} lg={14} xl={14} className="Buscar">
                    <BuscarImagen 
                        datosImagenes = {data}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingLeft: '39px', paddingRight: '39px'}}>
                    <Spin
                        size='large'
                        spinning={cargandoTablaBancoImagen}
                    >
                        <div className='Contenedor-Tabla Tabla-Responsive'>
                            <table {...getTableProps()}>
                                <thead>
                                    {headerGroups.map( headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                        ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map( row => {
                                        prepareRow(row)
                                        return (
                                            <>                                  
                                                {
                                                    row.original.mostrando ? (
                                                            <tr   
                                                                {...row.getRowProps()}
                                                                onMouseEnter={() => {dispatch(EditandoFilaBancoImagenesReducer(row.index, row.original.proimagen))
                                                                }}
                                                                onMouseLeave={() => {}}
                                                            >
                                                                {row.cells.map( cell => {
                                                                    return( 
                                                                        <td {...cell.getCellProps()}>
                                                                            {
                                                                                (row.original.cargandoSpin == true && row.cells[6].column.Header == 'Imagen Producto') ? (
                                                                                    <Spin
                                                                                        size='large'
                                                                                        spinning={cargandoRegistroEditar}
                                                                                        className='OcultarSpin'
                                                                                    >
                                                                                        {cell.render('Cell')} 
                                                                                    </Spin>
                                                                                ) : (
                                                                                    <>
                                                                                        {cell.render('Cell')} 
                                                                                    </>
                                                                                )
                                                                            }
                                                                        </td>
                                                                    )
                                                                })}
                                                            </tr>
                                                    ): (
                                                        <></>
                                                    )
                                                } 
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Spin>
                    
                </Col>    
            </Row>
        </div>
    )
}

export default BancoImagen
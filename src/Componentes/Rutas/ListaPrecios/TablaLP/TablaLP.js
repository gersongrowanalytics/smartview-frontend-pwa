import React from 'react'
import funFormatoDecimal from '../../../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import IconoFlechaAbajo from '../../../../Assets/Img/Tabla/flechaabajo.png'
import '../../../../Estilos/Componentes/ListaPrecios/TablaLP.css'

const TablaLP = (props) => {

    const data_tabla_lista_precios = props.data_tabla_lista_precios

    return (
        <div>
            <table
                className='Tabla-Principal'
                style={{position:'relative', width:'100%'}}
            >


                <thead className="Wbold-S14-H19-CFFFFFF">
                    <tr>

                        <th 
                            rowSpan={2}
                            style={{
                                position: "sticky",
                                left: "0",
                                zIndex: "2",
                                backgroundColor: "#1EC0ED"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Código SAP
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>

                                {/* <div className='Contenedor-Filtro-Tabla-LP'>

                                </div> */}

                            </div>
                        </th>

                        <th 
                            rowSpan={2}
                            style={{
                                position: "sticky",
                                left: "135px",
                                zIndex: "2",
                                backgroundColor: "#1EC0ED",
                                textAlign: "left"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Descripción de producto
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>




                        <th 
                            rowSpan={2} 
                            // style={{
                            //     position: "sticky",
                            //     left: "0",
                            //     zIndex: "2",
                            //     backgroundColor: "#1EC0ED"
                            // }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Categoría
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th rowSpan={2}>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Subcategoría
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        {/* <th rowSpan={2}>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Código SAP
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th> */}
                        <th rowSpan={2}>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    EAN
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        {/* <th rowSpan={2}>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Descripción de producto
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th> */}
                        <th rowSpan={2}>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Unidad de
                                    Venta
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th rowSpan={2}>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Precio Lista
                                    sin IGV
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th rowSpan={2}>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    % Alza
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th rowSpan={2}>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    SD/TPR
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th rowSpan={2}>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Precio Lista
                                    con IGV
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th 
                            colspan="4" 
                            style={{
                                background:'black', paddingTop:'10px', paddingBottom:'10px',
                                borderRight:'2px solid white',
                                borderLeft:'2px solid white',
                                height: "0px"
                            }}

                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                MAYORISTA
                            </div>
                        </th>
                        <th 
                            colspan="4"
                            style={{
                                background:'black', paddingTop:'10px', paddingBottom:'10px',
                                borderRight:'2px solid white',
                                borderLeft:'2px solid white',
                                height: "0px"
                            }}
                        >
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                MINORISTA
                            </div>
                        </th>
                        <th colspan="4" style={{background:'black', height: "0px"}}>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                BODEGA
                            </div>
                        </th>
                    </tr>
                    <tr>                                
                        <th>

                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    MF Ruta 
                                    Mayorista
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th>

                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Reventa
                                    Mayorista
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th>

                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Margen
                                    Mayorista
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th>

                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Marcaje
                                    Mayorista
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th>

                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    MF Ruta
                                    Minorista
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Reventa
                                    Minorista
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Margen
                                    Minorista
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                        <th>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Marcaje
                                    Minorista
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>

                        {/* BODEGA */}

                        <th>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    MF Ruta Horizontal
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>

                        <th>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Reventa Bodega
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>

                        <th>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    Margen Bodega
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>

                        <th>
                            <div
                                className='Contenedor-Cabecera-Tabla'
                            >
                                <div>
                                    PVP
                                </div>
                                <div className='Contenedor-Icono-Flecha-Tabla'>
                                    <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                </div>
                            </div>
                        </th>
                    </tr>


                </thead>
                
                

                
                <tbody>
                    {
                        data_tabla_lista_precios.map((dat, pos) => {
                            return(
                                <tr className='W600-S12-H16-C1E1E1E'>

                                    <td className='W600-S12-H16-C1E1E1E'>{dat.ltpcodigosap}</td>
                                    <td 
                                        className='W600-S12-H16-C1E1E1E'
                                        style={{
                                            position: "sticky",
                                            left: "135px",
                                            zIndex: "0",
                                            backgroundColor: "white",
                                            top: "57px",
                                            textAlign: "left"
                                        }}
                                    >{dat.pronombre}</td>

                                    <td className='W600-S12-H16-C1E1E1E'>{dat.catnombre}</td>
                                    <td className='W600-S12-H16-C1E1E1E'>{dat.ltpsubcategoria}</td>
                                    {/* <td className='W600-S12-H16-C1E1E1E'>{dat.ltpcodigosap}</td> */}
                                    <td className='W600-S12-H16-C1E1E1E'>{dat.ltpean}</td>
                                    {/* <td className='W600-S12-H16-C1E1E1E'>{dat.pronombre}</td> */}

                                    <td className='W600-S12-H16-C1E1E1E'>{dat.ltpunidadventa}</td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltppreciolistasinigv, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        {
                                            funFormatoDecimal(dat.ltpalza * 100, 2)
                                        }%
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        {
                                            funFormatoDecimal(dat.ltpsdtpr * 100, 2)
                                        }%
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltppreciolistaconigv, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        {
                                            funFormatoDecimal(dat.ltpmfrutamayorista * 100, 2)
                                        }%
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltpreventamayorista, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        {
                                            funFormatoDecimal(dat.ltpmargenmayorista * 100, 2)
                                        }%
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltpmarcajemayorista, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    
                                    {/* MINORISTA */}
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        {
                                            funFormatoDecimal(dat.ltpmfrutaminorista * 100, 2)
                                        }%
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltpreventaminorista, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        {
                                            funFormatoDecimal(dat.ltpmargenminorista * 100, 2)
                                        }%
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltpmarcajeminorista, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>

                                    {/* BODEGA */}
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        {
                                            funFormatoDecimal(dat.ltpmfrutahorizontal * 100, 2)
                                        }%
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltpreventabodega, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        {
                                            funFormatoDecimal(dat.ltpmargenbodega * 100, 2)
                                        }%
                                    </td>
                                    <td className='W600-S12-H16-C1E1E1E'>
                                        S/<NumberFormat value={funFormatoDecimal(dat.ltppvp, 2)} displayType={'text'} thousandSeparator={true} />
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
                
            </table>
        </div>
    )
}

export default TablaLP
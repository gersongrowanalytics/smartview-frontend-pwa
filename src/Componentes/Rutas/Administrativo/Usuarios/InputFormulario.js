import { Form, Input } from "antd"
import { useState, useRef } from "react"

const InputFormulario = (props) => {
    const campoFormulario = useRef(null)
    // const [campoFormulario, setcampoFormulario] = useState("")
    // console.log(campoFormulario)

    return (
        <div className='Campo1-Crear-Adm-Usuario'>
            <span>{props.campoNombre}:</span>
            {/* <input
                ref={campoFormulario}
                // onChange={(e) => setcampoFormulario(e.target.value)}
            /> */}
            <Input/>
        </div>
    )
}

export default InputFormulario
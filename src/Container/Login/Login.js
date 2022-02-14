import React, {useState} from 'react'
import LoginBanner from './LoginBanner'
import LoginFormulario from './LoginFormulario'

const Login = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const MostrarFormulario = () => {
        setMostrarFormulario(true);
    }; 
    
  return (
    <div>
        {
            mostrarFormulario == true
            ?<LoginFormulario/>
            :null
        }
        <LoginBanner
            setMostrarFormulario = {MostrarFormulario}
        />
    </div>
  )
}

export default Login
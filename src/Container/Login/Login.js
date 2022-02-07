import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
    loginReducer
} from '../../Redux/Acciones/Auth'

const Login = () => {
    
    const dispatch = useDispatch()
    
    const EnviarLogin = () => {

        let valores = {
            usuario : "Administrador",
            contrasena : "gerson$$"
        }

        dispatch(loginReducer(valores))
    }

    // const cargando_login = useSelector(({login}) => login.cargando_login)

    
    return (
        <div>
            login
            <button
                onClick={() => EnviarLogin()}
            >
                Login
            </button>
        </div>
    );
};

export default Login;

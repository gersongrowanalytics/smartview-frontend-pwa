import React from 'react'
import GrowIcono from '../../Assets/Img/Login/Isotipo-Grow.png';
import '../../Estilos/Rutas/Login/Login.css';

class LoginBanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            cssAnimacion : 'Banner'
        };
    }

    animacionBanner(){
        this.setState({cssAnimacion: 'Banner-Animacion'})
        this.props.setMostrarFormulario()
    }

    componentDidMount(){
        setTimeout(() => {
            this.animacionBanner()
        }, 500);
    }
    render(){
        return (
      
            <div id={this.state.cssAnimacion}>
                <div id='Banner-Fondo'>
                    <img
                        id="Banner-Icono" 
                        src={GrowIcono} 
                    />
                </div>
                
            </div>
          )
    }
}

export default LoginBanner
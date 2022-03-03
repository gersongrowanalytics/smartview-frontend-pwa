import React from 'react'
import GrowIcono from '../../Assets/Img/Login/Isotipo-Grow.png';
import GrowText from '../../Assets/Img/Login/Grow_tex.png';
import GrowLion from '../../Assets/Img/Login/Grow_lion.png';
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
        // this.props.setMostrarFormulario()
    }
    
    componentDidMount(){
        this.props.setMostrarFormulario()
        setTimeout(() => {
            this.animacionBanner()
        }, 1000);
    }
    render(){
        return (
      
            <div id={this.state.cssAnimacion}>
                <div id='Banner-Fondo'>
                    {/* <img
                        id="Banner-Icono" 
                        src={GrowIcono} 
                    /> */}
                    <div
                        style={{
                            width: "200px",
                            height: "200px",
                            position: "relative",
                        }}
                    >
                        <img
                            className="Banner-Icono-Grow-Text" 
                            src={GrowText} 
                        />
                        <img
                            className="Banner-Icono-Grow-Lion" 
                            src={GrowLion} 
                        />
                    </div>
                </div>
                
            </div>
          )
    }
}

export default LoginBanner
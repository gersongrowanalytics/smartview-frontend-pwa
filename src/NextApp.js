import React from 'react';
import {Provider} from 'react-redux'
import {Routes, BrowserRouter, Route} from "react-router-dom";
import generateStore from './Redux/Store/index';
import App from "./Container/App/App";
import './Estilos/Letras/LetraLuminoso.css'

function NextApp() {

    const store = generateStore()
    

    return (
        <Provider store={store}>
            
            {/* <ConnectedRouter history={history}> */}
                <BrowserRouter>
                    <App/>
                    <Routes>
                        
                        {/* <Route path="/" element={<App/>}/> */}
                        {/* <Route path="/login" element={<App/>}/> */}
                    </Routes>
                </BrowserRouter>
            {/* </ConnectedRouter> */}
            
        </Provider>        
    );
}

export default NextApp;

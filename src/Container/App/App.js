import React from 'react';
import {Route, Routes } from "react-router-dom";
import Login from '../Login/Login'
import {useSelector, useDispatch} from "react-redux";
import Rutas from '../../Rutas';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {

    const {authUser} = useSelector(({auth}) => auth);

    return (
        <div
            style={{
                margin: '0',
                padding:'0'
            }}
        >
            {
                authUser == null
                ?<Routes>
                    <Route exact path='/login' element={<Login/>}/>
                </Routes>
                :<>
                    <Rutas />
                </>
            }
            
        </div>
    );
}

export default App;

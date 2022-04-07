
const initialSettings = {
    cookiesaceptadas : false,
    leyendopoliticas : false,
    cargando_plataforma : false
};

const Settings = (state = initialSettings, action) => {
    switch (action.type) {
        case "ACEPTAR_COOKIES_CONFIGURACION":
            return {
                ...state,
                cookiesaceptadas : action.payload
            }
        case "LEYENDO_COOKIES_CONFIGURACION":
            return {
                ...state,
                leyendopoliticas : action.payload
            }
        case "CARGANDO_TODA_PLATAFORMA_CONFIGURACION":
            return {
                ...state,
                cargando_plataforma : action.payload
            }
        default:
            return state;
    }
};

export default Settings;

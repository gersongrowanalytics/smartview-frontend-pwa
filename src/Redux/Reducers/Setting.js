
const initialSettings = {
    cookiesaceptadas : false,
    leyendopoliticas : false
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
        default:
            return state;
    }
};

export default Settings;

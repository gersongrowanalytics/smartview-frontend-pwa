import {
    CARGANDO_BTN_EXCEL_DESCARGAR_PDF
} from '../../../Constantes/Descargas/Descargas'

const INIT_STATE = {
    cargando_btn_excel_descargar_pdf : false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CARGANDO_BTN_EXCEL_DESCARGAR_PDF: {
            return {
                ...state,
                cargando_btn_excel_descargar_pdf : action.payload
            }
        }
        default:
            return state;
    }
}

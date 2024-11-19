import { fetchAsync } from "../../../../utils/FetchAsync";
import { setUserActive } from "..";
import { setUserActiveCorreo } from "..";

export const getUserActive = () => async(dispatch)=>{

    const url = import.meta.env.VITE_API_PRODUCTOS; 
    
    try {
        // Configuración de la solicitud HTTP POST
        // 1. Petición asincrónica al backend
    const userActive = await fetchAsync('POST',`${url}active/user`,
        {
            "token":localStorage.getItem('sesion'),
            "correo":localStorage.getItem('correo')
        }
    )
    
    setUserActiveCorreo
         dispatch(setUserActive(userActive.nombre))
         dispatch(setUserActiveCorreo(userActive.correo))
         
    } catch (error) {
        console.log('Usuario No logueado'); // Si hay un error, lo capturas y lo imprimes en la consola
    }

}
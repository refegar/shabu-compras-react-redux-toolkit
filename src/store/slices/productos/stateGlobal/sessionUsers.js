import Swal from 'sweetalert2'
import { fetchAsync } from "../../../../utils/FetchAsync"
import { setUserActive } from '..';



export const sessionUsers = (values) => async(dispatch)=>{

    
    const url = import.meta.env.VITE_API_PRODUCTOS; 
    
    try {
        // Configuración de la solicitud HTTP POST
        // 1. Petición asincrónica al backend
    const sesion = await fetchAsync('POST',`${url}login/validacion`,values)
   
        Swal.fire({
         title: "Inicio Sesion",
         text: `Se ha iniciado sesion correctamente.`,
         icon: "success",
         confirmButtonText: "Aceptar"
          });
         //dispatch(setUsersesion(sesion))
         localStorage.sesion=sesion.token
         localStorage.correo=sesion.correo
         dispatch(setUserActive(`${sesion.nombre}`))
         
    } catch (error) {
        console.log('Error al iniciar sesion',error); // Si hay un error, lo capturas y lo imprimes en la consola
    }

}
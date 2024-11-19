// ! middleware (Redux thunk) -> es el resposable de gestionar la asincronica
// creamos la asccion asincronica que va a obtenr todos los productos


import { setProductos } from ".."
import { fetchAsync } from "../../../../utils/FetchAsync"

export const getAllProductos = () => async(dispatch)=>{
    const url = import.meta.env.VITE_API_PRODUCTOS

try{

    const data = await fetchAsync('GET',`${url}productos`)
    // 
   // 2. Ya es sincronico (Hago el dispatch de la accion sincronica)
   dispatch(setProductos(data))
}
catch(error){
console.error(error)
}

}

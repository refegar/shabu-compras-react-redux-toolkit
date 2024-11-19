import {setCantidadAddCart } from ".."
const url = import.meta.env.VITE_API_PRODUCTOS; 

export const getCantidadAddCart = () => async(dispatch)=>{
    
    try {
        let response = await fetch(`${url}AddCartNumber`, {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuario:"Luis Fernando"
          }),
        });
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const cantidaReg = await response.text(); // Porque devuelve un número como texto
      let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];
      let cantidadAddCart = parseInt(cantidaReg)
      let cantidadRegTotal = (cantidadAddCart + (Array.isArray(carrito) ? carrito.length : 0 ) )
      dispatch(setCantidadAddCart(cantidadRegTotal)) // Acción asincrónica para obtener productos
  
      } catch (error) {
        console.log(error)
      }
}
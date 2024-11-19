import Spinner from "../components/styleEffects/spinner";
import { useDispatch, useSelector } from 'react-redux'
import CartVacio from "../components/buttons/cartVacio/cartVacio";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { fetchAsync } from "../utils/FetchAsync";
import { getCantidadAddCart } from "../store/slices/productos/stateGlobal/getCantidadAddCart"; 
import Swal from 'sweetalert2';
const url = import.meta.env.VITE_API_PRODUCTOS; 



const cart = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para el spinner
    useEffect(() => {
        try {
            cartProductos() 
            
        } catch (error) {
            console.log('Error de carga de productos de compras')
           
        }
    }, [])
    
    let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];
    const [productoCarrito, setProductoCarrito] = useState( carrito)
    const { userActive: sesionActiva } = useSelector((store) => store.productos);
    const { userActiveCorreo: correoActive } = useSelector((store) => store.productos);
    const costoEnvio = 25
    const precioTotal = productoCarrito.reduce((total, producto) => total + producto.precio*producto.cantidad, 0);
     
    const productosCompradosInicial = {
      nombre:'',
      categoria:'',
      precio:'',
      cantidad:'',
      envio:'',
      precioTotal:'',
      usuario:''
    }

    const correoActivoCompra = correoActive
  
    const navigate = useNavigate();
    const dispatch = useDispatch()


const handleBorrarProducto = async(id) =>{
    
   await fetchAsync('DELETE',`${url}cartDelete/${id}`)
   await cartProductos(id)  // este hacde actualizar el front
    dispatch(getCantidadAddCart())
}

const handleBorrarAll = async() =>{
    
 try {
    await fetchAsync('DELETE',`${url}cartAllDelete/${sesionActiva}`) 
    localStorage.removeItem('carritoCompras')
    let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];
    setProductoCarrito(carrito)
    dispatch(getCantidadAddCart())
 } catch (error) {
    console.log('Error al eliminar productos',error)
 }
   
   // getCantidadAddCart()

}

const handleComprar = () => {
  if (sesionActiva != null) {
      const productosComprados = productoCarrito.map(producto => ({
          nombre: producto.nombre,
          categoria: producto.categoria,
          precio: producto.precio,
          cantidad: producto.cantidad,
          envio: costoEnvio,
          precioTotal: producto.precio * producto.cantidad + costoEnvio,
          usuario: sesionActiva
      }));

      // Enviar cada producto como una solicitud separada
      Promise.all(
          productosComprados.map((producto) =>
              fetchAsync('POST', `${url}compras`, producto)
          )
      )
      .then(() => {
          // Después de completar las compras, enviar el correo de confirmación
         
          fetchAsync('POST', `${url}comprasConfirm`, {
              correo: correoActivoCompra,
              usuario:sesionActiva,
              productos: productosComprados, // Enviar la lista de productos si es necesario
              totalCompra: productosComprados.reduce((total, producto) => total + producto.precioTotal, 0),
          })
          .then(() => {
              Swal.fire({
                title: `Su compra fue exitosa ${sesionActiva}`,
                text: `Enviamos un E-mail de confirmación.`,
                icon: "success",
                confirmButtonText: "Aceptar"
              });
              handleBorrarAll(); // Limpia el carrito tras la compra
          })
          .catch((error) => {
              console.log('Error al enviar el correo de confirmación', error);
          });
      })
      .catch((error) => {
          console.log('Error al comprar productos', error);
      });
  } else {
      navigate('/login');
  }
};


const cartProductos = async (id)=>{

    
    try {
        let mostraTodo = await fetchAsync('POST',`${url}cartProductos`,{
            usuario:sesionActiva
        })

        if(id===null){
            const AddCartTotal = [...carrito,...mostraTodo]
            setIsLoading(false)
           setProductoCarrito(AddCartTotal)
        }
        else{
            const deleteProducto = carrito.filter(producto => producto.id != id)
            localStorage.setItem('carritoCompras', JSON.stringify(deleteProducto));
            const AddCartTotal = [...deleteProducto,...mostraTodo]
            setIsLoading(false)
            setProductoCarrito(AddCartTotal)
        }
      
        
        console.log(AddCartTotal)
    } catch (error) {
        console.log('error en mostra productos')
    }
}

  return (
    <>
    <div className="container mt-5 pt-5 mb-5">
            <section>
             <div className="containerAddCart">
              <div className="modelAddCart p-0">
               <div className="carritoCompras m-5">
              <div>   
             <a href="/" className="color-shabu-suchi">
             <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="cart__head__back" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
              </a>
             </div>
             <div>Carrito de compras</div>
              </div>

{/********************************************************** */}



{  

 productoCarrito.map((producto,idx)=>(

     <div className="containerDetalles mb-5" key={idx}>
     <div className="img mb-3 img-cover" ><img src={`img/shabu-platos/${producto.image}`} width={'350px'} height={'250px'} alt="banner"/></div>
      <div className="itemsDescripcion">
      <div className="title mb-2 font-weight-bolder fs-4 ps-2 pt-2" ><h3>{producto.nombre}</h3>
      <div className='text-dark-green pt-2'><h5>{producto.categoria}</h5>
      <div className="precioProducto color-shabu-suchi pt-3 fs-6">Precio: ${producto.precio}
      <div className="precioProducto color-shabu-suchi pt-3 fs-6">Subtotal: ${producto.precio*producto.cantidad}</div>
      <div className="color-shabu-suchi pt-3">Cantidad: {producto.cantidad}</div>
      </div>
      </div>
      </div>
        <div className="fs-5 ps-5 pt-3 w-50"><p>{producto.descripcion}</p>
        <button className="buttonBorrarCart" onClick={()=>handleBorrarProducto(producto.id)}>
        <svg stroke="currentColor" fill="currentColor"  viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
        </button>
        </div>
         {/**Fin containerDetalles */}
        </div>
       </div>
       ))
  }
 { isLoading? (<Spinner/>):(
     <> 
     {precioTotal  ? (<>
     <hr />
     <div className="row row-cols-md-2 row-cols-xl-3 d-flex justify-content-evenly">
        <div className="col d-block m-4">
         
         <p>Sub-total</p>
         <p>Costo envio</p>
         <p>Monto total</p>
          </div>
         <div className="col m-4">
    <p>${precioTotal}</p>
    <p>${costoEnvio}</p>
    <p className="color-shabu-suchi">${precioTotal+costoEnvio}</p>
  
     </div>

     </div>
  

     <hr />

       <div className='buttonBrowseDish pt-3'>
        <button className='buttonCloseBrowse fs-5 text-center' onClick={()=>handleBorrarAll()}>
        Limpiar carrito
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className="cart__clear__icon ms-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"></path></svg>
        </button>
        <button className='buttonCompletarCompra fs-5 text-center' onClick={handleComprar}>
        Completar compra
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 512" className="cart__checkout__icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>
        </button>

     </div>
     </>):(<CartVacio/>)
     }
     </>
     )
 }
 
{/********************************************************** */}
                 </div>    
              </div>
          </section>    
    </div>
    </>
  )
}

export default cart
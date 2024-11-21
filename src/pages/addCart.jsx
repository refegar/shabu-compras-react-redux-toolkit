import Spinner from '../components/styleEffects/spinner'
import AddCartProducto from '../components/cartItems/addCart/addCartProducto'
import GoCart from '../components/cartItems/goCart/goCart'
import { useDispatch, useSelector } from 'react-redux'
import { detalleProducto } from '../store/slices/productos/fetch/detalleProducto'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { fetchAsync } from '../utils/FetchAsync'
import { getCantidadAddCart } from '../store/slices/productos/stateGlobal/getCantidadAddCart' 

const AddCart = () => {
  const { userActive: sesionActiva } = useSelector((store) => store.productos);
  const url = import.meta.env.VITE_API_PRODUCTOS; 
  const [numberAdd, setNumberAdd] = useState(1)
  const [totalPrecio, setTotalPrecio] = useState(null)
  const [isSpaceAdded, setIsSpaceAdded] = useState(true); // Estado para manejar la clase

  const nombreUsuario = sesionActiva
  const btnAumentarProducto = (precio,contador) => {
    setNumberAdd(numberAdd + 1)
    let convertirTotal = parseFloat(precio)
    let convertirContador = parseFloat(contador+1)
    setTotalPrecio(convertirTotal*convertirContador)
  }

  const btnDecrementarProducto = (precio) => {
    numberAdd>1 ? setNumberAdd(numberAdd - 1) : numberAdd
    totalPrecio<=precio ? precio : setTotalPrecio(totalPrecio-precio)
  }


  const {listaProducto: productos}=useSelector((store)=>{
    return store.productos
  })

  const nombreProducto = location.pathname.split('/')[1]

  useEffect(() => {
    dispatch(detalleProducto(nombreProducto))  // accion asicronica
 
  }, [])

  const dispatch = useDispatch()
  const [agregarProducto, setAgregarProducto] = useState(null)


  const getCantidadAdd = () => {

    dispatch(getCantidadAddCart());

  };


  const agregarProductoAlCarrito = (producto,numberAdd) => {
  
    const cantidadAdd = {
      id:new Date().getTime(),
      cantidad:numberAdd,
      precio:producto.precio
    }
    const nuevoProducto = {...producto, ...cantidadAdd}
    
      ///////////////////fecth verificacion de usuario
      const AddUserCart = {...nuevoProducto, ...{usuario:`${nombreUsuario}`}}
     // 1. Recuperar el array de productos del localStorage o crear uno vacío si no existe.
      let carrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];
      carrito.push(nuevoProducto)
      console.log('dtos: ',AddUserCart)
      nombreUsuario !=null ? (
      fetchAsync('POST',`${url}addCart`,AddUserCart)
      ):(
      // 2. Agregar el nuevo producto al array de carrito.
        setAgregarProducto(carrito)
      )
   
    // setCantidadComprados(Array.isArray(carrito) ? carrito.length : 0); este codigo como
    // ya esta almacenado en el localstorage podemos pasarlo donde se requiera pasar el dato

    //3.agregamos producto al localstore 
    localStorage.setItem('carritoCompras', JSON.stringify(carrito))
    //Aqui actualizamos en el global
    getCantidadAdd();
    setIsSpaceAdded(false);
    // 4. Mostrar un mensaje de éxito (opcional).
    Swal.fire({
      title: "Producto añadido al carrito",
      text: `${producto.nombre} ha sido añadido correctamente.`,
      icon: "success",
      confirmButtonText: "Aceptar"
    });
  };

  

  return (
    <>
{
  productos ? (
    
     <div className="container mt-5 pt-5 mb-5">
      <section>
       <div className="containerAddCart">
       <div className="modelAddCart p-0">
                <div className="img mb-3 img-cover" ><img src={`/img/shabu-platos/${productos.image}`} width={'100%'} height={'500px'} alt="banner"/></div>
                 <div className="title mb-2 font-weight-bolder fs-4 ps-5 pt-2" ><h3>{productos.nombre}</h3>
                 <div className='text-dark-green pt-2'><h5>{productos.categoria}</h5></div>
                 </div>
                   <div className="fs-5 ps-5 pt-3"><p>{productos.descripcion}</p></div>
                  
                    <div className="precioProducto color-shabu-suchi pt-3"> 
                      <p className='ps-5 pb-4'>$ {totalPrecio===null ? productos.precio:totalPrecio}</p>
                    <div>
                     <div className='spaceAddCart'>
                  {
                    isSpaceAdded ? <AddCartProducto btnAumentarProducto={btnAumentarProducto} 
                    btnDecrementarProducto={btnDecrementarProducto}
                     agregarProductoAlCarrito={agregarProductoAlCarrito} 
                     numberAdd={numberAdd} 
                     productos={productos}
                     /> : <GoCart/> 
                  }
                    </div>

                  <div className='buttonBrowseDish pt-3'>
                   <button className='buttonCloseBrowse fs-5 text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left me-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                   </svg>
                   <a href="/"> Explorar otros platos</a></button>
                </div>
                   </div>
                  </div>
                 
                </div>
  
      </div>
      </section>
      </div>

  ):(
    <Spinner/>
  )
}
    </>
  );
};

export default AddCart;

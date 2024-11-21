import './cartProducts.css'
import Spinner from '../../styleEffects/spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductos } from '../../../store/slices/productos/fetch/getAllProductos'
import { useEffect } from 'react'

const cartProducts = () => {

  const {listadoProductos: productos}=useSelector((store)=>{
    return store.productos
  })

  useEffect(() => {
    dispatch(getAllProductos())  // accion asicronica
  
  }, [])

  const dispatch = useDispatch()


  const handleBtnComprar = (producto)=>{
    setModalProducto(producto);
  }

  return (
  <>
    <h3 className='color-shabu-suchi mt-5 text-center fs-4'>Hecho especialmente para ti</h3>
    <h1 className='text-center fs-1'>Nuetro mejores platos</h1>
  {   productos ? (

     <section id="cartSectionPlatos">
     {
      productos.map((producto,idx)=>(
        
        <article className='article col mt-5' key={idx} >
  <div className="article">
    <div className="miProyect" >
             <div className="proyects" >
                <div className="modelProyects p-0">
                <div className="img mb-3 img-cover" ><img src={`/img/shabu-platos/${producto.image}`} width={'350px'} height={'200px'} alt="banner"/></div>
                 <div className="title mb-2 font-weight-bolder fs-4 p-2" ><h3>{producto.nombre}</h3>
                 <div className='text-dark-green pt-2'><h5>{producto.categoria}</h5></div>
                 </div>
                   <div className="descripcion fs-5 p-2"><p>{producto.descripcion}</p></div>
                    <div className="precioProducto color-shabu-suchi"> <p className='ps-3'>${producto.precio}</p><div>
                    <a href={`/${producto.nombre}`}>
                    <button className='fs-5 '>Mostra detalles</button>
                    </a>
                   </div>
                  </div>
                 
                </div>
                
                {/**Fin modelProyects */}
          {/** Fin proyets */}
         </div>
       {/** Fin miproyects */}
      </div>
    </div>
  </article>
      ))
     }
     </section>
    ):(
      <Spinner/>
    )}

  
  </>
  )
}

export default cartProducts

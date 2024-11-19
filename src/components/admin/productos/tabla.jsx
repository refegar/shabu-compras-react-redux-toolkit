import React, { useEffect } from 'react'
import Tablafila from './Tablafila'
import Spinner from '../../styleEffects/spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductos } from '../../../store/slices/productos/fetch/getAllProductos'

const tabla = () => {
 
  const {listadoProductos: productos}=useSelector((store)=>{
    return store.productos
  })

  useEffect(() => {
    dispatch(getAllProductos())  // accion asicronica
  
  }, [])
  

  const dispatch = useDispatch()
 
  return (
    <>
    <h2>Tabla de productos</h2>
    { productos ? (
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Categoria</th>
      <th scope="col">Precio</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  
      <tbody>
    
    {
      //chort circuito operator && se ejecuta si o no false true
      productos.map((producto,idx)=>(
        <Tablafila key={idx}
                   id={producto.id}
                   nombre={producto.nombre} 
                   precio={producto.precio} 
                   categoria={producto.categoria}
                       />
      ))  
    }
  </tbody>
  </table>
    ):(
      <Spinner/>
    )
  }
  



 
    </>
    
  )
}

export default tabla
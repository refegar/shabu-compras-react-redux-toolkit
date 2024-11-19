import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { deleteProducto } from '../../../store/slices/productos/fetch/deleteProducto'
import { setProductoEditar } from '../../../store/slices/productos'

const Tablafila = ({id,nombre,categoria,precio}) => {
  const dispatch = useDispatch()
  
  const handleBtnEliminar =(id)=>{
    Swal.fire({
      title: "Esta seguro de querer eliminar? "+id,
      text: "Cuidado no se puede revertir la accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borralo!"
    }).then((result) => {
      if (result.isConfirmed) {
     
        //eliminarProducto(id)
        dispatch(deleteProducto(id)) // accion asincronica
        Swal.fire({
          title: "Borrado!",
          text: "Su reguistro fue Borrado.",
          icon: "Exitoso"
        });
      }
      else{
        Swal.fire({
          title: "No borrado!",
          text: "Su reguistro no fue Borrado.",
          icon: "info"
        });
      }
    });
  }
  const handleBtnEditar = ({id,nombre,categoria,precio})=>{
dispatch(setProductoEditar({id,nombre,categoria,precio})
)
  }
  
  return (
    <tr>
    <th scope="row">{nombre}</th>
    <td>{categoria}</td>
    <td>{precio}</td>
    <td>
      <button className="btn btn-info m-1">Ver</button>
      <button className="btn btn-warning m-1"
      onClick={()=>handleBtnEditar({id,nombre,categoria,precio})}
      >Editar</button>
      <button className="btn btn-danger m-1"
      onClick={()=>handleBtnEliminar(id)}
      >Borrar</button>
    </td>
  </tr>
 
  )
}

export default Tablafila
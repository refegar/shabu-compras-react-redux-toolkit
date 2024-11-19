import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProducto } from '../../../store/slices/productos/fetch/createProducto'
import { updateProducto } from '../../../store/slices/productos/fetch/updateProducto'
import { setProductoEditar } from '../../../store/slices/productos'
const Formulario = () => {

  // ! useSelector
  const {productoEditar} = useSelector(store=>store.productos)
  
  // !useDispatch
  const dispatch = useDispatch()


  const formInicial = {
    id: null,
    nombre: '',
    categoria: '',
    precio: ''
  }

  const [form, setForm] = useState(formInicial)

useEffect(()=>{
  console.log('Cambio el producto a editar')
   productoEditar ? setForm(productoEditar):setForm(formInicial) // o cargar uno nuevo
},[productoEditar])


  const handleChange = e => {
    const obj = {
      ...form,
      [e.target.name]: e.target.value
    }
    setForm(obj)
  }


  const handleReset = () => {
    console.log('Resetear...')
    setForm(formInicial) // Resetea el formulario al valor inicial()
dispatch(setProductoEditar(null))  // dispatch de accion sincronica
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Enviando el formulario....')
    if(form.id===null){
    //agregarProducto(form)
    // llamar action a partir de un dispath de thunk (asincronica) y esa accion
    dispatch(createProducto(form))
    }else{
      dispatch(updateProducto(form))
    }
    handleReset() // Resetea el formulario después de enviar los datos
  }

  const cambiarTexto = (datoA,datoB)=>{
    return productoEditar ? 'Edicion':'Carga'
  }
  return (
    <>
      <h2>Formulario de {cambiarTexto('Edicion','carga')} </h2>
      <form className='border border-success rounded-3 w-50 px-5 py-5 mb-5' onSubmit={handleSubmit}>
        {/*Nombre*/}
        <div className="mb-3">
          <label htmlFor="lbnombre" className="form-label">Nombre</label>
          <input 
            type="text" 
            className="form-control" 
            id="lbnombre" 
            onChange={handleChange} 
            name="nombre" 
            value={form.nombre}  // Aquí se pasa el valor del estado
            placeholder="Ingrese el nombre" />
        </div>

        {/* Categoria */}
        <div className="mb-3">
          <label htmlFor="lbcategoria" className="form-label">Categorias</label>
          <input 
            type="text" 
            className="form-control" 
            id="lbcategoria" 
            onChange={handleChange} 
            name="categoria" 
            value={form.categoria}  // Aquí se pasa el valor del estado
            placeholder="Ingrese la categoria" />
        </div>

        {/* Precio */}
        <div className="mb-3">
          <label htmlFor="lbprecio" className="form-label">Precio</label>
          <input 
            type="number" 
            className="form-control" 
            id="lbprecio" 
            onChange={handleChange} 
            name="precio" 
            value={form.precio}  // Aquí se pasa el valor del estado
            placeholder="Ingrese el precio" />
        </div>

        {/* Botón Reset */}
        <div className="btn btn-danger m-2" onClick={handleReset}>Reset</div>

        {/* Botón Submit */}
        <input type="submit" className="btn btn-success" value={cambiarTexto('Edicion','Actualizar')} />
      </form>
    </>
  )
}

export default Formulario

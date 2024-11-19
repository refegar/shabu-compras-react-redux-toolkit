import { useFormik } from "formik"
import './reguistro.css'
import { fetchAsync } from "../../../../utils/FetchAsync"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const reguistro = () => {

  /* Expresiones regulares -> caracteres que definen un 
  https://regex101.com mejor https://regexr.com/
  patron de busqueda. pueden usar para valoraciones de formatos,validaciones formularios,buscar */

const navigate = useNavigate();
const handleReguistrar = async (values) =>{

  const url = import.meta.env.VITE_API_PRODUCTOS; 
    
    try {
        // Configuración de la solicitud HTTP POST
        // 1. Petición asincrónica al backend
    fetchAsync('POST',`${url}usuario/create`, values)
      
    fetchAsync('POST',`${url}register`,{
      "Correo":values.correo,
      "Nombre":values.nombre
    }).then(()=>{
      Swal.fire({
        title: "Se ha registrado correctamente",
        text: `Le enviamos un correo de confirmacion`,
        icon: "success",
        confirmButtonText: "Aceptar"
         });
     
      navigate('/login')
    })
      

    
    
    } catch (error) {
        console.log('Error al crear el usuario',error); // Si hay un error, lo capturas y lo imprimes en la consola
    }

}
  const valoresIniciales = {
    
      nombre:'',
      correo:'',
      edad:'',
      password:''
    
  }

  const validaciones =(values)=>{
    
      const errores={}
      const expresionesRegularCorreo = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
     // const expresionRegularPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
  
      if(!values.nombre){
  errores.nombre='El campo nombre es obligatorio'
  }
  
  if(!values.correo){
    errores.correo='El campo correo es obligatorio'
    }
    else if(!expresionesRegularCorreo.test(values.correo)){
     errores.correo = 'No es valido el correo ingresado'
    }
    if(!values.edad){
      errores.edad='El campo edad es obligatorio'
      }
    if(!values.password){
        errores.password='El campo contraseña es obligatorio'
        }
       /* else if(!expresionRegularPassword.test(values.password)){
        errores.password = 'El campo contraseña no cumple con nuestra politicas'
        }*/
  
      return errores
    
  }

  const enviarInformacion = (values)=>{
    console.log('******************* Iniciando el envio de la data')
    console.log(values)

  }

const {values,handleChange,handleSubmit,handleReset,errors} = useFormik(

  {
  initialValues:valoresIniciales,
  onSubmit:handleReguistrar,
  validate:validaciones
})


  return (
<div className="containerReg mb-5"> 
<form className="p-5 m-2 w-74 -auto rounded-3 m-auto"
  onSubmit={handleSubmit}
  >
  {/** Campo nombre */}
  <div className="mb-3">
  <div className="text-center pb-3">Reguistrar para compras</div>
  <label htmlFor="lbl-nombre" className="from-label fs-5">Nombre</label>
  <input type="text" name="nombre" value={values.nombre} onChange={handleChange} id="lbl-nombre"  className="form-control" placeholder="Campo nombre" />
  </div>
{errors.nombre ? <small className="errorFormulario">{errors.nombre}</small>:''}
{/** Campo Correo */}
  <div className="mb-3">
  <label htmlFor="lbl-correo" className="from-label fs-5">E-mail</label>
  <input type="text" name="correo" value={values.correo} onChange={handleChange} id="lbl-correo" className="form-control" placeholder="Correo@email.com" />
  </div>
  {errors.correo ? <small className="errorFormulario">{errors.correo}</small>:''}
  {/** Campo Edad */}
  <div className="mb-3">
  <label htmlFor="lbl-edad" className="from-label fs-5">Edad</label>
  <input type="number" name="edad" value={values.edad} onChange={handleChange}  id="lbl-edad" className="form-control" placeholder="Edad" />
  </div>
  {errors.edad ? <small className="errorFormulario">{errors.edad}</small>:''}
  {/** Campo Contraseña */}
  <div className="mb-3">
  <label htmlFor="lbl-pass" className="form-label fs-5">Contraseña</label>
  <input type="text" name="password" value={values.password} onChange={handleChange}  id="lbl-pass" className="form-control" placeholder="Password" />
  </div>
  {errors.password ? <small className="errorFormulario">{errors.password}</small>:''}

  <button type="submit" className="buttonEnviar me-2 mt-3 fs-5">Enviar</button>
  <button type="reset" className="buttonReset  fs-5 " onClick={handleReset}>reset</button>
  </form>
</div>
  )
}

export default reguistro
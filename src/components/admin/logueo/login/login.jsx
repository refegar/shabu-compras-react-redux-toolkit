import { useFormik } from "formik"
import { sessionUsers } from "../../../../store/slices/productos/stateGlobal/sessionUsers"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"


const login = () => {

  /* Expresiones regulares -> caracteres que definen un 
  https://regex101.com mejor https://regexr.com/
  patron de busqueda. pueden usar para valoraciones de formatos,validaciones formularios,buscar */
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const valoresIniciales = {
      correo:'',
      password:''
  }

  const validaciones =(values)=>{
    
      const errores={}
      const expresionesRegularCorreo = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
     // const expresionRegularPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

  
  if(!values.correo){
    errores.correo='El campo correo es obligatorio'
    }
    else if(!expresionesRegularCorreo.test(values.correo)){
     errores.correo = 'No es valido el correo ingresado'
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
  const handleLogin = async  (values) =>{
    
      try {
        dispatch(sessionUsers(values)) // Acción asincrónica para obtener productos
        navigate('/')
      } catch (error) {
        console.log('Error peticion de inicion de sesion')
      }
    
  }

const {values,handleChange,handleSubmit,handleReset,errors} = useFormik(

  {
  initialValues:valoresIniciales,
  onSubmit:handleLogin,
  validate:validaciones
})



  return (
<div className="containerReg mb-5"> 
<form className="p-5 m-2 w-74 -auto rounded-3 m-auto"
  onSubmit={handleSubmit}
  >
<h2 className="color-shabu-suchi">Logueate para comprar</h2>
{/** Campo Correo */}
  <div className="mb-3 mt-4">
  <label htmlFor="lbl-correo" className="from-label fs-5">E-mail</label>
  <input type="text" name="correo" value={values.correo} onChange={handleChange} id="lbl-correo" className="form-control" placeholder="Correo@email.com" />
  </div>
  {errors.correo ? <small className="errorFormulario">{errors.correo}</small>:''}
 
  {/** Campo Contraseña */}
  <div className="mb-3">
  <label htmlFor="lbl-pass" className="form-label fs-5">Contraseña</label>
  <input type="text" name="password" value={values.password} onChange={handleChange}  id="lbl-pass" className="form-control" placeholder="Password" />
  </div>
  {errors.password ? <small className="errorFormulario">{errors.password}</small>:''}

  <button type="submit" className="buttonEnviar me-2 mt-3 fs-5">Entrar</button>
  <button type="reset" className="buttonReset ms-2 fs-5 " onClick={handleReset}>reset</button>
  <div className="mt-4"><a href="/registro" className="ButtonSesion">Registrarse</a></div>
  </form>
</div>
  )
}

export default login
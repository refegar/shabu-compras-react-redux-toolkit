import "./NavBar.css/"
import ItemNav from './ItemNav'
import { Link } from "react-router-dom"
import { menuItems } from '../../constants/Menuitems'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserActive } from "../../store/slices/productos/stateGlobal/getUserActive"
import { getCantidadAddCart } from "../../store/slices/productos/stateGlobal/getCantidadAddCart"
import { fetchAsync } from "../../utils/FetchAsync"
import { setUserActive } from "../../store/slices/productos"
import Swal from "sweetalert2"



const NavBar = () => {
    const url = import.meta.env.VITE_API_PRODUCTOS; 
    const { userActive: sesionActiva } = useSelector((store) => store.productos);
    const { cantidadAddCart: contadorProductos } = useSelector((store) => store.productos);
    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(getCantidadAddCart()) // Acción asincrónica para obtener productos
        dispatch(getUserActive())
        
        
    }, [dispatch]);
   
 
  const handleCloseSesion = async() =>{
    console.log('Cerrar sesion...')
     dispatch(setUserActive(null))
    try {
     
    await  fetchAsync('DELETE',`${url}active/clean`)
    
    localStorage.removeItem('nombre')
    localStorage.removeItem('sesion')
    localStorage.removeItem('usuario')
    
    Swal.fire({
      title: "Cierre de sesion",
      text: `Se ha cerrado sesion correctamente.`,
      icon: "success",
      confirmButtonText: "Aceptar"
    });
    
    } catch (error) {
      console.log('Erro al cerrar sesion',error)
    }
    
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand roboto-black fs-3 pe-2 ps-4" to="/">Shabu!</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="inicio">
          <ul className="navbar-nav">
            {
              menuItems.map((items) => (
                <ItemNav 
                  key={items.id} // Agrega la prop key aquí con un valor único
                  iditems={items.id} 
                  nombreitem={items.nombre} 
                  rutaitem={items.ruta} 
                />
              ))
            }
          </ul>
          {
            sesionActiva != null  ? (
              <li className="nav-item dropdown ms-3 color-shabu-suchi fs-4">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User: {sesionActiva}
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#" onClick={handleCloseSesion}>Cerrar sesion</a></li>
            
          </ul>
        </li>
            ):('')
          }

           {/* Carrito de compras */}
           <div className="ms-auto pe-4">
    <button
    type="button"
    className="buttonNavbar btn position-relative">
        <a href="/login" className="color-negro">
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="nav__profile__button" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path></svg>
    </a>
    </button>
    
 



<button
    type="button"
    className="buttonNavbar btn position-relative"
  >
    <a href="/cart" className="color-negro">
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="nav__cart__button" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"></path></svg>
    <span className="position-absolute top-0 start-200 translate-middle badge rounded-pill colorContador">
   {/**  {cantidadComprados } */}
{contadorProductos ===0 ? null:contadorProductos}
    </span>
    </a>
  </button>


</div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

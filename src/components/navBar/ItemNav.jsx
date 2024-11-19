import { NavLink } from "react-router-dom"


const ItemNav = ({nombreitem,rutaitem,iditems}) => {

    const cambioColor = ({isActive})=>isActive ?{color:'#cb4c21'}:{color:'black'}
   
  
    return (
   <>
    <li className="nav-item active" key={iditems} >
        <NavLink className="nav-link"  to={rutaitem} style={cambioColor} >{nombreitem} <span className="sr-only"></span></NavLink>
      </li>
     
   </>
  )
}

export default ItemNav
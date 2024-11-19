//rafce
//import React from 'react' // esta parte se borra
import NavBar from "./components/navBar/NavBar" 
import Rutas from "./routers/rutas"
import Footer from "./components/footer/footer.jsx"
import './vendor/js/bootstrap.bundle.min.js'
import './vendor/js/popper.min.js'


const App = () => {

  return (
   <>
   <header> <NavBar/></header>
   <div className="container">
   <Rutas />
   </div>
   <Footer/>
   </>
 
  )

}

export default App
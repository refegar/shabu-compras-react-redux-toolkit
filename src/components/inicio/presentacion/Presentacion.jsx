import "./Presentacion.css"
import OrderNow from "../../buttons/presentacionButton/orderNow"

const Presentacion = () => {

  return (
    <>
<section id="home" className="fondo-presentacion-main pb-5" >
  <div className="home row row-cols-md-2">
    <div id="presentImg" className="col mt-4">
   {/** Carousel */}
   <div id="carouselCaptions" className="carousel slide d-none d-md-block miCarousel" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="/img/presentacion/banner-01.jpg"  className="d-block w-100" alt="Banner"/>
      </div>
      <div className="carousel-item">
        <img src="/img/presentacion/banner-02.jpg" className="d-block w-100 " alt="Banner"/>
      </div>
      <div className="carousel-item">
        <img src="/img/presentacion/banner-03.jpg" className="d-block w-100 " alt="Banner"/>
      </div>
      
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Antes</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Siguiente</span>
    </button>
</div>
 
    </div>
    <div className="col">
      <div id="mainPresent">
        <div className="title"><h1 className="ms-0 font-weight-bolder fs-2">
        Nuestra comidas técnicas culinarias
            </h1></div>
        <div id="present" className="text-justify fs2 mt-3">Explora nuestro menú para encontrar tus platos de comida japonesa favoritos o prueba algo nuevo.</div>
     
     {/* Orden Now*/ }
     <OrderNow/>
      </div>
    </div>
  </div>
  </section>
    </>
  )
}

export default Presentacion
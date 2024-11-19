import './goCart.css'

const goCart = () => {
  return (
    <>
     <div className='buttonBrowseDish pt-3'>
                  <a href="/cart"> 
                   <button className='buttongoCart fs-5 text-center'>
                    Ir al Carrito
                   <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                   <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                   </svg>
                   </button>
                   </a>
                </div>
    </>
  )
}

export default goCart
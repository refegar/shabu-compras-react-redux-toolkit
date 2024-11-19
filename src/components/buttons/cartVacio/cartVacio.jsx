

const cartVacio = () => {
  return (
<>
<div className=" text-center"><h2>Upps! El carrito esta vacio</h2></div>
  <div className='buttonBrowseDish pt-3 mb-5'>
  
    <button className='buttonCloseBrowse fs-5 text-center mb-5'>
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left me-2" viewBox="0 0 16 16">
     <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
    </svg>
    <a href="/">Vamos a comprar</a></button>
 </div>
</>
  )
}

export default cartVacio
// slice de productos

import { createSlice } from "@reduxjs/toolkit";

export const productosSlice = createSlice({
    name:'productos', /// <- nombre del slice
    initialState:{
        listadoProductos:null,
        listaProducto:null,
        productoEditar:null,
        cantidadAddCart:null,
        userActive:null,
        userActiveCorreo:null
    },
    reducers:{
        setUserActive:(state,action)=>{
        state.userActive = action.payload
        },
        setUserActiveCorreo:(state,action)=>{
        state.userActiveCorreo = action.payload
        },
        setCantidadAddCart:(state,action)=>{
        state.cantidadAddCart = action.payload
        },
        setProductos:(state,action)=>{
        state.listadoProductos = action.payload
        },
        setListaProducto:(state,action)=>{
            state.listaProducto = action.payload
            },
        addProductos:(state,action)=>{
            //console.log(action.payload)
            state.listadoProductos = [...state.listadoProductos,action.payload]
        },
        removeProducto:(state,action)=>{
           console.log(action.payload)
    
      
       const id = action.payload.id 
       const nuevoListado = state.listadoProductos.filter(producto =>producto.id !== id)
       state.listadoProductos = nuevoListado
       

        }
        ,
        editProducto:(state,action)=>{
            
           const productoEditado = action.payload
           const nuevoListado = state.listadoProductos.map(producto=>producto.id === productoEditado.id 
            ? 
            productoEditado
            :
            producto)  // si es tru o false en este terciario
        state.listadoProductos = nuevoListado
        },
        setProductoEditar:(state,action) =>{
           // console.log(action.payload)
           const productoSeleccionado = action.payload
           state.productoEditar = productoSeleccionado
        }  
    }
})

// Exportamos acciones sincronica
export const {
    setProductos,
    setListaProducto,
    addProductos,
    removeProducto,
    editProducto,
    setProductoEditar,
    setCantidadAddCart,
    setUserActive,
    setUserActiveCorreo
} = productosSlice.actions

// Exportamos el reducer

export default productosSlice.reducer
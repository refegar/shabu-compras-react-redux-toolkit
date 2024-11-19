import { useRoutes } from "react-router";
import Inicio from "../pages/Inicio";
import Productos from "../pages/productos";
import Nosotros from "../pages/Nosotros";
import NoEncontrado from "../pages/NoEncontrado";
import AddCart from "../pages/addCart";
import Cart from "../pages/cart";
import Reguistro from "../components/admin/logueo/reguistro/reguistro";
import Login from "../components/admin/logueo/login/login";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductos } from "../store/slices/productos/fetch/getAllProductos";
import { useEffect } from "react";

const Rutas = () => {
    const dispatch = useDispatch();
    const { listadoProductos: productos } = useSelector((store) => store.productos);

    useEffect(() => {
        dispatch(getAllProductos()); // Acción asincrónica para obtener productos
    }, [dispatch]);

    // Definir rutas estáticas primero
    const rutasEstaticas = [
        {
            path: '/',
            element: <Inicio />,
        },
        {
            path: '/nosotros',
            element: <Nosotros />,
        },
        {
            path: '/productos',
            element: <Productos />,
        },
        {
            path: '/cart',
            element: <Cart/>,
        },
        {
            path: '/registro',
            element: <Reguistro/>,
        },
        {
            path: '/login',
            element: <Login/>,
        },
        {
            path: '*',
            element: <NoEncontrado />,
        },
    ];

    // Si productos es nulo o undefined, mostrar solo rutas estáticas hasta que se carguen
    const rutasDinamicas = productos 
        ? productos.map((producto) => ({
            path: `/${producto.nombre}`, // Ruta basada en el nombre del producto
            element: <AddCart />,        // Componente a renderizar
        }))
        : [];

    // Combinar rutas estáticas y dinámicas
    const rutas = useRoutes([...rutasEstaticas, ...rutasDinamicas]);

    return rutas;
};

export default Rutas;

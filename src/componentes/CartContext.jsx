  
import {createContext, useEffect, useState} from 'react'
import { db } from "../firebase/Firebase"


export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [quantity, setQuantity] = useState(0);
 
// Obtengo el llamado a la base de datos de Firebase de Colleccion "Pedidos"
    const LoadProductById = async (id) => {
        const response = await db.collection(`Productos`).doc(id).get();
        return response.data();
    }

    /**
     * TODO : Solucionar el número que se muestra en ícono del CartWidget.
     */
    
    useEffect(() => {
        const cantidadCarrito = JSON.parse(localStorage.getItem('carrito'))
        setQuantity(cantidadCarrito.map(element => (
            element.cantidad
        )))
            setQuantity()
    }, [])
    console.log(quantity)
    

    return (
        <CartContext.Provider value={{ LoadProductById, quantity }}>
            {children}
        </CartContext.Provider>
    )
}
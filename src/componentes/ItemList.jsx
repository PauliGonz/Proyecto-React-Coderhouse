import { Item } from "./Item";
import "../style/ItemList.scss"



export const ItemList = ({categorias}) => {
   
    return(
        <section className = "itemContainer">
            {categorias.map((producto, index) =>
                    <Item 
                        key={index} 
                        id={producto.id} 
                        stock={producto.availableStock} 
                        nombre={producto.name} 
                        precio={producto.price} 
                        imagen={producto.image}/>
            )}
        </section>
    )
}

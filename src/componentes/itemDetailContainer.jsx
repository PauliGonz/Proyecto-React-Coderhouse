import { ItemDetail } from "./ItemDetail"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";


export const ItemDetailContainer = () => {
  const[producto, setProducto] = useState();
  
  const { LoadProductById } = useContext(CartContext)
  const {id} = useParams();

  useEffect(() => {
      const resultado = async () =>{
      setProducto(await LoadProductById(id));
      }
      resultado();
  }, [id])
  
  return(
      <> 
      {producto ?
        <ItemDetail
          key={producto.id}
          id={id}
          producto={producto}
        />
        : <div className="d-flex justify-content-center">
          <div className="spinner-border text-info"></div>
          <span className="sr-only">Cargando...</span>
        </div>}
      </>
      )
  }
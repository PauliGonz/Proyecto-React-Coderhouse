import { useEffect, useState } from "react";
import "../style/ItemDetail.scss";
import { Link } from "react-router-dom"

/**
 * Dejé el item Count en el mismo componente ItemDetail.
 */

export const ItemDetail = ({ producto, id }) => {
    const [count, setCount] = useState(1)
    const [carrito, setCarrito] = useState([]);
    const [carrito2, setCarrito2] = useState('');
    const { image, description, price, availableStock } = producto;


    function add() {
        if (count < availableStock) {
            setCount(count + 1)
        }
    }

    function restar() {
        if (count > 1 ) {
            setCount(count - 1)
        }
    }

    useEffect(() => {
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        setCarrito(carrito);
        let newProduct;
        if (carrito2 !== '' && carrito) {
            newProduct = carrito.some(carrito => carrito.id === id)
        }
        if (!newProduct && carrito2 !== '') {
            localStorage.setItem('carrito', JSON.stringify(carrito2))
        }
    }, [carrito2, id])

    const AgregarAlCarrito = () => {
        if (carrito === null) {
            producto.cantidad = count;
            producto.id = id;
            localStorage.setItem('carrito', JSON.stringify([producto]));
        } else if (carrito) {
            producto.cantidad = count;
            producto.id = id;
            setCarrito2(
                [...carrito, producto]
            )
        }
    }


    return (
        <>
            <div className="cardItemDetail">
                <div className="cardDetail">
                    <img className="card-img-top" src={image} alt="imagen"></img>
                </div>
                <div className="card-body">{id}
                    <h4 className="card-title">{description}</h4>
                    <h6 className="card-text">Cantidades Disponibles: {availableStock}</h6>
                    <p className="priceItem">${price}</p>
                    <div className="itemCount">
                        <div>
                            <button className="btn btn-info" onClick={restar}>-</button>
                            <span className="numeroContador">{count}</span>
                            <button className="btn btn-info" onClick={add}>+</button>
                        </div>
                        <button className="btn btn-success"
                            onClick={AgregarAlCarrito}>
                            Agregar al Carrito
                        </button>
                        <div>
                            <Link to={`/`} ><b>Continuar Comprando</b></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
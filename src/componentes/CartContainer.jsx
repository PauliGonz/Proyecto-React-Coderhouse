import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { db } from '../firebase/Firebase';
import "../style/CartContainer.scss"
import { CountDown } from "./CountDown";

/**
 * 
 * @returns La Lógica se realiza guardando los datos de la colleccion en Local Storage y tomándolos desde ahi.
 */
export const CartContainer = () => {
    const [datos, setDatos] = useState({name: ``, email: ``, phone: ``}); //datos para el comprador
    const [carro, setCarro] = useState('')
    const [carroEliminado, setCarroEliminado] = useState('')
          
    let res = 0;
    if (carro) {
        for (let index in carro) {
            res = Number(res) + Number(carro[index].price * carro[index].cantidad);
        }
    }
    let totalizar= res    
    let carrito;
    
    const eliminarDelCarrito = (id, e) => {
        carrito = carro.filter(carro => carro.id !== id);
        setCarroEliminado(carrito);
    }

    function alertaPago() {
        return alert("PAGINA DE PAGO EN CONSTRUCCIÓN. DISCULPA LAS MOLESTIAS")
    }
    
    useEffect(() => {
        console.log('useefect del carrito screen');
        console.log(carroEliminado);
        if (carroEliminado) {
        localStorage.setItem('carrito', JSON.stringify(carroEliminado));
        }
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        setCarro(carrito);
    }, [carroEliminado])


    // realicé el formulario + el listado de productos en el carrito en un solo componentes, para poder alinearlos con el estilo y dividir en 2 de manera vertical en pantalla
    return( 
        <>
        <CountDown/>
        <div className="cart">
            <div className="col-sm-12 col-md-6 col-lg-7">
                <h4 className="container">Información de Contacto</h4>
                <form className="container">
                    <div className="col-md-10 mb-3">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" placeholder= "nombre@ejemplo.com" onInput={(event) => {
                            setDatos({ ...datos, email: event.target.value})
                        }} ></input>
                    </div>

                <h4 className="container">Datos del envío</h4>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="text" className="form-label">Nombre Completo</label>
                        <input type="text" className="form-control" placeholder= "Escriba Nombre y apellido" onInput={(event) => {
                            setDatos({ ...datos, name: event.target.value})
                        }} ></input>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="text" className="form-label">Código de área + número</label>
                        <input type="tel"  className="form-control" id="phone" name="phone" pattern= "[0-9]{1}-[0-9]{4}-[0-9]{4}" required placeholder="0-0000-0000" onInput={(event) => {
                            setDatos({ ...datos, phone: event.target.value})
                        }} ></input>
                    </div>

                    <div className="col-md-10 form-group">
                        <label htmlFor="exampleFormControlTextarea1">Indícanos un comentario adicional </label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                        <label className="form-check-label" htmlFor="exampleCheck1">Guardar mi información y consultar más rápidamente la próxima vez</label>
                    </div>
                </form>
                <div className="container">
                    <button className="btn btn-success" onClick={() => {
                        const pedido = { buyer: { ...datos}, items: carro, total: totalizar }   // con esta línea se guarda los datos del comprador, el carrito y el total. De aquí a Mercado Pago
                        console.log(pedido)

                        const PedidosCollection = db.collection("Pedidos") // para agregar el pedido en Firebase
                        
                        PedidosCollection.add(pedido).then(({id}) => { alert("TE SUGERIMOS ANOTAR EL Nº DE SEGUIMIENTO DE TU COMPRA " + id)}) // para agregar el pedido con el id automático de firebase. Que despues es el nº de seguimiento
                        // const DOCUMENT = PedidosCollection.doc(`acá va el id automático`) // para modificar o actualizar el nº de registro id
                        // DOCUMENT.update({ buyer:{name: `Pauli` ,} , total: 0, }) // se puede modificar o actualizar cualquiera de estas propiedades.

                        // const DOCUMENT = PedidosCollection.doc(`mPTPHN1z8wMb8Aa1K6GX`).delete() //Para borrar un pedido
                        // const DOCUMENT = PedidosCollection.doc(`WPw024FJsjoyj7QKMEbr`).delete().then(() => {console con mensaje}).catch(error) => {console con mensaje que algo salio mal})// para eliminar un documento.
        
                    }} >Guarda los datos de tu compra</button>
                </div>
            </div>
            <div className="container cajaTerminarCompra col-sm-12 col-md-6 col-lg-5 ">
            <div className="container">
                <h3>Resumen Compra</h3>
                {carro ?
                    carro.map(c => (
                            <div key={c.id}>
                                    <div className="row">
                                            <div className="col-md-4">
                                                <img src={c.image} className="imagen img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <h6 className="card-title">{c.name}</h6>
                                                    <p className="card-text">Cantidad: {c.cantidad}</p>
                                                    <span className="card-text">Precio Total: {c.price * c.cantidad}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-2" onClick={(e)=>eliminarDelCarrito(c.id,e)}>  
                                                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path 
                                                d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg>
                                            </div>
                                    </div>
                             </div>
                        ))
                        :
                        <h2>Carrito vacio</h2>
                }
            </div>
                <div className="table-responsive-sm">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Detalle</th>
                                <th>Valor</th>  
                            </tr>
                        </thead>
                        <tbody className="total-line-table__tbody">
                            <tr>
                                <td>Despacho</td>
                                <td>Gratis</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="total-line">
                                <td>TOTAL</td>
                                <td>${res}</td>
                            </tr>
                        </tfoot>

                    </table>
                </div>

                <div className="botonPago">
                    <button className="btn btn-danger" onClick={alertaPago}>Ir al Pago</button>
                </div>
        </div>
        </div>
            <Link to={`/`} ><b className="container">Volver a página principal</b></Link>
        </>
    )        
}

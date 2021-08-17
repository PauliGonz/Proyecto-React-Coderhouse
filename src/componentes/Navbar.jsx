import logo from "../Images/logoNavbar.png"
import "../style/Navbar.scss";
import { CartWidget } from "./CartWidget";
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className= "container">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <Link to={"/"}> <img src={logo} alt="logo"/></Link>
                <span className="navbar-brand" >Venta Online</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to={"/"}><span className="nav-item nav-link active" >Home <span className="sr-only"></span></span></Link>
                        <Link to={"/category/Zapatillas"}><span className="nav-item nav-link" >Zapatillas</span></Link>
                        <Link to={"/category/MochilasKids"}><span className="nav-item nav-link" >Mochilas Kids </span></Link>
                        <Link to={"/category/Poleron"}><span className="nav-item nav-link">Polerón </span></Link>
                        <Link to={"/cart"}> <CartWidget /></Link>
                    </div>
                </div>
            </nav>
        </div>   
    )
};

export default Navbar;
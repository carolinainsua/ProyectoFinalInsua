import { useContext } from "react";
import  cartContext  from "../../context/cartContext";
import { Link } from "react-router-dom";

function CartWidget() {
  
  const { countItems } = useContext(cartContext);
  
  return (
    <div className="navBarItem">
      {countItems()}
      <Link to="/cart">
        <img src="/img/cart.png" alt="Carrito" />
      </Link>
    </div>
  );
}

export default CartWidget;

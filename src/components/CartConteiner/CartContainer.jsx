import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import cartContext from "../../context/cartContext";

function CartContainer() {
  const { cartItems, removeItem, calculateTotalCart, clearCart } = useContext(cartContext);
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío");
      return;
    }
    navigate("/checkout"); // redirige al formulario de checkout
  };

  return (
    <div>
      <button onClick={clearCart}>Limpiar Carrito</button>
      <h3>Tu Carrito:</h3>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id}>
              <img width="100" src={item.img} alt={item.title} />
              <h4>{item.title}</h4>
              <p>Unidades: {item.count}</p>
              <p>Precio Unitario: ${item.precio}</p>
              <p>Precio Total: ${item.precio * item.count}</p>
              <button onClick={() => removeItem(item.id)}>Quitar del Carrito</button>
            </div>
          ))}
          <h2>TOTAL: ${calculateTotalCart()}</h2>
          <button onClick={handleGoToCheckout}>¡Comprar!</button>
        </div>
      )}
    </div>
  );
}

export default CartContainer;

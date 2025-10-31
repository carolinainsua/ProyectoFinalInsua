import { useContext } from "react";
import cartContext from "../../context/cartContext";
import { createOrder } from "../../data/firebase";

function CartContainer() {
  const { cartItems, removeItem, calculateTotalCart, clearCart } = useContext(cartContext);

  const handlePurchase = async () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const orderData = {
      buyer: { name: "Luciano", email: "luciano@luciano", phone: "123456" },
      items: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.precio,
        count: item.count,
      })),
      total: calculateTotalCart(),
      date: new Date(),
    };

    try {
      const docRef = await createOrder(orderData);
      alert(`Orden creada con ID: ${docRef.id}`);
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Hubo un error al crear la orden");
    }
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
          <button onClick={handlePurchase}>¡Comprar!</button>
        </div>
      )}
    </div>
  );
}

export default CartContainer;
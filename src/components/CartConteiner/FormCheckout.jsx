import { useState, useContext } from "react";
import cartContext from "../../context/cartContext";
import { createOrder } from "../../data/firebase";

function CheckoutForm() {
  const { cartItems, calculateTotalCart, clearCart } = useContext(cartContext);

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyer.name || !buyer.email || !buyer.phone || !buyer.address) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (cartItems.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    const orderData = {
      buyer: { ...buyer },
      items: cartItems.map((item) => ({
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
      alert(`¡Compra realizada! ID de orden: ${docRef.id}`);
      clearCart();
      setBuyer({ name: "", email: "", phone: "", address: "" });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al crear la orden.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Formulario de Checkout</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" value={buyer.name} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={buyer.email} onChange={handleChange} required />

        <label htmlFor="phone">Celular:</label>
        <input type="tel" id="phone" name="phone" value={buyer.phone} onChange={handleChange} required />

        <label htmlFor="address">Dirección:</label>
        <input type="text" id="address" name="address" value={buyer.address} onChange={handleChange} required />

        <button type="submit" style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "#5ab53c", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Confirmar Compra
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
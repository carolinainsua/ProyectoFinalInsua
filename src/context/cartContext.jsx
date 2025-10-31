import { createContext, useState } from "react";

const cartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Agregar producto al carrito
  function addToCart(newItem) {
    const newCartItems = structuredClone(cartItems);
    const index = newCartItems.findIndex(item => Number(item.id) === Number(newItem.id));

    if (index !== -1) {
      newCartItems[index].count++;
    } else {
      newCartItems.push({ ...newItem, count: 1 });
    }

    setCartItems(newCartItems);
    alert(`¡Agregaste ${newItem.title} al carrito!`);
  }

  // Contar ítems en el carrito
  function countItems() {
    return cartItems.reduce((count, item) => count + item.count, 0);
  }

  // Remover un item
  function removeItem(idRemove) {
    let newCartItems = structuredClone(cartItems);
    const itemInCart = cartItems.find(item => item.id === idRemove);

    if (itemInCart.count > 1) {
      const idx = cartItems.findIndex(item => item.id === idRemove);
      newCartItems[idx].count--;
    } else {
      newCartItems = cartItems.filter(item => item.id !== idRemove);
    }

    setCartItems(newCartItems);
  }

  // Calcular total del carrito
  function calculateTotalCart() {
    return cartItems.reduce((total, item) => total + item.precio * item.count, 0);
  }

  // Limpiar carrito
  function clearCart() {
    setCartItems([]);
  }

  return (
    <cartContext.Provider value={{ cartItems, addToCart, countItems, removeItem, calculateTotalCart, clearCart }}>
      {children}
    </cartContext.Provider>
  );
}

export default cartContext;

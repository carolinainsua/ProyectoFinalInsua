import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/Navbar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import CartContainer from "./components/CartConteiner/CartContainer";
import app, { getProducts } from "./data/firebase";


function App() {
  console.log("Init Firebase");
  console.log(app);
  getProducts();

  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer h2="Hola, bienvenido usuario." />}
          ></Route>
          <Route
            path="/detail/:idParam"
            element={<ItemDetailContainer />}
          ></Route>
          <Route
            path="/category/:categParam"
            element={<ItemListContainer />}
          ></Route>
          <Route
            path="/cart"
            element={<CartContainer />}
          ></Route>
          <Route
            path="/*"
            element={<h1>404: Página no encontrada.</h1>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

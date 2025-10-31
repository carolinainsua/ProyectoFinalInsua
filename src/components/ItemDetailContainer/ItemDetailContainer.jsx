import './ItemDetailContainer.css'
import { useParams } from 'react-router';
import { getProductById } from '../../data/firebase';
import { useEffect, useState, useContext } from 'react';
import cartContext from '../../context/cartContext';

function ItemDetailContainer () {
const { idParam } = useParams()
const [product, setProduct] = useState({ loading: true});
const context = useContext(cartContext);
useEffect ( () => {
  getProductById(idParam) .then( response => setProduct(response) ) .catch( error => alert("Producto no encontrado."))
}, [])

if ( product.loading )
  return <p style={{ color: "#0d0d0d", backgroundColor: "#5ab53c", fontFamily: "sono",}}>...Cargando producto...</p>;
  

  return(
  <div className='container'>
   <div className='item'><img className='imgDetail' src={`${product.img}`} alt={`${product.title}`} /></div>
   <div className='item'>
    <h1 className='h1Detail'> "{product.title}"</h1>
    <p className='pDetail'>{product.description}</p>
    <p className='precioDetail'>${product.precio.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </p>
    <p className='pDetail'>Stock: {product.stock}</p>
    <br />
    <button className="buttonDetail" onClick={ () => context.addToCart(product) }>Agregar al Carrito</button>
  </div>
  </div>
  
)}

export default ItemDetailContainer;
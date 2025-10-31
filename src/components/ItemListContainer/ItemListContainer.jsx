import './ItemListContainer.css'
import { useState, useEffect } from 'react';
import {getProductByCateg} from '../../data/firebase';
import { getProducts } from '../../data/firebase';
import products from '../../data/products';
import Item from '../Item/Item';
import { useParams } from 'react-router';


function ItemListContainer({ h2 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { categParam } = useParams()    

 
useEffect(() => {
  setLoading(true);
  setError(null);

  const fetchData = categParam
    ? getProductByCateg(categParam)
    : getProducts();

  fetchData
    .then((value) => {
      setProducts(value);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setProducts([]); // opcional: limpiar productos
      setError(err);   // muestra "Categoría no encontrada"
      setLoading(false);
    });
}, [categParam]);

  
  if (loading) {
    return (
      <p style={{ color: "#0d0d0d", backgroundColor: "#5ab53c", fontFamily: "sono" }}>
        ...Cargando productos...
      </p>
    );
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div>
      <h2 className="itemListContainerH2">{h2}</h2>
      <h3>Nuestros Productos</h3>
      <div className="itemCardContainer">
        {products.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
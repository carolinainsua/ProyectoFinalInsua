
import { Link } from 'react-router'
import './Item.css'

function Item({ title, img, description, id, precio }) {
  return (
      <div className="itemCard">
      <img src={img} alt={title} className="itemImage" />
      <h3 className="itemTitle">{title}</h3>
      <p className="itemDescription">{description}</p>
      <p className="precio">Precio ${precio.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      <Link to={`/detail/${id}`}><button className="itemButton">Ver más</button></Link>
    </div>
   )
}

export default Item;
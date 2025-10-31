import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router';


function NavBar() {
  return (
    <div>
      <nav>
        <div className="navBar"> 
          <div className="navBarItem"> {/* LOGO */}
                    <Link to="./">  <img src="/img/logo-thegermen.png" alt="Logo, The Germen" /> </Link>
          </div>
          <div className="navBarItem"> {/* CATEGORIAS */}
            {" "}
            <ul className="categorias">
              <li>
                <Link to="/category/pufferbag">PufferBags</Link>
              </li>
              <li>
                <Link to="/category/totebag">ToteBags</Link>
              </li>
              <li>
                <Link to="/category/upcycling">Upcycling</Link>
              </li>
            </ul>
          </div>
          <div className="navBarItem"> 
            <CartWidget/>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

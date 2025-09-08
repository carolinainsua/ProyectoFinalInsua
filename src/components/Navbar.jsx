import logo from "./img/logo-thegermen.png";
import cart from "./img/cart.png";

function NavBar() {
  return (
    <div>
      <nav>
        <div className="navBar"> 
          <div className="navBarItem"> {/* LOGO */}
            {" "}
            <img src={logo} alt="Logo, The Germen" />{" "}
          </div>
          <div className="navBarItem"> {/* CATEGORIAS */}
            {" "}
            <ul className="categorias">
              <li>
                <a href="./pufferbags.jsx">PufferBags</a>
              </li>
              <li>
                <a href="./totebags.jsx">ToteBags</a>
              </li>
              <li>
                <a href="./upcycling.jsx">Upcycling</a>
              </li>
            </ul>
          </div>
          <div className="navBarItem"> {/* CARRITO */}
            {" "}
            <a href="">
              <img src={cart} alt="Carrito" />
            </a>{" "}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

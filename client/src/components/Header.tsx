import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CartContext, CartContextType } from "../contexts/CartContext";

export const Header = () => {

  const context = useContext<CartContextType | null>(CartContext);
  const { cart } = context || {};

  return (
    <header>
      <Link to='/' className="logo">One-stop Shop</Link>
      <nav>
        <Link to='/search'>Search</Link>
        <Link to='/cart' className="cart-container">
          <img src="/images/shopping-cart.png" alt="Shopping cart" className="shopping-cart" />
          <span className="total-cart-items">{cart && cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
        </Link>
      </nav>
    </header>
  )
}
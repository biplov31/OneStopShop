import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CartContext, CartContextType } from "../../contexts/CartContext";
import HeaderStyles from "./Header.module.css";

export const Header = () => {

  const context = useContext<CartContextType | null>(CartContext);
  const { cart } = context || {};

  return (
    <header>
      <Link to='/' className={HeaderStyles.logo}>One-stop Shop</Link>
      <nav>
        <Link to='/search'>Search</Link>
        <Link to='/cart' className={HeaderStyles['cart-container']}>
          <img src="/images/shopping-cart.png" alt="Shopping cart" className={HeaderStyles['shopping-cart']} />
          <span className={HeaderStyles["total-cart-items"]}>{cart && cart.reduce((acc: number, item: { quantity: number })  => acc + item.quantity, 0)}</span>
        </Link>
      </nav>
    </header>
  )
}
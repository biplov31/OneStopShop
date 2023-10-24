import { useContext } from "react";
import { ProductType } from '../../pages/Home/Home'; // CartItemType depends on ProductType
import { CartContextType, CartContext, CartItemType } from "../../contexts/CartContext";
import CartStyles from './Cart.module.css';

export const Cart = () => {
  const context = useContext<CartContextType | null>(CartContext);
  const { cart, removeFromCart, clearCart } = context || {};

  return (
    <main>
      {/* {JSON.stringify(cart)} */}
      <h2>Your cart</h2>
      <div className={CartStyles["cart-items"]}>
        {cart && cart.length > 0 ? (
          cart.map((cartItem: CartItemType) => (
            <>
              <div key={cartItem.id} className={CartStyles["individual-item"]}>
                <img className={CartStyles["cart-item-img"]} src={cartItem.image} alt={cartItem.title} />
                <div className={CartStyles["cart-item-detail"]}>
                  <strong>{cartItem.title}</strong>
                  <span>Price: ${cartItem.price}</span>
                  <span>Quantity: {cartItem.quantity}</span>
                </div>
                <button className={CartStyles["cancel-btn"]} onClick={() => removeFromCart?.(cartItem.id)}></button>
              
              </div>
            </>
          )
          
          )
          ) : (
            <p className={CartStyles["page-info-text"]}>Your cart is empty.</p>
          )}        
          {cart && cart.length > 0 &&
            <>
              <strong className={CartStyles["total-cost"]}>Total = ${cart?.reduce((acc: number, item: CartItemType) => acc + item.price * item.quantity, 0) || 0}</strong>
              <button className={`${CartStyles["checkout-btn"]} ${CartStyles.btn}`} onClick={() => clearCart?.()}>Checkout</button>
            </>
          }
      </div>
    </main>
  )
}
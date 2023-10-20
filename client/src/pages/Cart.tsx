import { useContext } from "react";
import { CartContextType, CartContext, CartItemType } from "../contexts/CartContext";

export const Cart = () => {
  const context = useContext<CartContextType | null>(CartContext);
  const { cart, removeFromCart, clearCart } = context || {};

  return (
    <main>
      {/* {JSON.stringify(cart)} */}
      <h2>Your cart</h2>
      <div className="cart-items item-list">
        {cart && cart.length > 0 ? (
          cart.map((cartItem: CartItemType) => (
            <>
              <div key={cartItem.id} className="search-result individual-item">
                <img className="cart-item-img" src={cartItem.image} alt={cartItem.title} />
                <div className="cart-item-detail">
                  <strong>{cartItem.title}</strong>
                  <span>Price: ${cartItem.price}</span>
                  <span>Quantity: {cartItem.quantity}</span>
                </div>
                <button className="cancel-btn" onClick={() => removeFromCart?.(cartItem.id)}></button>
              
              </div>
            </>
          )
          
          )
          ) : (
            <p className="page-info-text">Your cart is empty.</p>
          )}        
          {cart && cart.length > 0 &&
            <>
              <strong className="total-cost">Total = ${cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0}</strong>
              <button className="checkout-btn btn" onClick={() => clearCart?.()}>Checkout</button>
            </>
          }
      </div>
    </main>
  )
}
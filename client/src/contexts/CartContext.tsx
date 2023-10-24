import { createContext, useState, ReactNode } from 'react';
import { ProductType } from '../pages/Home/Home.tsx';

export type CartItemType = ProductType & {
  quantity: number;
}

export type CartContextType = {
  cart: CartItemType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[] | []>([]);

  const addToCart = (product: ProductType) => {
    const existingItem = cart.find((cartItem) => cartItem.id === product.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === cartItem.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { ProductType } from "./Home";
import { Loading } from "../components/Loading";

export type ProductDetailType = {
  data: ProductType;
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
}

export const ProductDetail = () => {
  const { id } = useParams();
  const context = useContext(CartContext);
  const { addToCart } = context || {};

  const fetchProduct = async () => {
    if (id) {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      return res.json();
    }
  }

  const { data: product, isLoading, isError, error } = useQuery(['products'], fetchProduct) as ProductDetailType;

  if (isError) {
    return <h3>Error fetching products: {JSON.stringify(error)}</h3>
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <main>
      {product.image ?
        <div className="product-detail">
          <img src={product.image} alt={product.title} />
          <div className="product-info">
            <h3>{product.title}</h3>
            <span className="product-price">${product.price}</span>
            <p>{product.description}</p>
            <button className="btn" onClick={() => addToCart && addToCart(product)}>Add to cart</button>
          </div>
        </div>
        : <Loading />
      }
    </main>
  )
}
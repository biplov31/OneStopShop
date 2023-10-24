import ProductStyles from './Product.module.css';

type ProductProps = {
  title: string,
  price: number,
  image: string,
}

export const Product = ({ title, price, image }: ProductProps) => {
  return (
    <div className={ProductStyles["product-card"]}>
      <img loading="lazy" src={image} alt={title} />
      <strong>{title}</strong>
      <span>${price}</span>
    </div>    
  )
}
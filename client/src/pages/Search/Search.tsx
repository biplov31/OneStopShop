import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ProductType } from '../Home/Home.tsx';
import SearchStyles from './Search.module.css';

export type SearchType = {
  data: ProductType;
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
}

export const Search = () => {
  const [searchTerm, setSearchTerm]  = useState<string | null>('');
  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | null>(null);

  const fetchProducts = async (): Promise<ProductType[]> => {
    const res = await fetch('https://fakestoreapi.com/products?limit=30');
    const data = await res.json() as ProductType[];
    return data;
  }

  const { data: products } = useQuery(['products'], fetchProducts);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (products && searchTerm) {
      const filtered: ProductType[] = products.filter((product: ProductType) => (product.title.toLowerCase().includes(searchTerm.toLowerCase())));
      setFilteredProducts(filtered);
    }
  }
  
  return (
    <main>
      <input 
        type="text" 
        className={SearchStyles.searchbar}
        placeholder="Search for products" 
        onChange={(e) => handleChange(e)} 
      />
      {searchTerm ? (
        <div className={SearchStyles["search-results"]}>
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <div className={SearchStyles["search-result"]}>
                  <img src={product.image} alt={product.title} />
                  <span>{product.title}</span>
                </div>
              </Link>
            ))
          ) : (
            <p className={SearchStyles['page-info-text']}>No products found.</p>
          )}
        </div>
      ) : (
        <p className={SearchStyles['page-info-text']}>Search results will appear here.</p>
      )}
    </main>
  )
}
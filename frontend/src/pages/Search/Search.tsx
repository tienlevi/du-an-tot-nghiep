import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { paginationItems, SplOfferData } from '../../constants/index';
import { Product } from '../../types/product';

const SearchPage = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  console.log(SplOfferData);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      const filtered = SplOfferData.filter(
        (item: Product) =>
          item.name?.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  }, [location.search]);

  return (
    <div className="max-w-container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((item: Product) => (
          <div key={item._id} className="border p-4 rounded-lg shadow">
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-[300px] object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>{item.description}</p>
            <p className="text-primeColor font-bold">${item.price}</p>
          </div>
        ))}
        {filteredProducts.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
};

export default SearchPage;

import React from 'react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedMilk, setSelectedMilk] = React.useState<string>('whole');
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      product,
      quantity: 1,
      options: {
        milk: selectedMilk as 'whole' | 'semi' | 'oat' | 'almond' | 'soy',
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-lg font-bold mb-2">£{product.price.toFixed(2)}</p>
      
      {product.options?.milks && (
        <select
          className="mb-2 p-2 border rounded"
          value={selectedMilk}
          onChange={(e) => setSelectedMilk(e.target.value)}
        >
          <option value="whole">Whole Milk</option>
          <option value="semi">Semi-Skimmed Milk</option>
          <option value="oat">Oat Milk</option>
          <option value="almond">Almond Milk</option>
          <option value="soy">Soy Milk</option>
        </select>
      )}
      
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { CategoryGrid } from './components/CategoryGrid';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { useProducts } from './hooks/useProducts';
import { Category } from './types';

const CategoryPage = () => {
  const { category } = useParams<{ category: Category }>();
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error loading products. Please try again later.
      </div>
    );
  }

  return <CategoryGrid products={products} category={category || 'Coffees'} />;
};

function App() {
  const categories: Category[] = ['Coffees', 'Teas', 'Cakes', 'Hot Chocolate'];
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl md:text-3xl font-bold text-gray-900">
                Mobile Coffee Shop
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
            <nav className={`mt-4 ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-center"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6 mt-32">
          <Routes>
            <Route path="/" element={<CategoryPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>

        {/* Shopping Cart */}
        <Cart />
      </div>
    </BrowserRouter>
  );
}

export default App;
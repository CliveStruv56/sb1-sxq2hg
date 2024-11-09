import React from 'react';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { items, removeItem, total } = useCartStore();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      {/* Mobile Cart Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed bottom-4 right-4 md:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
        aria-label="Toggle cart"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Cart Panel */}
      <div className={`fixed inset-x-0 bottom-0 transform ${isExpanded ? 'translate-y-0' : 'translate-y-full'} md:translate-y-0 transition-transform duration-300 ease-in-out md:right-0 md:left-auto md:w-96 md:m-4 bg-white rounded-t-lg md:rounded-lg shadow-lg p-4 z-40`}>
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-xl font-bold">Your Order</h2>
          <button onClick={() => setIsExpanded(false)} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="hidden md:block mb-4">
          <h2 className="text-xl font-bold">Your Order</h2>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.options.milk}`} className="flex justify-between items-center mb-2 p-2 hover:bg-gray-50 rounded">
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-600">
                  {item.options.milk && `${item.options.milk} milk`}
                </p>
                <p className="text-sm">Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <span className="mr-4">
                  £{(item.product.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-bold mb-4">
            <span>Total:</span>
            <span>£{total.toFixed(2)}</span>
          </div>
          
          <button
            onClick={() => {
              navigate('/checkout');
              setIsExpanded(false);
            }}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};
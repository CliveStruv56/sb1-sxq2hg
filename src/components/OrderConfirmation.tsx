import React from 'react';
import { useNavigate } from 'react-router-dom';

export const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p>Your order has been successfully placed.</p>
      </div>
      
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Return to Menu
      </button>
    </div>
  );
};
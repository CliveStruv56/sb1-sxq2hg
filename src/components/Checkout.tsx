import React from 'react';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { TimeSelection } from './TimeSelection';
import { checkSlotAvailability, bookTimeSlot } from '../services/timeSlots';

export const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [selectedDateTime, setSelectedDateTime] = React.useState<{ date: Date; time: string } | null>(null);

  const handleTimeConfirm = (date: Date, time: string) => {
    setSelectedDateTime({ date, time });
  };

  const handleSubmit = async () => {
    if (!selectedDateTime) return;

    setLoading(true);
    try {
      // Check if slot is still available
      const isAvailable = await checkSlotAvailability(
        selectedDateTime.date,
        selectedDateTime.time
      );

      if (!isAvailable) {
        alert('Sorry, this time slot is no longer available. Please select another time.');
        setSelectedDateTime(null);
        return;
      }

      // Create the order
      const orderRef = await addDoc(collection(db, 'orders'), {
        items,
        total,
        pickupDate: selectedDateTime.date,
        pickupTime: selectedDateTime.time,
        createdAt: new Date(),
      });

      // Book the time slot
      await bookTimeSlot(selectedDateTime.date, selectedDateTime.time, orderRef.id);

      clearCart();
      navigate('/confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Time Selection Component */}
      <div className="mb-6">
        <TimeSelection onConfirm={handleTimeConfirm} />
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
        {items.map((item) => (
          <div key={`${item.product.id}-${item.options.milk}`} className="flex justify-between mb-2">
            <span>
              {item.quantity}x {item.product.name}
              {item.options.milk && ` (${item.options.milk} milk)`}
            </span>
            <span>£{(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-3 pt-3 font-bold flex justify-between">
          <span>Total:</span>
          <span>£{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedDateTime || loading}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};
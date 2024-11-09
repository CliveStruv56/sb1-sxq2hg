import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqm49bAzlJwx2SaTXJQZwrBMMM8BtP_1U",
  authDomain: "bolt-coffee-shop.firebaseapp.com",
  projectId: "bolt-coffee-shop",
  storageBucket: "bolt-coffee-shop.firebasestorage.app",
  messagingSenderId: "921119001263",
  appId: "1:921119001263:web:59aa28f9f2ce17ebb6225a"
};

// Sample products data
const sampleProducts = [
  {
    name: 'Espresso',
    description: 'Strong and pure coffee shot',
    price: 2.50,
    category: 'Coffees',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500',
    options: { milks: true }
  },
  {
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    price: 3.20,
    category: 'Coffees',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500',
    options: { milks: true }
  },
  {
    name: 'English Breakfast',
    description: 'Classic black tea blend',
    price: 2.80,
    category: 'Teas',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=500',
    options: { milks: true }
  },
  {
    name: 'Carrot Cake',
    description: 'Moist cake with cream cheese frosting',
    price: 3.50,
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500'
  },
  {
    name: 'Classic Hot Chocolate',
    description: 'Rich and creamy hot chocolate',
    price: 3.00,
    category: 'Hot Chocolate',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500',
    options: { milks: true }
  }
];

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Initialize products collection
    console.log('Initializing products collection...');
    const productsRef = collection(db, 'products');
    
    // Delete existing products if any
    const existingProducts = await getDocs(productsRef);
    const deletePromises = existingProducts.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Add sample products
    const productPromises = sampleProducts.map(product => 
      addDoc(productsRef, product)
    );

    await Promise.all(productPromises);
    console.log('Products initialized successfully!');

    // Initialize orders collection
    console.log('Initializing orders collection...');
    const ordersRef = collection(db, 'orders');
    await addDoc(ordersRef, {
      createdAt: new Date(),
      initialized: true
    });
    console.log('Orders collection initialized!');

    // Initialize timeSlots collection
    console.log('Initializing timeSlots collection...');
    const timeSlotsRef = collection(db, 'timeSlots');
    await addDoc(timeSlotsRef, {
      createdAt: new Date(),
      initialized: true
    });
    console.log('TimeSlots collection initialized!');

    console.log('All collections initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run the initialization
initializeDatabase();
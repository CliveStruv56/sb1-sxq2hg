import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqm49bAzlJwx2SaTXJQZwrBMMM8BtP_1U",
  authDomain: "bolt-coffee-shop.firebaseapp.com",
  projectId: "bolt-coffee-shop",
  storageBucket: "bolt-coffee-shop.appspot.com",
  messagingSenderId: "921119001263",
  appId: "1:921119001263:web:59aa28f9f2ce17ebb6225a"
};

let db: ReturnType<typeof getFirestore>;

const initializeFirebase = async () => {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);

    // Enable offline persistence
    try {
      await enableIndexedDbPersistence(db);
      console.log('Offline persistence enabled');
    } catch (err: any) {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence available in one tab at a time');
      } else if (err.code === 'unimplemented') {
        console.warn('Browser doesn\'t support persistence');
      }
    }

    // Test connection
    const testRef = collection(db, 'products');
    await getDocs(testRef);
    console.log('Firebase connection successful');
    
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return false;
  }
};

// Initialize immediately
initializeFirebase().catch(console.error);

export { db, initializeFirebase };
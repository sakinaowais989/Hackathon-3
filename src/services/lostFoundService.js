import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';

export const submitLostFound = async (data, userId, type) => {
  try {
    const docRef = await addDoc(collection(db, 'lostFound'), {
      ...data,
      type, // 'lost' or 'found'
      userId,
      status: 'active',
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserLostFound = async (userId) => {
  try {
    const q = query(
      collection(db, 'lostFound'), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllLostFound = async () => {
  try {
    const q = query(
      collection(db, 'lostFound'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
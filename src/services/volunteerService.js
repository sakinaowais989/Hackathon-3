import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';

export const registerVolunteer = async (volunteerData, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'volunteers'), {
      ...volunteerData,
      userId,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserVolunteering = async (userId) => {
  try {
    const q = query(
      collection(db, 'volunteers'), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const volunteers = [];
    querySnapshot.forEach((doc) => {
      volunteers.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: volunteers };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllVolunteerEvents = async () => {
  try {
    const q = query(
      collection(db, 'volunteers'),
      where('status', '==', 'approved'),
      orderBy('eventDate', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: events };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
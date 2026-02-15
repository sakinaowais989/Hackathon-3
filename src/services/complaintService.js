import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';

export const submitComplaint = async (complaintData, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'complaints'), {
      ...complaintData,
      userId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserComplaints = async (userId) => {
  try {
    const q = query(
      collection(db, 'complaints'), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const complaints = [];
    querySnapshot.forEach((doc) => {
      complaints.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: complaints };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateComplaint = async (complaintId, updates) => {
  try {
    const complaintRef = doc(db, 'complaints', complaintId);
    await updateDoc(complaintRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
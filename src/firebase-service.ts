import { db } from './firebase-config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const addReviewToFirestore = async (review: string, userId: string) => {
  try {
    const reviewsCollection = collection(db, 'reviews');
    await addDoc(reviewsCollection, {
      review,
      userId,
      timestamp: new Date(),
    });
    console.log('Review added!');
  } catch (error) {
    console.error('Error adding review: ', error);
  }
};

export const getReviewsFromFirestore = async () => {
  try {
    const reviewsCollection = collection(db, 'reviews');
    const reviewsSnapshot = await getDocs(reviewsCollection);
    const reviewsList = reviewsSnapshot.docs.map(doc => doc.data());
    return reviewsList;
  } catch (error) {
    console.error('Error fetching reviews: ', error);
    return [];
  }
};
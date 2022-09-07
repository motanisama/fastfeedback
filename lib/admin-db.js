import { compareDesc, parseISO } from 'date-fns';
import { firestore } from './db-admin';

export async function getAllFeedback(sitId) {
   try {
      const feedbackRef = firestore
         .collection('feedback')
         .where('siteid', '==', sitId);
      const snapshot = await feedbackRef.get();

      const feedback = [];

      snapshot.forEach((doc) => {
         feedback.push({
            id: doc.id,
            ...doc.data()
         });
      });

      feedback.sort((a, b) =>
         compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
      );

      return { feedback };
   } catch (errror) {
      return { error };
   }
}

export async function getAllSites() {
   try {
      const snapshot = await firestore.collection('sites').get();
      const sites = [];

      snapshot.forEach((doc) => {
         sites.push({ id: doc.id, ...doc.data() });
      });

      return { sites };
   } catch (error) {
      return { error };
   }
}

export async function getUserSites(userId) {
   const snapshot = await firestore
      .collection('sites')
      .where('authorId', '==', userId)
      .get();
   const sites = [];

   snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
   });

   return { sites };
}

export async function getUserFeedback(userId) {
   const snapshot = await firestore
      .collection('feedback')
      .where('authorid', '==', userId)
      .get();
   const feedback = [];

   snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
   });

   return { feedback };
}

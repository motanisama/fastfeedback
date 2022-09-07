import {
   getFirestore,
   doc,
   setDoc,
   addDoc,
   collection,
   deleteDoc
} from 'firebase/firestore';
import firebase from './firebase';

const firestore = getFirestore(firebase);

export async function createUser(uid, data) {
   const userRef = doc(firestore, 'users', uid);

   try {
      return await setDoc(userRef, { ...data }, { merge: true });
   } catch (error) {
      console.log(error);
   }
}

export async function createWebsite(data) {
   const docRef = doc(collection(firestore, 'sites'));

   try {
      await setDoc(docRef, data);
      return docRef.id;
   } catch (error) {
      console.log(error);
   }
}

export async function createFeedback(data) {
   const docRef = collection(firestore, 'feedback');

   try {
      return await addDoc(docRef, data);
   } catch (error) {
      console.log(error);
   }
}

export async function deleteFeedback(id) {
   const docRef = doc(firestore, 'feedback', id);
   return await deleteDoc(docRef);
}

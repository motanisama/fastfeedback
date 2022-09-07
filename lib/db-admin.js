import admin from 'firebase-admin';

// var serviceAccount = require('../fast-feed-back-480e0-firebase-adminsdk-q5hku-f4c2045b7a.json');

if (admin.apps.length === 0) {
   admin.initializeApp({
      credential: admin.credential.cert({
         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
         privateKey: process.env.FIREBASE_PRIVATE_KEY,
         projectId: proces.env.FIREBASE_PROJECT_ID
      })

   });
}




const auth = admin.auth();
const firestore = admin.firestore();
export { auth, firestore };

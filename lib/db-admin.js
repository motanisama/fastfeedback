import admin from 'firebase-admin';

var serviceAccount = require('../fast-feed-back-480e0-firebase-adminsdk-q5hku-f4c2045b7a.json');

if (admin.apps.length === 0) {
   admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
   });
}
const auth = admin.auth();
const firestore = admin.firestore();
export { auth, firestore };

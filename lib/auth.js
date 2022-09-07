import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebase } from './firebase';
import {
   signInWithEmailAndPassword,
   signOut,
   GithubAuthProvider,
   signInWithPopup,
   GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { createUser } from './db';
import Cookies from 'js-cookie';
import { Router, useRouter } from 'next/router';

const authContext = createContext();

export function ProviderAuth({ children }) {
   const authFunctions = useProviderAuth();
   return (
      <authContext.Provider value={authFunctions}>
         {children}
      </authContext.Provider>
   );
}

export const useAuth = () => {
   return useContext(authContext);
};

function useProviderAuth() {
   const [user, setUser] = useState(null);
   const router = useRouter();

   const handleUser = (rawUser) => {
      if (rawUser) {
         const user = formatUser(rawUser);
         const { token, ...userWithOutToken } = user;
         createUser(user.uid, userWithOutToken);

         setUser(user);
         Cookies.set('fast-feedback-auth', 'true', {
            expires: 1
         });
         return user;
      } else {
         router.push('/');
         setUser(false);
         Cookies.remove('fast-feedback-auth');
         return false;
      }
   };

   const signinwithGit = () => {
      const provider = new GithubAuthProvider();
      return signInWithPopup(auth, provider).then((response) => {
         handleUser(response.user);
         //  setUser(response.user);
         //  return response.user;
      });
   };

   const signinwithGoogle = () => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider).then((response) => {
         handleUser(response.user);
         //  setUser(response.user);
         //  return response.user;
      });
   };

   const signout = () => {
      return signOut(auth).then(() => {
         //  setUser(false);
         handleUser();
      });
   };

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         if (user) {
            handleUser(user);
         } else {
            handleUser();
         }
      });
      return () => unsubscribe();
   }, []);

   return {
      user,
      signinwithGoogle,
      signinwithGit,
      signout
   };
}
const formatUser = (user) => {
   return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      token: user.accessToken,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL
   };
};

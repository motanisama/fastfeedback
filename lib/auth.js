import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebase } from './firebase';
import {
   signInWithEmailAndPassword,
   signOut,
   GithubAuthProvider,
   signInWithPopup
} from 'firebase/auth';
import { auth } from '../lib/firebase';

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
   console.log(user);
   const provider = new GithubAuthProvider();

   const signin = (email, password) => {
      return signInWithPopup(auth, provider).then((response) => {
         setUser(response.user);
         return response.user;
      });
   };

   const signout = () => {
      return signOut().then(() => {
         setUser(false);
      });
   };

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         if (user) {
            setUser;
         } else {
            setUser(false);
         }
      });
      return () => unsubscribe();
   }, []);

   return {
      user,
      signin,
      signout
   };
}

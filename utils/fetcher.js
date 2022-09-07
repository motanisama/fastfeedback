import { headers } from 'next.config';

export default async (url, token) => {
   console.log('fetching data');
   const res = await fetch(url, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json', token }),
      credentials: 'same-origin'
   });
   return res.json();
};

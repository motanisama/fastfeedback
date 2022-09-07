import { getAllSites, getUserSites, getUserFeedback } from '@/lib/admin-db';
import { auth } from '@/lib/db-admin';

export default async (req, res) => {
   try {
      console.log('getting feedback');
      const { uid } = await auth.verifyIdToken(req.headers.token);
      const { feedback } = await getUserFeedback(uid);
      res.status(200).json({ feedback });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
   }
};

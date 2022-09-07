import { getAllSites, getUserSites } from '@/lib/admin-db';
import { auth } from '@/lib/db-admin';

export default async (req, res) => {
   try {
      const { uid } = await auth.verifyIdToken(req.headers.token);
      const sites = await getUserSites(uid);
      res.status(200).json(sites);
   } catch (error) {
      res.status(500).json({ error: error });
   }
};

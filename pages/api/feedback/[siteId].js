import { getAllFeedback } from '@/lib/admin-db';

export default async (req, res) => {
   const siteId = req.query.siteId;

   const { feedback, error } = await getAllFeedback(siteId);

   if (result.error) {
      res.status(500).json({ error: error });
   }

   res.status(200).json({ feedback });
};

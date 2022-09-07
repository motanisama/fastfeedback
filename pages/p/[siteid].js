import Feedback from '@/components/Feedback';
import { getAllFeedback, getAllSites } from '@/lib/admin-db';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import {
   Box,
   Button,
   FormControl,
   FormHelperText,
   FormLabel,
   Input
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export async function getStaticProps(context) {
   //getstatic props return data as props to react componenet
   const siteId = context.params.siteid;
   const { feedback } = await getAllFeedback(siteId);
   return {
      props: {
         initialFeedback: feedback
      },
      revalidate: 1
      // will be passed to the page component as props
   };
}
export async function getStaticPaths() {
   // creates all static paths for each feedback page

   const { sites } = await getAllSites();
   const paths = sites.map((site) => ({
      params: {
         siteid: site.id.toString()
      }
   }));
   return {
      paths: paths,
      fallback: false // can also be true or 'blocking'
   };
}

export default function SiteFeedback({ initialFeedback }) {
   console.log(initialFeedback);
   const auth = useAuth();
   const router = useRouter();
   const inputEl = useRef(null);
   const [allFeedBack, setAllFeedback] = useState(initialFeedback);

   const onSubmit = (e) => {
      e.preventDefault();
      const newFeedBack = {
         author: auth.user.name,
         authorid: auth.user.uid,
         siteid: router.query.siteid,
         text: inputEl.current.value,
         createdAt: new Date().toISOString(),
         provider: auth.user.provider,
         status: 'pending'
      };

      setAllFeedback([newFeedBack, ...allFeedBack]);
      createFeedback(newFeedBack);
   };

   return (
      <Box
         display={'flex'}
         flexDirection="column"
         width={'full'}
         maxWidth="700px"
         margin={'0 auto'}
      >
         <Box as="form" onSubmit={onSubmit}>
            <FormControl my={8}>
               <FormLabel htmlFor="comment">Comment</FormLabel>
               <Input ref={inputEl} type="comment" id="comment" />
               <Button mt={2} type="submit" fontWeight={'medium'}>
                  Add Comment
               </Button>
            </FormControl>
         </Box>
         {allFeedBack?.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
         ))}
      </Box>
   );
}

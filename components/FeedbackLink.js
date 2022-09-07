import { Flex, Link } from '@chakra-ui/react';

export default function FeedbackLink({ siteid }) {
   return (
      <Flex justifyContent={'space-between'} mb={8} width="full" mt={1}>
         <Link fontWeight={'bold'} fontSize="sm" href={`/p/${siteid}`}>
            {'Leave a comment ->'}
         </Link>
         <Link fontSize="xs" color={'blackAlpha.500'} href="/">
            Powered by Fast Feedback
         </Link>
      </Flex>
   );
}

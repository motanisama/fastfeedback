import React from 'react';
import {
   Flex,
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Heading
} from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

const FeedbackTableHeaders = () => {
   return (
      <>
         <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
               <BreadcrumbLink color="gray.700" fontSize={'sm'}>
                  Feedback
               </BreadcrumbLink>
            </BreadcrumbItem>
         </Breadcrumb>
         <Flex justifyContent={'space-between'} w="100%">
            <Heading mb={8}>My Feedback</Heading>
         </Flex>
      </>
   );
};

export default FeedbackTableHeaders;

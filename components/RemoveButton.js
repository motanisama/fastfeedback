import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogContent,
   AlertDialogOverlay,
   useDisclosure,
   Button,
   IconButton
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';

import React from 'react';
import { deleteFeedback } from '@/lib/db';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';
import { async } from '@firebase/util';

function RemoveButton({ feedbackId }) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const cancelRef = React.useRef();
   const auth = useAuth();

   const onDeleteFeedback = () => {
      console.log(feedbackId);
      deleteFeedback(feedbackId);
      mutate(
         ['/api/feedback', auth.user.token],
         async (data) => {
            return {
               feedback: data.feedback.filter(
                  (feedback) => feedback.id !== feedbackId
               )
            };
         },
         false
      );
      onClose();
   };

   return (
      <>
         <IconButton icon={<DeleteIcon />} variant="ghost" onClick={onOpen} />

         <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                     Delete Feedback
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button
                        colorScheme="red"
                        onClick={onDeleteFeedback}
                        ml={3}
                     >
                        Delete
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
      </>
   );
}

export default RemoveButton;

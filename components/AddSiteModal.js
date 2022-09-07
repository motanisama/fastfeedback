import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   FormControl,
   FormLabel,
   useDisclosure,
   Input
} from '@chakra-ui/react';

import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { createWebsite } from '../lib/db';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../lib/auth';
import { mutate } from 'swr';
import { async } from '@firebase/util';

function AddSiteModal({ children }) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const initialRef = useRef();
   const toast = useToast();
   const auth = useAuth();
   console.log('here!');

   const onCreateSite = async ({ name, url }) => {
      const newSite = {
         authorId: auth.user.uid,
         createdAt: new Date().toISOString(),
         name,
         url
      };

      const id = await createWebsite(newSite);

      toast({
         title: 'Success!',
         description: "We've added your site.",
         status: 'success',
         duration: 5000,
         isClosable: true
      });
      // locally mutating data without validating
      mutate(
         ['/api/sites', auth.user.token],
         async (data) => ({
            sites: [{ id, ...newSite }, ...data.sites]
         }),
         false
      );
      onClose();
   };
   const {
      handleSubmit,
      register,
      formState: { errors }
   } = useForm();

   return (
      <>
         <Button
            onClick={onOpen}
            backgroundColor="gray.900"
            fontWeight={'medium'}
            color="white"
            _hover={{ bg: 'gray.700' }}
            _active={{
               bg: 'gray.800',
               transform: 'scale(0.95)'
            }}
            variant="solid"
            size="md"
            maxW={'200px'}
         >
            {children}
         </Button>

         <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as={'form'} onSubmit={handleSubmit(onCreateSite)}>
               <ModalHeader fontWeight={'bold'}>Add Site</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <FormControl>
                     <FormLabel>Name</FormLabel>
                     <Input
                        ref={initialRef}
                        placeholder="My site"
                        name="name"
                        {...register('name', {
                           required: 'Required'
                        })}
                     />
                  </FormControl>

                  <FormControl mt={4}>
                     <FormLabel>Link</FormLabel>
                     <Input
                        placeholder="https://website.com"
                        name="url"
                        {...register('url', {
                           required: 'Required'
                        })}
                     />
                  </FormControl>
               </ModalBody>

               <ModalFooter>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button background={'#99FFFE'} mr={3} type="submit">
                     Create
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
}

export default AddSiteModal;

import React from 'react';
import {
   ChakraProvider,
   Flex,
   Link,
   Stack,
   Icon,
   Avatar,
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Heading,
   Box,
   Text,
   Button
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { HomeIcon } from '../styles/icons';
import { useAuth } from '../lib/auth';
import AddSiteModal from './AddSiteModal';
import NextLink from 'next/link';

const DashBoardShell = ({ children }) => {
   const auth = useAuth();

   return (
      <Flex flexDirection="column">
         <Flex
            backgroundColor="white"
            justifyContent="space-between"
            alignItems="center"
            py={4}
            px={8}
         >
            <Stack spacing={4} isInline alignItems="center">
               <NextLink href="/">
                  <HomeIcon color="black" fontSize={'24px'} />
               </NextLink>
               <NextLink href="/dashboard">
                  <Link mr={4}>Sites</Link>
               </NextLink>
               <NextLink href="/feedback">
                  <Link>Feedback</Link>
               </NextLink>
            </Stack>
            <Flex alignItems="center">
               {auth.user && (
                  <Button
                     variant={'ghost'}
                     mr={2}
                     onClick={() => auth.signout()}
                  >
                     Log Out
                  </Button>
               )}
               <Avatar src={auth?.user?.photoUrl} />
            </Flex>
         </Flex>
         <Flex backgroundColor="gray.100" p={8} height="100vh">
            <Flex
               flexDirection="column"
               maxWidth="800px"
               alignItems="flex-start"
               ml="auto"
               mr="auto"
               w="100%"
            >
               {children}
            </Flex>
         </Flex>
      </Flex>
   );
};
export default DashBoardShell;

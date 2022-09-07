import { useAuth } from '@/lib/auth';

import { Button, Code, Heading, Text, Icon, Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import EmptyState from '../components/EmptyState';
import { GitHubIcon, GoogleIcon, HomeIcon } from '../styles/icons';

export default function Home() {
   const auth = useAuth();

   return (
      <div>
         <Head>
            <title>Fast Feedback</title>
            <script
               dangerouslySetInnerHTML={{
                  __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `
               }}
            />
         </Head>
         <Flex
            as="main"
            direction="column"
            justify={'center'}
            align={'center'}
            h="100vh"
         >
            <HomeIcon color={'black'} fontSize="64px" />

            {auth?.user ? (
               <Button onClick={(e) => auth.signout()}>Sign out</Button>
            ) : (
               <Button
                  leftIcon={<GitHubIcon />}
                  mt={4}
                  onClick={(e) => auth.signinwithGit()}
                  backgroundColor="gray.900"
                  color="white"
                  fontWeight={'medium'}
                  size="lg"
                  _hover={{ bg: 'gray.700' }}
                  _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
               >
                  Sign In with GitHub
               </Button>
            )}

            {auth?.user ? (
               <Button
                  as="a"
                  mt={4}
                  href="/dashboard"
                  backgroundColor="white"
                  color="gray.900"
                  variant={'ghost'}
                  fontWeight={'medium'}
                  size="lg"
                  _hover={{ bg: 'gray.100' }}
                  _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
               >
                  View Dashboard
               </Button>
            ) : (
               <Button
                  leftIcon={<GoogleIcon />}
                  mt={4}
                  onClick={(e) => auth.signinwithGoogle()}
                  backgroundColor="white"
                  color="gray.900"
                  variant={'ghost'}
                  fontWeight={'medium'}
                  size="lg"
                  _hover={{ bg: 'gray.100' }}
                  _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
               >
                  Sign In with Google
               </Button>
            )}
         </Flex>
      </div>
   );
}

import React from 'react';
import { Heading, Box, Text, Button } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { HomeIcon } from '../styles/icons';
import DashBoardShell from './DashboardShell';

const FreePlanEmptyState = () => (
   <DashBoardShell>
      <Box width="100%" backgroundColor="white" borderRadius={8} p={8}>
         <Heading size="md" as="h2">
            Get feedback on your site instantly.
         </Heading>
         <Text>Start today, then grow with us</Text>
         <Button variant="solid" size="md">
            Upgrade to Starter
         </Button>
      </Box>
   </DashBoardShell>
);
export default FreePlanEmptyState;

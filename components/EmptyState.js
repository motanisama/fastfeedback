import React from 'react';
import { Heading, Box, Text, Button, Flex } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { HomeIcon } from '../styles/icons';
import DashBoardShell from './DashboardShell';
import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
   <Flex
      width="100%"
      backgroundColor="white"
      borderRadius={8}
      p={16}
      justify="center"
      align={'center'}
      direction="column"
   >
      <Heading size="lg" as="h2" mb={2}>
         {"You haven't added any sites"}
      </Heading>
      <Text mb={4}>{"Welcome Let's get started"}</Text>
      <AddSiteModal>Add your first Site</AddSiteModal>
   </Flex>
);
export default EmptyState;

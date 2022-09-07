import React from 'react';
import NextLink from 'next/link';
import { Box, Code, IconButton, Link, Switch } from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { DeleteIcon } from '@chakra-ui/icons';

import { Table, Tr, Th, Td } from './Table';
import RemoveButton from './RemoveButton';

const FeedBackTable = ({ allfeedback }) => {
   return (
      <Box overflowX="scroll" w="full">
         <Table w="full">
            <thead>
               <Tr>
                  <Th>Name</Th>
                  <Th>Feedback</Th>
                  <Th>Route</Th>
                  <Th>Visible</Th>
                  <Th width="50px">{''}</Th>
               </Tr>
            </thead>
            <tbody>
               {allfeedback.map((feedback, index) => (
                  <Box as="tr" key={feedback.id}>
                     <Td>{feedback.name}</Td>
                     <Td>{feedback.text}</Td>
                     <Td>
                        <Code>{'/'}</Code>
                     </Td>
                     <Td>
                        <Switch
                           colorScheme={'green'}
                           defaultValue={feedback.status === 'active'}
                        />
                     </Td>
                     <Td>
                        {/* <IconButton icon={<DeleteIcon />} variant="ghost" /> */}
                        <RemoveButton feedbackId={feedback.id} />
                     </Td>
                  </Box>
               ))}
            </tbody>
         </Table>
      </Box>
   );
};

export default FeedBackTable;

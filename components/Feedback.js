import React from 'react';
import {
   Box,
   Heading,
   Text,
   Divider,
   Icon,
   Flex,
   Code
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

const Feedback = ({
   authorid,
   text,
   createdAt,
   provider,
   isLast,
   settings
}) => {
   return (
      <Box borderRadius={4} maxWidth="700px" w="full">
         <Flex align="center">
            <Heading size="sm" as="h3" mb={0} fontWeight="medium">
               {authorid}
            </Heading>
            {settings?.icons && (
               <Icon name={provider.slice(0, -4)} size="13px" ml="6px" />
            )}
         </Flex>

         <Text color="gray.500" mb={4} fontSize="xs">
            {format(parseISO(createdAt), 'PPpp')}
         </Text>
         <Text color="gray.800">{text}</Text>

         {/* <Box>
            <ReactMarkdown
               source={text}
               renderers={{
                  paragraph: MDXComponents.p,
                  blockquote: MDXComponents.blockquote,
                  link: MDXComponents.a,
                  list: MDXComponents.ul,
                  listItem: MDXComponents.li,
                  table: MDXComponents.table,
                  tableHead: MDXComponents.th,
                  tableCell: MDXComponents.td,
                  code: ({ value }) => (
                     <pre>
                        <Code borderRadius={8} p={4} my={4}>
                           {value}
                        </Code>
                     </pre>
                  ),
                  inlineCode: MDXComponents.inlineCode
               }}
            />
         </Box>
         {!isLast && <Divider mt={6} mb={6} />} */}
      </Box>
   );
};

export default Feedback;

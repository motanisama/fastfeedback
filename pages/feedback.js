import { useAuth } from '@/lib/auth';

import { Button, Code, Heading, Text, Icon, Box, Flex } from '@chakra-ui/react';
import DashBoardShell from '../components/DashboardShell';
import EmptyState from '../components/EmptyState';
import SiteTableSkeleton from '../components/SiteTabelSkeleton';
import { HomeIcon } from '../styles/icons';

import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import SiteTable from '../components/SiteTable';
import FeedBackTable from '@/components/FeedBackTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import FeedbackTableHeaders from '@/components/FeedbackTableHeaders';

export default function myFeedback() {
   const auth = useAuth();

   const { data } = useSWR(
      auth.user ? ['/api/feedback', auth.user.token] : null,
      fetcher
   );

   console.log('data:', data);

   if (!data) {
      console.log('no data');
      return (
         <DashBoardShell>
            <FeedbackTableHeaders />
            <SiteTableSkeleton />
         </DashBoardShell>
      );
   }
   return (
      <DashBoardShell>
         <FeedbackTableHeaders />
         {data?.feedback?.length ? (
            <FeedBackTable allfeedback={data.feedback} />
         ) : (
            <EmptyState />
         )}
      </DashBoardShell>
   );
}

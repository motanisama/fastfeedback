import { useAuth } from '@/lib/auth';

import { Button, Code, Heading, Text, Icon, Box, Flex } from '@chakra-ui/react';
import DashBoardShell from '../components/DashboardShell';
import EmptyState from '../components/EmptyState';
import SiteTableSkeleton from '../components/SiteTabelSkeleton';
import { HomeIcon } from '../styles/icons';

import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import SiteTable from '../components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';

export default function Dashboard() {
   const auth = useAuth();

   const { data } = useSWR(
      auth.user ? ['/api/sites', auth.user.token] : null,
      fetcher
   );

   if (!data) {
      return (
         <DashBoardShell>
            <SiteTableHeader />
            <SiteTableSkeleton />
         </DashBoardShell>
      );
   }
   return (
      <DashBoardShell>
         <SiteTableHeader />
         {data?.sites?.length ? (
            <SiteTable sites={data.sites} />
         ) : (
            <EmptyState />
         )}
      </DashBoardShell>
   );
}

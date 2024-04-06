'use server'
import React from 'react';
import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import NameForm from '@/components/ui/AccountForms/NameForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import GalleryImageTable from '@/components/ui/ContentTables/GalleryImageTable';
import { useAccountDetails } from '@/lib/user/useUserServer';
import { Button } from '@chakra-ui/react'; // Assuming you're using Chakra UI based on your dependencies
import TikTokConnectButton from '@/components/ui/AuthForms/TikTokConnectButton'; // Adjust the path as necessary


export default async function Account() {
  const supabase = createClient();
  const userDetails: any = useAccountDetails();
  const subscription: any = useAccountDetails();


  return (
    <div>
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        ...
      </div>
      <div className="p-4">
        <CustomerPortalForm subscription={subscription} />
        <NameForm userName={userDetails?.full_name ?? ''} userEmail={''} />
        <GalleryImageTable />
        {/* Use the Client Component here */}
        <div className="mt-8 text-center">
          <TikTokConnectButton />
        </div>
      </div>
    </div>
  );
}
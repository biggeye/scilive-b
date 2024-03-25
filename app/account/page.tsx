'use server'
import React from 'react';
import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import NameForm from '@/components/ui/AccountForms/NameForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import GalleryImageTable from '@/components/ui/ContentTables/GalleryImageTable';
import { useAccountDetails } from '@/lib/user/useUserServer';

export default async function Account() {

  const supabase = createClient();
  const userDetails: any = useAccountDetails();
  const subscription: any = useAccountDetails();

  const handleTikApiSignIn = () => {
    'use client'
    redirect(`${process.env.NEXT_PUBLIC_TIKAPI_OAUTH_LINK}`);
  }


  return (
   <div>
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl sm:text-center sm:text-2xl">
            Subscription Management / Site Settings.
          </p>
        </div>
      </div>
      <div className="p-4">
        <button onClick={handleTikApiSignIn}>Connect TikToK</button>
        <CustomerPortalForm subscription={subscription} />
        <NameForm userName={userDetails?.full_name ?? ''} userEmail={''} />
        <GalleryImageTable />
    
    </div>
    </div>
  );
}

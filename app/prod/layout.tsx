'use client'
import React, { Suspense, useEffect, useState } from "react";
import { AppShell, ErrorBoundary } from "@saas-ui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@saas-ui/auth";
import { SignOut } from "@/utils/auth-helpers/server";
//import components
import LoadingCircle from "@/components/ui/LoadingDots/LoadingCircle";
import DisplayResults from "@/components/prod/DisplayResults";
import NavbarAlpha from "@/components/NavbarAlpha";
//import UI
import { Box, Button, useToast, CircularProgress, VStack, Tooltip, useBreakpointValue } from '@chakra-ui/react';
//import state
import { globalLoadingState, predictionStatusState, predictionProgressState, finalPredictionState } from "@/state/replicate/prediction-atoms";

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const auth = true;
    const router = useRouter();

    const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);

    useEffect(() => {
        if (!auth) {
            if (!auth) {
                router.push('/signin');
            } else {
                setIsAuthCheckComplete(true);
            }
        }
    }, [auth, router]);



    if (!isAuthCheckComplete) {
        return <VStack><LoadingCircle /></VStack>;
    }


    const handleSignOut = async () => {
        const formData = new FormData();
        formData.append('path', '/signin');

        await SignOut(formData);
    }

    return (
        <ErrorBoundary>
            <Suspense fallback={<VStack><LoadingCircle /></VStack>}>
                <AppShell
                    navbar={<NavbarAlpha handleSignOut={handleSignOut} />}>

                    {children}

                </AppShell>
            </Suspense>
        </ErrorBoundary>
    );
};

export default DashboardLayout;
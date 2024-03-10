'use client'
import React, { useState, useEffect } from 'react';
import {
    Box, Spacer, IconButton, Image, useDisclosure, Menu,
    CircularProgress,
    MenuButton,
    MenuItem,
    MenuList,
    MenuGroup,
    MenuDivider,
    Link
} from '@chakra-ui/react';
import {
    AppShell,
    Sidebar,
    SidebarSection,
    SidebarOverlay,
    NavItem,
    NavGroup,
    PersonaAvatar,
    NavbarLink,
    Navbar
} from '@saas-ui/react'
import {
    FiHome,
    FiUsers,
    FiSettings,
    FiStar,
    FiChevronsLeft,
    FiChevronsRight,
} from 'react-icons/fi'
import Logo from '@/components/utils/Logo';
import SignOut from './ui/AuthForms/SignOut';
import ViewModeSwitch from './dashboard/ViewModeSwitch';
import { userProfileState } from '@/state/user/user_state-atoms';
import { useRecoilValue } from 'recoil';
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';

export default function SidebarNav() {
    const [user, setUser] = useState<Boolean>(false);
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true, })
    const userProfile = useRecoilValue(userProfileState);
    const auth = useAuth();
    const auth_id = auth.user?.id
    const profile_id = userProfile?.id;

    const { profileLoading, profileError } = useUserProfile();

    return (
        <Sidebar
            toggleBreakpoint={false}
            variant={isOpen ? 'default' : 'compact'}
            transition="width"
            transitionDuration="normal"
            width={isOpen ? '220px' : '14'}
            minWidth="auto"
        >
            <SidebarSection direction={isOpen ? 'row' : 'column'}>
                <Menu>
                    <MenuButton>
                        {profileLoading ? (<CircularProgress isIndeterminate />) : (
                            <PersonaAvatar
                                src={userProfile?.avatar_url || "https://scilive.cloud/avatar-icon.svg"}
                                name={userProfile?.full_name || ""}
                                borderRadius="full"
                                size="xs"
                                aria-label="User menu"
                                presence={auth.isAuthenticated ? "online" : "offline"}
                                display={isOpen ? "block" : "none"}
                            />
                        )}
                    </MenuButton>
                    <MenuList>
                        {auth.isAuthenticated ? (
                            <MenuGroup>
                                <MenuItem><div className="code">{userProfile?.full_name}</div></MenuItem>
                                <MenuDivider />
                                <MenuItem><Link href="/gallery">Gallery</Link></MenuItem>
                                <MenuItem><Link href="/account">Account</Link></MenuItem>
                                <MenuDivider />
                                <SignOut />
                            </MenuGroup>
                        ) : (
                            <MenuGroup>
                                <MenuDivider />
                                <MenuItem><Link href="/signin">Login / Signup</Link></MenuItem>
                            </MenuGroup>
                        )}
                    </MenuList>
                </Menu>
                <Spacer />
                <IconButton
                    onClick={onToggle}
                    variant="ghost"
                    size="sm"
                    icon={isOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
                    aria-label="Toggle Sidebar"
                />
            </SidebarSection>

            <SidebarSection flex="1" overflowY="auto" overflowX="hidden">
                <NavGroup title="Content Production">
                    <NavItem href="/dashboard/create-image"> - Create Images</NavItem>
                    <NavItem href="/dashboard/edit-image"> - Edit Images</NavItem>
                    <NavItem href="/dashboard/clone-voice"> - Clone Voice</NavItem>
                    <NavItem href="/dashboard/create-avatar"> - Create Avatar</NavItem>
                    <NavItem href="/dashboard/write-script"> - Write Script</NavItem>
                </NavGroup>

                <NavGroup title="Model Training">
                    <NavItem href="/train"> - Train SDXL Model</NavItem>
                </NavGroup>

                <NavGroup title="Your Account">
                    <NavItem href="/dashboard/assets"> - Gallery</NavItem>
                    <NavItem href="/account"> - Settings</NavItem>
                    <Spacer />
                </NavGroup>
            </SidebarSection>
            <SidebarOverlay zIndex="1" />
        </Sidebar>
    )
}
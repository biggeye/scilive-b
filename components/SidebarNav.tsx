'use client'
import React, {useState, useEffect} from 'react';
import { Box, Spacer, IconButton, Image, useDisclosure,     Menu,
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

export default function SidebarNav() {
        const { isOpen, onToggle } = useDisclosure({
        defaultIsOpen: true,
    })
    const userProfile = useRecoilValue(userProfileState);
    const [user, setUser] = useState<Boolean>(false);
    if (userProfile?.id) {
        setUser(true);
    }
    console.log("userProfile: ", userProfile);
    console.log("avatar_url: ", userProfile?.avatar_url);
    console.log("full_name: ", userProfile?.full_name);
    return (
        <Sidebar
            toggleBreakpoint={false}
            variant={isOpen ? 'default' : 'compact'}
            transition="width"
            transitionDuration="normal"
            width={isOpen ? '280px' : '14'}
            minWidth="auto"
        >
            <SidebarSection direction={isOpen ? 'row' : 'column'}>
            <Menu>
                    <MenuButton>
                        <PersonaAvatar
                            src={userProfile?.avatar_url || "https://scilive.cloud/avatar-icon.svg"}
                            name={userProfile?.full_name || ""}
                            borderRadius="full"
                            size="xs"
                            aria-label="User menu"
                            presence={ user ? "online" : "offline" }
                            display={ isOpen ?  "block" : "none" }
                        />
                    </MenuButton>
                    <MenuList>
                        {user ? (
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
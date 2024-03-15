'use client'
import React, { useState, useEffect } from 'react';
import {
    Box,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Stack,
    Link,
    Text,
    Spacer,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuGroup,
    MenuDivider,
    Tooltip,
} from '@chakra-ui/react';
import {
    ImageIcon,
    EditIcon,
    VoiceoverIcon,
    AddIcon,
    PhotosIcon,
    SettingsIcon,
    // Assuming MdScript and MdTraining are imported and exported correctly elsewhere in your code
} from '@/components/icons/UI';
import { PersonaAvatar, NavGroup, NavItem, Navbar, NavbarItem, NavbarLink, NavbarBrand, NavbarContent, PlusIcon } from '@saas-ui/react';
import Logo from '@/components/utils/Logo';
import SignOutButton from './ui/AuthForms/SignOutButton';
import ViewModeSwitch from './dashboard/ViewModeSwitch';
import { userProfileState } from '@/state/user/user_state-atoms';
import { useRecoilValue } from 'recoil';
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';
import { useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const NavbarAlpha = () => {
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const userProfile = useRecoilValue(userProfileState);
    const { profileLoading, profileError } = useUserProfile();
    const auth = useAuth();
    const router = useRouter();
    return (
        <>
            {!isMobile ? (
                // Non-mobile navbar rendering goes here...
                <Navbar
            minWidth="480px"
            bgGradient="linear(to-t, transparent, primary.50)"
            backdropFilter="blur(50px)"
            position="sticky"
            top="0"
            zIndex="banner"
        >
            <NavbarBrand>
                <IconButton
                    display="inline-flex"
                    icon={<Logo width="50px" height="50px" />}
                    onClick={onDrawerOpen}
                    aria-label="Open Menu"
                />
            </NavbarBrand>
            {auth.isAuthenticated &&
                <NavbarContent display={{ base: 'hidden', md: 'flex' }}
                    flexWrap="nowrap">

                    <NavbarItem>
                        <NavbarLink href="/dashboard">Production</NavbarLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavbarLink href="/dashboard/assets">Assets</NavbarLink>
                    </NavbarItem>

                </NavbarContent>
            }
            <NavbarContent as="div" justifyContent="end">
                <Menu>
                    <MenuButton>
                        <PersonaAvatar
                            src={userProfile?.avatar_url || "https://scilive.cloud/avatar-icon.svg"}
                            name={userProfile?.full_name || ""}
                            borderRadius="full"
                            size="xs"
                            aria-label="User menu"
                            presence={auth.isAuthenticated ? ("online") : ("offline")}
                        />
                    </MenuButton>
                    <MenuList>
                        {auth.isAuthenticated ? (
                            <MenuGroup>
                                <MenuItem><div className="code">{userProfile?.full_name}</div></MenuItem>
                                <MenuDivider />
                                <MenuItem><NavbarLink href="/dashboard/assets">Gallery</NavbarLink></MenuItem>
                                <MenuItem><NavbarLink href="/account">Account</NavbarLink></MenuItem>
                                <MenuDivider />
                                <SignOutButton />
                            </MenuGroup>
                        ) : (
                            <MenuGroup>
                                <MenuDivider />
                                <MenuItem><NavbarLink as="h3" href="/signin">Login / Signup</NavbarLink></MenuItem>
                            </MenuGroup>
                        )}
                    </MenuList>
                </Menu>
            </NavbarContent>
        </Navbar >
            ) : (
                <>
                <Tooltip label="Dashboard">
                <IconButton
                bgColor="primary.100"
                borderWidth="0.5px"
                zIndex="5000"
                    position="fixed"
                    bottom="15px"
                    right="45%"
                    left="45%"
                    icon={<PlusIcon />}
                    aria-label="Dashboard"
                    onClick={() => router.push('/dashboard')}
                />
                </Tooltip>
                <Box
                zIndex="2500"
                    display="flex"
                    justifyContent="space-between"
                    position="fixed"
                    bottom="0"
                    width="100%"
                    bg="primary.50"
                    p={1}
             
                >
                       <PersonaAvatar
                            src={userProfile?.avatar_url || "https://scilive.cloud/avatar-icon.svg"}
                            name={userProfile?.full_name || ""}
                            borderRadius="full"
                            size="xs"
                            aria-label="User menu"
                            onClick={onDrawerOpen}
                            presence={auth.isAuthenticated ? ("online") : ("offline")}
                            bottom="0px"
                        />
                    <Spacer />
                    <Tooltip label="gallery">
                    <IconButton
                    bottom="2px"
                        
                       icon={<PhotosIcon />}
                        aria-label="Gallery"
                        onClick={() => router.push('/dashboard/assets')}
                    />
                    </Tooltip>
                              
                </Box>
            </>)}
            <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
                <DrawerOverlay />
                <DrawerContent>

                    <DrawerHeader>
                        <PersonaAvatar
                            src={userProfile?.avatar_url || "https://scilive.cloud/avatar-icon.svg"}
                            name={userProfile?.full_name || ""}
                            borderRadius="md"
                            size="lg"
                            aria-label="User menu"
                            presence={auth.isAuthenticated ? ("online") : ("offline")}
                        />
                        <DrawerCloseButton />
                    </DrawerHeader>
                    <Box
                        my={4} // Margin for spacing above and below the box
                        p={2} // Padding inside the box for any content
                        bgGradient="linear(to-r, teal.500, green.500)" // Example of a cool background gradient
                    // Rounded corners
                    ><Stack direction="row" display="flex" justifyContent="space-between">
                            <Text as="h3" color="white" fontSize="sm" textAlign="center">View Mode</Text>
                            <Spacer />
                            <ViewModeSwitch />
                        </Stack>
                    </Box>
                    <DrawerBody>
                        {auth.isAuthenticated &&
                            <Stack as="nav" spacing={4}>
                                <NavGroup><Text color="teal.500" as="h3">pr0duc3</Text>
                                    <NavItem icon={<ImageIcon />} href="/dashboard/create-image">Create Images</NavItem>
                                    <NavItem icon={<EditIcon />} href="/dashboard/edit-image">Edit Images</NavItem>
                                    <NavItem icon={<VoiceoverIcon />} href="/dashboard/clone-voice">Clone Voice</NavItem>
                                    <NavItem icon={<AddIcon />} href="/dashboard/create-avatar">Create Avatar</NavItem>
                                    <NavItem href="/dashboard/write-script">Write Script</NavItem>
                                </NavGroup>

                                <NavGroup><Text color="teal.500" as="h3">tr@ining</Text>
                                    <NavItem href="/train"> - Train SDXL Model</NavItem>
                                </NavGroup>

                                <NavGroup><Text as="h3" color="teal.500">acc0unt</Text>
                                    <NavItem icon={<PhotosIcon />} href="/dashboard/assets">Gallery</NavItem>
                                    <NavItem icon={<SettingsIcon />} href="/account">Settings</NavItem>
                                </NavGroup>
                            </Stack>
                        }
                    </DrawerBody>
                    <DrawerFooter>
                        {auth.isAuthenticated ? (
                            <SignOutButton />) : (
                            <Link as="h3" href="/signin">Login / Signup</Link>
                        )}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>

    );
};

export default NavbarAlpha;

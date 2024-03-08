'use client'
import React, {useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { PersonaAvatar, NavGroup, NavItem, Navbar, NavbarItem, NavbarLink, NavbarBrand, NavbarContent } from '@saas-ui/react';
import { MdMenu } from "react-icons/md";
import Logo from '@/components/utils/Logo';
import SignOut from './ui/AuthForms/SignOut';
import ViewModeSwitch from './dashboard/ViewModeSwitch';
import { userProfileState } from '@/state/user/user_state-atoms';
import { getUserProfile } from '@/lib/userClientSide';
import { UserProfile } from '@/types';
import { useRecoilState } from 'recoil';

const NavbarAlpha = () => {
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
    const [userProfile, setUserProfile] = useRecoilState<UserProfile>(userProfileState);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUserProfile().then(setUserProfile).catch(setError);
    }, []);

    return (
        <Navbar  
            minWidth="480px" 
            bgGradient="linear(to-r, white, gray.300)"
            position="sticky"
            borderBottomWidth="1px"
            shouldHideOnScroll
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
            <NavbarContent display={{ base: 'hidden', sm: 'flex' }}>
                <NavbarItem>
                    <NavbarLink href="/dashboard">Production</NavbarLink>
                </NavbarItem>
                <NavbarItem>
                    <NavbarLink href="/dashboard/assets">Assets</NavbarLink>
                </NavbarItem>
                <NavbarItem>
                    <NavbarLink>Training</NavbarLink>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justifyContent="end">
                <Menu>
                    <MenuButton>
                        <PersonaAvatar
                            src={userProfile?.avatar_url || "https://scilive.cloud/avatar-icon.svg"}
                            name={userProfile?.full_name || ""}
                            borderRadius="full"
                            size="xs"
                            aria-label="User menu"
                            presence="online"
                        />
                    </MenuButton>
                    <MenuList>
                        {userProfile?.id ? (
                            <MenuGroup>
                                <MenuItem><div className="code">{userProfile.full_name}</div></MenuItem>
                                <MenuDivider />
                                <MenuItem><NavbarLink href="/gallery">Gallery</NavbarLink></MenuItem>
                                <MenuItem><NavbarLink href="/account">Account</NavbarLink></MenuItem>
                                <MenuDivider />
                                <SignOut />
                            </MenuGroup>
                        ) : (
                            <MenuGroup>
                                <MenuDivider />
                                <MenuItem><NavbarLink href="/auth/signup">Login / Signup</NavbarLink></MenuItem>
                            </MenuGroup>
                        )}
                    </MenuList>
                </Menu>
            </NavbarContent>

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
                            presence="online"
                        />
                        <DrawerCloseButton />
                    </DrawerHeader>
                    <Box
                        my={4} // Margin for spacing above and below the box
                        p={2} // Padding inside the box for any content
                        bgGradient="linear(to-r, teal.500, green.500)" // Example of a cool background gradient
                    // Rounded corners
                    ><Stack direction="row" display="flex" justifyContent="space-between">
                            <Text color="white" fontSize="sm" textAlign="center">View Mode</Text>
                            <Spacer />
                            <ViewModeSwitch />
                        </Stack>
                    </Box>
                    <DrawerBody>
                        <Stack as="nav" spacing={4}>
                            <NavGroup title="Content Production">
                                <NavItem icon={<MdMenu />} href="/dashboard/create-image">Create Images</NavItem>
                                <NavItem icon={<MdMenu />} href="/dashboard/edit-image">Edit Images</NavItem>
                                <NavItem icon={<MdMenu />} href="/dashboard/clone-voice">Clone Voice</NavItem>
                                <NavItem icon={<MdMenu />} href="/dashboard/create-avatar">Create Avatar</NavItem>
                                <NavItem icon={<MdMenu />} href="/dashboard/write-script">Write Script</NavItem>
                            </NavGroup>

                            <NavGroup title="Model Training">
                                <NavItem icon={<MdMenu />} href="/train">Train SDXL Model</NavItem>
                            </NavGroup>

                            {userProfile &&
                                <NavGroup title="Your Account">
                                    <NavItem icon={<MdMenu />} href="/dashboard/assets">Gallery</NavItem>
                                    <NavItem icon={<MdMenu />} href="/account">Settings</NavItem>
                                    <Spacer />

                                </NavGroup>}

                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        {userProfile ? (
                            <SignOut />) : (
                            <Link href="/signin">Login / Signup</Link>
                        )}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </Navbar >

    );
};

export default NavbarAlpha;

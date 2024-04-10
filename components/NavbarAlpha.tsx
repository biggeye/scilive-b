'use client'
import React, { useState, useEffect } from 'react';
import {
    Button,
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
    Image,
    VStack
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
import ViewModeSwitch from './prod/ViewModeSwitch';
import { userProfileState } from '@/state/user/user_state-atoms';
import { useRecoilValue } from 'recoil';
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';
import { useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MessageSquareIcon, PencilIcon, PersonStandingIcon, WeightIcon } from 'lucide-react';
import { HStack } from '@chakra-ui/react';

interface NavbarAlphaProps {
    handleSignOut: () => void; // Assuming SignOut is a function that does not return anything
}

const NavbarAlpha: React.FC<NavbarAlphaProps> = ({ handleSignOut }) => {

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
                    display="flex"
                    justifyContent="space-between"
                    zIndex="10000"
                    borderTopRightRadius="17px"
                    borderColor="primary.300"
                    borderBottomWidth="0px"
                    borderTopWidth="1px"
                    borderLeftWidth="0px"
                    padding="7px"
                    boxShadow="1px 3px 2px rgba(0, 0, 0, 0.22)"
                    bgGradient="linear(to-r, primary.50, primary.300, transparent)"
                    minWidth="480px"

                    backdropFilter="blur(50px)"
                    position="sticky"
                    top="0"

                >
                    <NavbarBrand>
                        <IconButton
                            display="inline-flex"
                            icon={<Image src={`${process.env.NEXT_PUBLIC_DEFAULT_URL}/scilive3.png`} width="50px" height="50px" />}
                            onClick={onDrawerOpen}
                            aria-label="Open Menu"
                        />
                    </NavbarBrand>
                    {auth.isAuthenticated &&
                        <NavbarContent display={{ base: 'hidden', md: 'flex' }}
                            flexWrap="nowrap">
                            <NavGroup>
                                <HStack>
                                    <Menu>
                                        <MenuButton bgColor="primary.50">
                                            <NavItem><Text as="h1" fontSize={{ base: "14px", md: "18px" }} color="primary.800">pr0d</Text></NavItem>
                                        </MenuButton>
                                        <MenuList>
                                            <MenuGroup as="h1" title="pr0duce">
                                                <NavItem href="/prod/create-image">Create Images</NavItem>
                                                <NavItem href="/prod/edit-image">Edit Images</NavItem>
                                                <NavItem href="/prod/write-script">Write Script</NavItem>
                                            </MenuGroup>
                                            <MenuDivider />
                                            <MenuGroup as="h1" title="avatar">
                                                <NavItem href="/prod/create-avatar">Create Avatar</NavItem>
                                                <NavItem href="/prod/train-avatar">Train Avatar Model</NavItem>
                                                <NavItem href="/prod/generate-avatar">Generate Avatar Images</NavItem>                                           </MenuGroup>
                                        </MenuList>
                                    </Menu>
                                    <NavItem href="/assets"><Text as="h1" fontSize={{ base: "14px", md: "18px" }} color="primary.800">ass3ts</Text></NavItem>
                                </HStack>
                            </NavGroup>
                        </NavbarContent>
                    }
                    <NavbarContent as="div" justifyContent="end">
                        <Menu>
                            <MenuButton
                                borderRadius="full"
                                borderWidth="0"
                                bgColor="primary.100">
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
                                        <Box width="90%" margin="5%">
                                            <h1 className="blinking-cursor">{userProfile?.full_name}</h1>
                                        </Box>
                                        <MenuDivider />
                                        <NavItem icon={<PhotosIcon />} href="/assets">Gallery</NavItem>
                                        <NavItem icon={<SettingsIcon />} href="/account">Account</NavItem>
                                        <MenuDivider />

                                        <Button width="90%" margin="5%" onClick={handleSignOut}>Sign-Out</Button>

                                    </MenuGroup>
                                ) : (
                                    <MenuGroup>
                                        <MenuDivider />
                                        <MenuItem><Link as="h2" href="/signin">Login / Signup</Link></MenuItem>
                                    </MenuGroup>
                                )}
                            </MenuList>
                        </Menu>
                    </NavbarContent>
                </Navbar >
            ) : (
                <Navbar
                    zIndex="250"
                    borderTopRightRadius="17px"
                    borderColor="primary.300"
                    borderBottomWidth="0px"
                    borderTopWidth="1px"
                    borderLeftWidth="0px"
                    padding="7px"
                    boxShadow="2px -3px 2px rgba(0, 0, 0, 0.22)"
                    bgGradient="linear(to-l, primary.50, primary.300, transparent)"
                    position="fixed"
                    bottom="0"
                    width="100%"
                    p={.25}
                >
                        <NavbarContent>
                            <PersonaAvatar 
                            aria-label="Settings"
                            icon={<SettingsIcon />}
                            borderRadius="5px"
                            size="sm"
                            bgColor="primary.100" />
                            <Spacer />
                            <Menu>
                                <MenuButton bgColor="transparent">
                                    <PersonaAvatar
                                        aria-label="New"
                                        icon={<PlusIcon />}
                                        borderRadius="5px"
                                        size="sm"
                                        bgColor="primary.100"
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuGroup as="h1" title="pr0duce">
                                        <NavItem href="/prod/create-image">Create Images</NavItem>
                                        <NavItem href="/prod/edit-image">Edit Images</NavItem>
                                        <NavItem href="/prod/write-script">Write Script</NavItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup as="h1" title="avatar">
                                        <NavItem href="/prod/create-avatar">Create Avatar</NavItem>
                                        <NavItem href="/prod/train-avatar">Train Avatar Model</NavItem>
                                        <NavItem href="/prod/generate-avatar">Generate Avatar Images</NavItem>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>
                            <Spacer />
                            <Tooltip label="gallery">
                                <PersonaAvatar
                                    borderRadius="5px"
                                    size="sm"
                                    bgColor="primary.100"
                                    icon={<PhotosIcon />}
                                    aria-label="Gallery"
                                    onClick={() => router.push('/assets')}
                                />
                            </Tooltip>
                        </NavbarContent>

                </Navbar>
            )}
            <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
                <DrawerOverlay />
                <DrawerContent bgGradient="linear(to-b, transparent, gray.50, gray.100, transparent, primary.100)">
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
                        p={1} // Padding inside the box for any content
                        bgGradient="linear(to-r, transparent, primary.50, gray.50, primary.800)" // Example of a cool background gradient
                    ><Stack direction="row" display="flex" justifyContent="space-between">
                            <Text as="h3" color="primary.800" fontSize="sm" textAlign="center">View Mode</Text>
                            <Spacer />
                            <ViewModeSwitch />
                        </Stack>
                    </Box>
                    <DrawerBody>
                        {auth.isAuthenticated &&
                            <Stack as="nav" spacing={4}>
                                <NavGroup><Text as="h1" color="primary.500">pr0duc3</Text>
                                    <NavItem icon={<PlusIcon />} href="/prod/create-image">Create Images</NavItem>
                                    <NavItem icon={<PencilIcon />} href="/prod/edit-image">Edit Images</NavItem>

                                    <NavItem icon={<PersonStandingIcon />} href="/prod/write-script">Write Script</NavItem>
                                </NavGroup>
                                <NavGroup><Text as="h1" color="primary.500">avatar</Text>
                                    <NavItem icon={<MessageSquareIcon />} href="/prod/create-avatar">Create Avatar</NavItem>
                                    <NavItem icon={<WeightIcon />} href="/prod/train-avatar">Train Avatar Model</NavItem>
                                    <NavItem icon={<PlusIcon />} href="/prod/generate-avatar">Generate Avatar Images</NavItem>
                                </NavGroup>
                                <NavGroup><Text as="h1" color="primary.500">acc0unt</Text>
                                    <NavItem icon={<PhotosIcon />} href="/assets">Gallery</NavItem>
                                    <NavItem icon={<SettingsIcon />} href="/account">Settings</NavItem>
                                </NavGroup>
                            </Stack>
                        }
                    </DrawerBody>
                    <DrawerFooter>
                        {auth.isAuthenticated ? (
                            <Button onClick={handleSignOut}>Sign-Out</Button>) : (
                            <Link as="h2" href="/signin">Login / Signup</Link>
                        )}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>

    );
};

export default NavbarAlpha;

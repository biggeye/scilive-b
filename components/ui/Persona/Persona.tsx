import React from 'react';
import { Avatar, AvatarBadge } from '@chakra-ui/react'
import {
  PersonaContainer,
  PersonaDetails,
  PersonaLabel,
  PersonaSecondaryLabel,
} from '@saas-ui/react'
import { getUserProfile } from '@/lib/userClientSide';
import { userProfileState } from '@/state/user/user_state-atoms';


const CustomPersona = () => {

  const userProfile = useRecoilValue(userProfileState);

  return (
    <PersonaContainer size="lg">
      <Avatar>
        <AvatarBadge boxSize="1em" border="0" bg="presence.away">
        </AvatarBadge>
      </Avatar>
      <PersonaDetails>
        <PersonaLabel>{userProfile.full_name}</PersonaLabel>
        <PersonaSecondaryLabel>Account Status</PersonaSecondaryLabel>
      </PersonaDetails>
    </PersonaContainer>
  )
}

export default CustomPersona;

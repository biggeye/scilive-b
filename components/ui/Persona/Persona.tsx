import React from 'react';
import { Avatar, AvatarBadge } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil';
import {
  PersonaContainer,
  PersonaDetails,
  PersonaLabel,
  PersonaSecondaryLabel,
} from '@saas-ui/react'
import { useAuth } from '@saas-ui/auth';

const CustomPersona = () => {
const auth = useAuth();

  return (
    <PersonaContainer size="lg">
      <Avatar>
        <AvatarBadge boxSize="1em" border="0" bg="presence.away">
        </AvatarBadge>
      </Avatar>
      <PersonaDetails>
        <PersonaSecondaryLabel>Account Status</PersonaSecondaryLabel>
      </PersonaDetails>
    </PersonaContainer>
  )
}

export default CustomPersona;

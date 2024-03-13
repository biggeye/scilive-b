import Logo from '@/components/utils/Logo'
import { Grid, VStack, GridItem, CardBody, Spacer, Box, Card, CardHeader } from '@chakra-ui/react'
import { useSnackbar } from '@saas-ui/react'
import { Auth } from '@saas-ui/auth'
import { Flex } from '@chakra-ui/react'

const getAbsoluteUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return path
  }
  return window.location.origin
}

export default function AuthPage() {
  return (
    <VStack>
    <Flex display="row">
    <Spacer />
    <Card w="350px" flex="1" maxW="400px">
      <CardHeader display="flex" alignItems="center" justifyContent="center">
        <Logo height="200px" width="200px" />
      </CardHeader>
      <CardBody>
       
        <Auth
          view="signup"
          providers={{
            github: {
        
              name: 'Github',
            },
            google: {
              name: 'Google',
            }
          }}
          redirectUrl={`${process.env.NEXT_PUBLIC_DEFAULT_URL}/dashboard`}
        />
       
      </CardBody>
    </Card>
    <Spacer />
        </Flex>
</VStack>
  )
}
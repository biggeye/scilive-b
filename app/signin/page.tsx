import Logo from '@/components/utils/Logo'
import { Spacer, Box, Card, CardHeader, CardBody } from '@chakra-ui/react'
import { Auth } from '@saas-ui/auth'
import { github, google } from '@/components/icons'

export default function AuthPage() {
  return (
    <Box maxW="400px" display="flex" flexDirection="row">
      <Spacer />
    <Card>
      <CardHeader display="flex" alignItems="center" justifyContent="center">
        <Logo height="200px" width="200px" />
      </CardHeader>
      <CardBody>
      <Auth
          providers={{
            github: {
              name: 'Github',
            },
            google: {
              name: 'Google',
            }
          }}
        />
      </CardBody>
    </Card>
    <Spacer />
    </Box>
  )
}
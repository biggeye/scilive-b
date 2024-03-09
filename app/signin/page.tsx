import { github, google } from '@/components/icons/Icons'
import Logo from '@/components/icons/Logo'
import { GitHubLogo, GoogleLogo } from '@/public/logos'
import { Card, CardHeader, CardBody } from '@chakra-ui/react'
import { Auth } from '@saas-ui/auth'

export default function AuthPage() {
  return (
    <Card flex="1" maxW="400px">
      <CardHeader display="flex" alignItems="center" justifyContent="center">
        <Logo width="100px" />
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
  )
}
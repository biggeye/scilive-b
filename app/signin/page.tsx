import Logo from '@/components/utils/Logo'
import { Grid, GridItem, CardBody, Spacer, Box, Card, CardHeader } from '@chakra-ui/react'
import { Auth } from '@saas-ui/auth'
import { github, google } from '@/components/icons/UI'
import { useSnackbar } from '@saas-ui/react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
const snackbar = useSnackbar();
  const router = useRouter();
  

const getAbsoluteUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return path;
  }
  return window.location.origin;
};

  return (
    <Grid gridTemplateRows="2">
      <GridItem>
        <Box width="100vw" height="30%" />
              </GridItem>
      <GridItem>
    <Box mt={5} maxW="100%" display="flex" flexDirection="row">
      <Spacer />
    <Card>
      <CardHeader display="flex" alignItems="center" justifyContent="center">
        <Logo height="200px" width="200px" />
      </CardHeader>
      <CardBody>
      <Auth
          providers={{
            github: {
          
              name: 'Github'
            },
            google: {
          
              name: 'Google'
            },
            facebook: {
       
              name: 'Facebook'
            }
          }}
          onSuccess={(view, error) => {
            if (view === 'login') {
              snackbar.success('Welcome back!')
              router.push('/dashboard')
            }
          }}
          onError={(view, error) => {
            if (view === 'login' && error) {
              snackbar.error(error.message)
            }
          }}
          redirectUrl={getAbsoluteUrl('/dashboard')}
        
        />
      </CardBody>
    </Card>
    <Spacer />
    </Box>
    </GridItem>
    </Grid>
  )
}
'use client'
import Logo from '@/components/utils/Logo'
import { Image, Button, VStack, Flex, Grid, GridItem, CardBody, Spacer, Box, Card, CardHeader } from '@chakra-ui/react'
import { Auth } from '@saas-ui/auth'
import { useSnackbar } from '@saas-ui/react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const snackbar = useSnackbar();
  const router = useRouter();


  const getAbsoluteUrl = (path: string) => {
    if (typeof window === 'undefined') {
      return path
    }
    return window.location.origin
  }

  const handleTikApiLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_TIKAPI_OAUTH_LINK}`)
  }

  return (
    <VStack>
      <Flex display="row">
        <Spacer />
        <Card w="350px" flex="1" maxW="400px">
          <CardHeader display="flex" alignItems="center" justifyContent="center">
            <Image src={`${process.env.NEXT_PUBLIC_DEFAULT_URL}/scilive4.png`} height="200px" width="200px" />
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
              redirectUrl={`${process.env.NEXT_PUBLIC_DEFAULT_URL}/dashboard`}

            />
            <Button onClick={handleTikApiLogin}>Continue with Tik Tok</Button>

          </CardBody>
        </Card>
        <Spacer />
      </Flex>
    </VStack>
  )
}
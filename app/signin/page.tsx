import Logo from '@/components/utils/Logo'
import { Grid, GridItem, CardBody, Spacer, Box, Card, CardHeader } from '@chakra-ui/react'
import { Auth } from '@saas-ui/auth'
import { github, google } from '@/components/icons/UI'
import SignUp from '@/components/ui/AuthForms/SignUp'

export default function AuthPage() {
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
     <SignUp />
      </CardBody>
    </Card>
    <Spacer />
    </Box>
    </GridItem>
    </Grid>
  )
}
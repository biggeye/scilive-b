import React from 'react';
import Logo from '@/components/utils/Logo';
import { CircularProgress, Grid, GridItem, Box, Spacer, Card, CardHeader, CardBody, VStack } from '@chakra-ui/react';

const LoadingCircle = () => {
    return(
        <Grid gridTemplateRows="2">
        <GridItem>
          <Box width="100vw" height="30%" />
                </GridItem>
        <GridItem>
      <Box mt={5} maxW="100%" display="flex" flexDirection="row">
        <Spacer />
      <Card>
        <CardHeader display="flex" alignItems="center" justifyContent="center">
        <Logo width="200px" height="200px"/>
        </CardHeader>
        <CardBody>
          <VStack>
        <CircularProgress isIndeterminate />
        </VStack>
        </CardBody>
      </Card>
      <Spacer />
      </Box>
      </GridItem>
      </Grid>
    )
}
    export default LoadingCircle;
import { Card, CardBody, Heading, CardHeader } from '@chakra-ui/react';
import StripeWidget from '@/components/ui/Pricing/StripeWidget';
import FeaturesSection from '@/components/ui/Features/FeaturesSection';
const HomePage = () =>  {
  return (
    <Card>
       <FeaturesSection />
      <CardBody>
      <StripeWidget />
      </CardBody>
    </Card>
  )
}
export default HomePage;
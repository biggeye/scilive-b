import { Card, CardHeader } from '@chakra-ui/react';
import StripeWidget from '@/components/ui/Pricing/StripeWidget';

const HomePage = () =>  {
  return (
    <Card>
      <CardHeader>
        <StripeWidget />
      </CardHeader>
    </Card>
  )
}
export default HomePage;

'use client';
import React from 'react';
import { Button, Box, VStack, Text, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { StructuredList, StructuredListHeader, StructuredListItem, StructuredListCell, } from '@saas-ui/react';
import type { Tables } from '@/types_db';
import { User } from '@supabase/supabase-js';
import SaasButton from '../SaasButton';
import StripeWidget from './StripeWidget';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;

interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}
interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

export default function Pricing() {

  return (
    <VStack mt="15px">
    <Card
    className="image-card"
    borderColor="onyx"
    borderWidth="0.5px"
  >
        <CardHeader>
         <StripeWidget />
       </CardHeader>
       <CardBody>
       
        </CardBody>
    </Card>
    </VStack>

  );
}


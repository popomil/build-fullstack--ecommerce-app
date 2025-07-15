import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  Card,
  CardBody,
  Button,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAppSelector } from '../app/hooks/hooks';

const CheckoutPage = () => {
  const { cartProducts } = useAppSelector(state => state.cart);
   
   const subTotal = cartProducts.reduce(
     (accumulator, currentProduct) => accumulator + (currentProduct.price * currentProduct.quantity),
     0
   );
   const shipping = 10;
   const total = subTotal + shipping;
   const taxRate = 0.15; 
  const tax = subTotal * taxRate;
  const [paymentMethod, setPaymentMethod] = useState('credit');

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh" 
      maxH="100vh" 
      overflow="hidden" 
      p={4}
    >
      <Box
        maxW="800px" 
        w="100%"
        borderRadius="lg"
        boxShadow="lg"
        p={8}
      >
        <Heading as="h1" size="xl" mb={8} textAlign="center">
          Checkout
        </Heading>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
          <GridItem>
            <Card variant="outline" mb={6}>
              <CardBody>
                <Heading as="h2" size="md" mb={4}>
                  Shipping Information
                </Heading>
                <form >
                  <VStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Full Name</FormLabel>
                      <Input placeholder="John Doe" />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" placeholder="john@example.com" />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Address</FormLabel>
                      <Input placeholder="123 Main St" />
                    </FormControl>

                    <Flex gap={4} w="full">
                      <FormControl isRequired flex={1}>
                        <FormLabel>City</FormLabel>
                        <Input placeholder="New York" />
                      </FormControl>

                      <FormControl isRequired flex={1}>
                        <FormLabel>State</FormLabel>
                        <Input placeholder="NY" />
                      </FormControl>

                      <FormControl isRequired flex={1}>
                        <FormLabel>ZIP Code</FormLabel>
                        <Input placeholder="10001" />
                      </FormControl>
                    </Flex>
                  </VStack>
                </form>
              </CardBody>
            </Card>
          </GridItem>

          {/* Right Column - Payment */}
          <GridItem>
            <Card variant="outline">
              <CardBody>
                <Heading as="h2" size="md" mb={4}>
                  Payment Method
                </Heading>
                <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                  <Stack direction="column" spacing={4}>
                    <Radio value="credit">Credit Card</Radio>
                    <Radio value="paypal">PayPal</Radio>
                    <Radio value="applepay">Apple Pay</Radio>
                  </Stack>
                </RadioGroup>

                {paymentMethod === 'credit' && (
                  <VStack spacing={4} mt={6}>
                    <FormControl isRequired>
                      <FormLabel>Card Number</FormLabel>
                      <Input placeholder="4242 4242 4242 4242" />
                    </FormControl>

                    <Flex gap={4} w="full">
                      <FormControl isRequired flex={2}>
                        <FormLabel>Expiration Date</FormLabel>
                        <Input placeholder="MM/YY" />
                      </FormControl>

                      <FormControl isRequired flex={1}>
                        <FormLabel>CVV</FormLabel>
                        <Input placeholder="123" />
                      </FormControl>
                    </Flex>
                  </VStack>
                )}

                <Divider my={6} />

                <VStack spacing={4}>
                  <Flex justify="space-between" w="full">
                    <Text>Subtotal:</Text>
                    <Text fontWeight="bold">${subTotal}</Text>
                  </Flex>
                  <Flex justify="space-between" w="full">
                    <Text>Shipping:</Text>
                    <Text fontWeight="bold">${shipping}</Text>
                  </Flex>
                  <Flex justify="space-between" w="full">
                    <Text>Tax:</Text>
                    <Text fontWeight="bold">${tax}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify="space-between" w="full" fontSize="lg">
                    <Text fontWeight="bold">Total:</Text>
                    <Text fontWeight="bold">${total}</Text>
                  </Flex>

                  <Button
                    colorScheme="blue"
                    size="lg"
                    w="full"
                    mt={4}
                  >
                    Complete Purchase
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
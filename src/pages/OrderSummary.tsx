
import { Box, Flex, Text, Divider, Heading, Button} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks/hooks";

const OrderSummary = () => {
  const { cartProducts } = useAppSelector(state => state.cart);
  
  const subTotal = cartProducts.reduce(
    (accumulator, currentProduct) => accumulator + (currentProduct.price * currentProduct.quantity),
    0
  );
  
  const shipping = 10;
  const total = subTotal + shipping;
  return (
    <Box 
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      boxShadow="sm"
      my={{ base: "55px", md: "80px" }}
      width={{ base: "100%", md: "400px", lg: "500px" }}
    >
      <Heading as="h3" size="md" mb={4} fontWeight="semibold">
        Order Summary
      </Heading>

      <Flex justify="space-between" mb={2}>
        <Text color="gray.600">Subtotal ({cartProducts.length} items)</Text>
        <Text fontWeight="medium">${subTotal.toFixed(2)}</Text>
      </Flex>

      <Flex justify="space-between" mb={4}>
        <Text color="gray.600">Shipping</Text>
        <Text fontWeight="medium">${shipping.toFixed(2)}</Text>
      </Flex>

      <Divider my={3} />

      <Flex justify="space-between" mt={4}>
        <Text fontSize="lg" fontWeight="bold">Total</Text>
        <Text fontSize="lg" fontWeight="bold">${total.toFixed(2)}</Text>
      </Flex>

      <Button
        as={RouterLink}
        to="/checkout"
        colorScheme="purple"
        size="lg"
        w="full"
        mt={6}
        _hover={{ 
          transform: "translateY(-2px)", 
          boxShadow: "md" 
        }}
      >
        Proceed to Checkout
      </Button>

      <Text 
        as={RouterLink} 
        to="/"
        display="block"
        textAlign="center"
        mt={4}
        color="purple.500"
        _hover={{
          textDecoration: "underline"
        }}
      >
        Continue Shopping
      </Text>
    </Box>
  );
};

export default OrderSummary;
import { Box, Button, Card, Flex, Image, Text, Heading, Stack, Center, useColorMode, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; 
import { IProduct } from "../interfaces";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../app/feature/cart/CartSlice";
import OrderSummary from "./OrderSummary";
import { useAppDispatch } from "../app/store";
import { useAppSelector } from "../app/hooks/hooks";

const Cart = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartProducts } = useAppSelector(state => state.cart);
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <Center minH="100vh" flexDirection="column">
        <Text fontSize="xl" color={colorMode === "light" ? "gray.600" : "gray.400"} mb={4}>
          Your cart is empty.
        </Text>
        <Button
          onClick={() => navigate(-1)}
          bg={colorMode === "light" ? "gray.200" : "gray.700"}
          color={colorMode === "light" ? "gray.800" : "white"}
          _hover={{
            bg: colorMode === "light" ? "gray.300" : "gray.600",
          }}
        >
          &larr; Back to shopping
        </Button>
      </Center>
    );
  }
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      width={{ base: "95%", lg: "90%", xl: "85%" }}
      maxW="1400px"
      mx="auto"
      my={{ base: "40px", md: "60px" }}
      gap={{ base: 6, lg: 8 }}
      justifyContent="space-between"
    >
      <Box flex={{ lg: 2 }} width="full">
        <Heading as="h1" size="lg" mb={6} mt={5}>
          Shopping Cart
        </Heading>

        <Stack spacing={4}>
          {cartProducts.map((product: IProduct) => {
            const { description, title, thumbnail, price, quantity } = product;
            return (
              <Card
                key={product.id}
                direction="row" 
                overflow="hidden"
                border="1px solid"
                borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
                bg={colorMode === "light" ? "white" : "gray.800"}
                color={colorMode === "light" ? "gray.800" : "white"}
                shadow="md"
                borderRadius="lg"
                p={4} 
                alignItems="center" 
              >
                <Flex
                  flexShrink={0}
                  width="120px" 
                  height="120px" 
                  justifyContent="center"
                  alignItems="center"
                  mr={4} 
                >
                  <Image
                    src={`${import.meta.env.VITE_SERVER_URL}${thumbnail?.url}`}
                    alt={title}
                    maxW="100%"
                    maxH="100%"
                    objectFit="contain"
                    borderRadius="md"
                  />
                </Flex>

                <Flex flex={1} direction="column" justify="space-between">
                  <Flex justify="space-between" align="flex-start">
                    <Box>
                      <Text fontSize="md" fontWeight="bold" noOfLines={1}>
                        {title}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {description}
                      </Text>
                    </Box>
                    <IconButton
                      aria-label="Remove item"
                      icon={<FaTrash />}
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => dispatch(removeFromCart(product.id))}
                      size="sm"
                    />
                  </Flex>

                  <Flex justify="space-between" align="center" mt={2}>
                    <Flex alignItems="center">
                      <Button size="sm" onClick={() => dispatch(decreaseQuantity(product.id))} disabled={quantity === 1}>-</Button>
                      <Text fontSize="md" fontWeight="bold" mx={2}>{quantity}</Text>
                      <Button size="sm" onClick={() => dispatch(increaseQuantity(product.id))}>+</Button>
                    </Flex>
                    <Text fontSize="lg" fontWeight="bold" color={colorMode === "light" ? "purple.600" : "purple.300"}>
                      ${price}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            );
          })}
        </Stack>
      </Box>
      <Box 
        flex={{ lg: 1 }} 
        position={{ lg: "sticky" }}
        alignSelf={{ lg: "flex-start" }}
        height="fit-content"
      >
        <OrderSummary />
      </Box>
    </Flex>
  );
};

export default Cart;
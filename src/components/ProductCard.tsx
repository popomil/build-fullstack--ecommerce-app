import {
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Card,
  useColorMode,
  IconButton,
  Box,
  Tooltip,
  Badge,
  Circle,
} from "@chakra-ui/react";
import { MdOutlineShoppingCart, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import type { IProduct } from "../interfaces";
import { useAppDispatch } from "../app/store";
import { addToCart } from "../app/feature/cart/CartSlice";
import { useState } from "react";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { colorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card
      shadow="md"
      maxW="sm"
      mt="60px"
      h="100%"
      display="flex"
      flexDirection="column"
      position="relative"
      overflow="hidden"
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{
        shadow: "xl",
        transform: "translateY(-5px)",
        borderColor: colorMode === "light" ? "blue.300" : "cyan.500",
      }}
    >
      {/* Favorite Button */}
      <Tooltip label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
        <Box position="absolute" top={2} right={2} zIndex={1}>
          <IconButton
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            icon={isFavorite ? <MdFavorite color="red" size="20px" /> : <MdFavoriteBorder size="20px" />}
            variant="ghost"
            isRound
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
            _hover={{
              bg: colorMode === "light" ? "gray.100" : "gray.700",
            }}
          />
        </Box>
      </Tooltip>

      {/* Circular Image Container */}
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        p={6}
        bg={colorMode === "light" ? "gray.50" : "gray.800"}
        borderBottom="1px solid"
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      >
        <Circle
          size="180px"
          overflow="hidden"
          border="2px solid"
          borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
          position="relative"
        >
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail?.url}`}
            alt={product.thumbnail?.name || product.title}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.3s"
            _hover={{
              transform: "scale(1.05)",
            }}
          />
        </Circle>
      </Box>

      {/* Discount Badge */}
        <Badge
          position="absolute"
          top={4}
          left={4}
          colorScheme="red"
          fontSize="sm"
          px={2}
          py={1}
          borderRadius="md"
          zIndex={1}
        >
         10 % OFF
        </Badge>
      <CardBody flex="1" px={4} py={3}>
        <Stack spacing="3" flex="1">
          <Heading size="md" noOfLines={1} fontWeight="semibold" textAlign="center">
            {product.title}
          </Heading>
          
          <Text fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.400"} noOfLines={2} textAlign="center">
            {product.description}
          </Text>
          <Box mt={2} textAlign="center">
              <Text fontSize="lg" fontWeight="bold" color={colorMode === "light" ? "blue.600" : "cyan.400"}>
                ${product.price}
              </Text>
          </Box>

          <Text fontSize="xs" color={colorMode === "light" ? "gray.500" : "gray.400"} textAlign="center">
            In Stock: {product.stock} units
          </Text>
        </Stack>
      </CardBody>

      <Divider />

      <CardFooter px={4} py={3}>
        <ButtonGroup spacing="2" width="100%">
          <Button
            as={RouterLink}
            to={`/product/${product.documentId}`}
            variant="solid"
            colorScheme={colorMode === "light" ? "blue" : "cyan"}
            flex="1"
            size="sm"
            fontWeight="medium"
          >
            View Details
          </Button>
          <Button
            onClick={handleAddToCart}
            rightIcon={<MdOutlineShoppingCart />}
            variant="outline"
            colorScheme={colorMode === "light" ? "blue" : "cyan"}
            flex="1"
            size="sm"
            fontWeight="medium"
          >
            Add to Cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
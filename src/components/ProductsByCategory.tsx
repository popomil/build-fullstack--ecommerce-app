import { Image, Box, Heading, Text, SimpleGrid } from '@chakra-ui/react'
import { Link as RouterLink} from 'react-router-dom'
import { useAppDispatch } from '../app/store';
import { filiterCategoris } from '../app/feature/categories/categorySlice';

const ProductsByCategory = () => {
const categories = [
  {
    name: "Laptops",
    image: "/laptop.avif",
    path: "/products?category=laptops"
  },
  {
    name: "Phones",
    image: "/phone.avif",
    path: "/products?category=smartPhones"
  },
  {
    name: "Headphones",
    image: "/headphones.avif",
    path: "/products?category=headphones"
  },
  {
    name: "Cameras",
    image: "camra.avif",
    path: "/products?category=cameras"
  },
  {
    name: "Wearables",
    image: "image.png", 
    path: "/products?category=Wearables"
  }
];
  
const dispatch = useAppDispatch()
return (
  <Box maxW="1920px" mx="auto" justifyContent={"space-between"}> 
    <Box 
      mx="auto"
      maxW="1800px"
      px={{ base: 4, md: 8 }}
      mt={{ base: "80px", md: "90px", lg: "100px" }}
    >
    </Box>
    
    <Box w="100%" maxW="2000px" mx="auto" mt={16} px={4}>
  <Heading textAlign="center" mb={12} fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
    Shop by Category
  </Heading>
  
  <SimpleGrid 
    columns={{ base: 2, md: 5 }}
    spacing={{ base: 4, md: 4 }}
    justifyContent="center"
    alignItems="center"
  >
    {categories.map((category, index) => (
      <Box 
        key={`${category.name}-${index}`}
        position="relative"
        w="100%"
        h={{ base: "180px", md: "250px", lg: "300px" }}
        mb={"60px"}
        borderRadius="xl"
        overflow="hidden"
        _hover={{ transform: "scale(1.05)", transition: "transform 0.3s" }}
        boxShadow="lg"
      >
        <RouterLink 
          to={`/products`}
          state={{ category: category.name.toLowerCase() }}
        >
          <Image
          onClick={() => dispatch(filiterCategoris(category.name))}
            src={category.image}
            alt={category.name}
            w="100%"
            h="100%"
            objectFit="cover"
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="rgba(0,0,0,0.6)"
            color="white"
            p={4}
            textAlign="center"
          >
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">{category.name}</Text>
            <Text fontSize="md" mt={1}>Shop Now →</Text>
          </Box>
        </RouterLink>
      </Box>
    ))}
  </SimpleGrid>
</Box>
  </Box>
)
}

export default ProductsByCategory
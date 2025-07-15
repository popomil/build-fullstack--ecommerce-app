import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Flex,
  Image,
  Divider,
  Stack
} from '@chakra-ui/react';
import { BsFillLaptopFill } from 'react-icons/bs';
import { FiSmartphone, FiHeadphones, FiWatch } from 'react-icons/fi';

interface ProductCategoryProps {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const AboutPage = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const accentColor = useColorModeValue('blue.500', 'blue.300');

  const categories: ProductCategoryProps[] = [
    {
      icon: FiSmartphone,
      title: "Smartphones",
      description: "Latest flagship and budget phones with cutting-edge technology",
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      features: [
        "5G connectivity",
        "High-resolution cameras",
        "Long-lasting batteries",
        "AMOLED displays"
      ]
    },
    {
      icon: FiHeadphones,
      title: "Headphones",
      description: "Immersive audio experience for music lovers and professionals",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      features: [
        "Noise cancellation",
        "Wireless freedom",
        "Crystal clear calls",
        "Comfortable fit"
      ]
    },
    {
      icon: BsFillLaptopFill,
      title: "Laptops",
      description: "Powerful machines for work, gaming, and creativity",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      features: [
        "High-performance processors",
        "SSD storage",
        "Thin and lightweight",
        "Long battery life"
      ]
    },
    {
      icon: FiWatch,
      title: "Wearables",
      description: "Smart devices that keep you connected and healthy",
      image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      features: [
        "Fitness tracking",
        "Heart rate monitoring",
        "Smart notifications",
        "Water resistant"
      ]
    }
  ];

  return (
    <Container maxW="7xl" py={12} mt="60px">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Text color={accentColor} fontWeight="semibold" mb={2}>
            OUR PRODUCT RANGE
          </Text>
          <Heading as="h1" size="2xl" mb={4}>
            Premium Tech for Your Digital Life
          </Heading>
          <Text fontSize="lg" color={textColor} maxW="2xl" mx="auto">
            We offer the latest in mobile technology, audio gear, computing power, and smart wearables to enhance your daily life.
          </Text>
        </Box>

        <Divider borderColor={useColorModeValue('gray.200', 'gray.600')} />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {categories.map((category, index) => (
            <Box
              key={index}
              bg={cardBg}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              transition="all 0.2s ease"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
            >
              <Flex direction={{ base: 'column', md: 'row' }} h="100%">
                <Box flex={1} p={6}>
                  <HStack mb={4}>
                    <Icon as={category.icon} boxSize={6} color={accentColor} />
                    <Heading as="h3" size="lg">{category.title}</Heading>
                  </HStack>
                  <Text color={textColor} mb={4}>{category.description}</Text>
                  <Stack spacing={2}>
                    {category.features.map((feature, i) => (
                      <HStack key={i} spacing={2}>
                        <Box boxSize={2} borderRadius="full" bg={accentColor} />
                        <Text fontSize="sm">{feature}</Text>
                      </HStack>
                    ))}
                  </Stack>
                </Box>
                <Box flex={1} minH="250px" position="relative">
                  <Image
                    src={category.image}
                    alt={category.title}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

        <Box mt={8} bg={useColorModeValue('blue.50', 'blue.900')} p={8} borderRadius="lg">
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Why Choose Our Products?
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <VStack spacing={3} textAlign="center">
              <Box boxSize={12} bg={accentColor} borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                <Icon as={FiSmartphone} boxSize={6} color="white" />
              </Box>
              <Text fontWeight="bold">Quality Assurance</Text>
              <Text color={textColor} fontSize="sm">
                All products go through rigorous testing to ensure premium quality and durability.
              </Text>
            </VStack>
            <VStack spacing={3} textAlign="center">
              <Box boxSize={12} bg={accentColor} borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                <Icon as={FiHeadphones} boxSize={6} color="white" />
              </Box>
              <Text fontWeight="bold">1-Year Warranty</Text>
              <Text color={textColor} fontSize="sm">
                Peace of mind with comprehensive warranty coverage on all purchases.
              </Text>
            </VStack>
            <VStack spacing={3} textAlign="center">
              <Box boxSize={12} bg={accentColor} borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                <Icon as={BsFillLaptopFill} boxSize={6} color="white" />
              </Box>
              <Text fontWeight="bold">Expert Support</Text>
              <Text color={textColor} fontSize="sm">
                Our tech specialists are available 24/7 to assist with any questions.
              </Text>
            </VStack>
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};


export default AboutPage;

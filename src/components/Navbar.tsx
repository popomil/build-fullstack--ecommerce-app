import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  useColorMode,
  HStack,
  Link,
  Text,
  Center,
  Avatar,
  MenuDivider,
  MenuItem,
  MenuList,
  Menu,
  MenuButton,
  Stack,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaShoppingCart, FaHeart, FaTachometerAlt } from 'react-icons/fa';
import { useAppSelector } from '../app/hooks/hooks';
import { logo } from '../assets/images';
import CookieService from '../services/CookieService';
const Links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: 'about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
];

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    as={RouterLink}
    to={to}
    px={3}
    py={2}
    rounded="md"
    fontWeight="bold"
    display="flex"
    alignItems="center"
    gap={2}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const {count} = useAppSelector(state => state.cart)
  const handleLogout = () => {
    CookieService.remove('jwt')
    window.location.reload()
  };
const token = CookieService.get("jwt"); 


  return (
    <Box 
      bg={useColorModeValue('white', 'gray.900')} 
      px={6} 
      boxShadow="md"
      position="fixed" 
      top="0"          
      width="100%"     
      zIndex="1000"    
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
      <RouterLink to="/" style={{ textDecoration: "none" }}>
  <Box display="flex" alignItems="center" gap={2}>
    <Image
      src={logo} 
      alt="Shop Logo" 
      boxSize="40px" 
      objectFit="contain"
    />
    <Text 
      fontWeight="bold" 
      fontSize="xl" 
      color="teal.500"
      _hover={{ color: "teal.600" }}
    >
      My Shop
    </Text>
  </Box>
</RouterLink>

        <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
          {Links.map((link) => (
            <NavLink key={link.name} to={link.path}>
              {link.icon && link.icon}
              {link.name}
            </NavLink>
          ))}
        </HStack>

        <HStack spacing={4}>
          <RouterLink to="/favorite">
            <Button variant="ghost" size="lg" aria-label="Favorite">
              <FaHeart size={22} />
            </Button>
          </RouterLink>
          
          <RouterLink to="/cart">
            <Button variant="ghost" size="lg" position="relative" aria-label="Cart">
              <FaShoppingCart size={22} />
              {count > 0 && (
                <Box
                  as="span"
                  position="absolute"
                  top="-2" 
                  right="-2" 
                  bg="red.500" 
                  color="white" 
                  fontSize="xs"
                  px={2} 
                  py={1} 
                  rounded="full" 
                  lineHeight="none" 
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minW="20px" 
                  minH="20px" 
                  fontWeight="bold"
                >
                  {count}
                </Box>
              )}
            </Button>
          </RouterLink>
          
          <Button onClick={toggleColorMode} variant="outline" aria-label="Toggle color mode">
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src='https://avatars.dicebear.com/api/male/username.svg'
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar
                    size={'2xl'}
                    src='https://avatars.dicebear.com/api/male/username.svg'
                  />
                </Center>
                <br />
                <Center flexDirection="column">
                  <Text fontSize="xl" fontWeight="bold" color="teal.600">
                    User Profile
                  </Text>
                  <Box w="100%" p={2} borderRadius="md">
                    <Text fontWeight="semibold">Username:</Text>
                    <Text mt={1}>N/A</Text>
                  </Box>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem as={RouterLink} to="/dashboard" icon={<FaTachometerAlt />}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
            {
              !token && (
             <Stack direction="row" spacing={3}>
              <RouterLink to="/login">
                <Button colorScheme="blue" px={6}>
                  Login
                </Button>
              </RouterLink>
              <RouterLink to="/signup">
                <Button colorScheme="teal" variant="outline" px={6}>
                  Signup
                </Button>
              </RouterLink>
            </Stack>
              )
            }
        </HStack>
      </Flex>
    </Box>
  );
}
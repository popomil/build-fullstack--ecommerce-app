"use client";

import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn, MdFacebook, MdOutlineEmail } from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";

const ContactPage = () => {
  return (
    <Container 
      maxW="full" 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      p={0}
      bg="gray.50" 
    >
      <Flex 
        width="100%" 
        justify="center" 
        align="center"
      >
        <Box
          bg="#02054B"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 6, lg: 8 }}
          p={{ sm: 5, md: 5, lg: 16 }}
          shadow="xl" 
          width={{ base: "90%", md: "85%", lg: "80%" }}
          maxW="1200px"
        >
          <Box p={4}>
            <Wrap 
              spacing={{ base: 8, sm: 4, md: 10, lg: 20 }}
              justify="center"
              align="center"
            >
              <WrapItem>
                <Box textAlign={{ base: "center", md: "left" }}>
                  <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
                    Contact Us
                  </Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.400">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack spacing={3} alignItems={{ base: "center", md: "flex-start" }}>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}>
                        +91-988888888
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                        hello@abc.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: "2px solid #1C6FEB" }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}>
                        Egypt
                      </Button>
                    </VStack>
                  </Box>
                  <HStack 
                    mt={{ lg: 10, md: 10 }} 
                    spacing={5} 
                    justifyContent={{ base: "center", md: "flex-start" }}
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      bg="#0D74FF"
                      icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      bg="#0D74FF"
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      bg="#0D74FF"
                      isRound={true}
                      icon={<BsDiscord size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box 
                  bg="white" 
                  borderRadius="lg"
                  width={{ base: "100%", md: "400px", lg: "500px" }}
                >
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="email">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input type="email" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="message">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderColor: "gray.400",
                          }}
                          placeholder="Your message here..."
                          minH="150px"
                        />
                      </FormControl>
                      <FormControl id="submit" float="right">
                        <Button 
                          variant="solid" 
                          bg="#0D74FF" 
                          color="white" 
                          _hover={{ bg: "#0B5ED7" }}
                          width="full"
                          mt={4}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default ContactPage;
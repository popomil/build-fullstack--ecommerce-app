import { Box } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ProductsByCategory from "../components/ProductsByCategory";

const HomePage = () => {
  return (
    <Box>
    <Box w="90%" mx={"auto"}>
      <Hero />
      <ProductsByCategory/>
      </Box>
      <Footer />
  </Box>
  );
};

export default HomePage;

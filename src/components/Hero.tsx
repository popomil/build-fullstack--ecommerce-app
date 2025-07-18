import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
const placeholderImages = [
  {
    id: 1,
    title: "Summer Fashion Collection",
    description: "Discover the latest trends in our summer fashion lineup",
    url: "/hero2.avif",
    buttonText: "Shop Now",
    buttonColor: "pink.400",
  },
  {
    id: 2,
    title: "Latest Electronics",
    description: "Cutting-edge technology at unbeatable prices",
    url: "/hero3.avif",
    buttonText: "Explore Tech",
    buttonColor: "blue.400",
  },
  {
    id: 3,
    title: "Home & Living",
    description: "Transform your space with our premium home collection",
    url: "/hero1.avif",
    buttonText: "View Collection",
    buttonColor: "teal.400",
  },
  {
    id: 4,
    title: "Sports & Fitness",
    description: "Gear up for your next workout with our sports collection",
    url: "/hero4.avif",
    buttonText: "Get Active",
    buttonColor: "green.400",
  },
];

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Hero = () => {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  return (
    <Box
      position={"relative"}
      height={"600px"}
      width={"full"}
      mt="100px"
      overflow={"hidden"}
      borderRadius="lg"
      boxShadow="lg"
    >
      {/* CSS for slider */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      {/* Navigation arrows */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        color="white"
        _hover={{ bg: "blackAlpha.300" }}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
        color="white"
        _hover={{ bg: "blackAlpha.300" }}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {placeholderImages.map((card) => (
          <Box
            key={card.id}
            position="relative"
            height="600px"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${card.url})`}
          >
            <Container
              size="container.lg"
              height="100%"
              position="relative"
              display="flex"
              alignItems="center"
            >
              <Stack
                spacing={6}
                maxW={"lg"}
                px={{ base: 4, md: 0 }}
              >
                <Heading
                  color={"white"}
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  textShadow="2px 2px 4px rgba(0,0,0,0.5)"
                >
                  {card.title}
                </Heading>
                <Text
                  fontSize={{ base: "md", lg: "lg" }}
                  color={"white"}
                  textShadow="1px 1px 2px rgba(0,0,0,0.5)"
                >
                  {card.description}
                </Text>
                <Button
                  colorScheme={card.buttonColor}
                  width="fit-content"
                  size="lg"
                  px={8}
                >
                  {card.buttonText}
                </Button>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Hero;

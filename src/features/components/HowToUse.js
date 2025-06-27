import React from 'react';
import { Box, Text, Heading, HStack, Container, Image } from '@chakra-ui/react';

const HowToUse = () => {
  return (
    <Box bg="white" py={{ base: 12, md: 16 }} width="100%">
      <Container maxW="container-fluid">
        <HStack 
          align="flex-start" 
          spacing={{ base: 6, md: 12 }}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          {/* Image Column - Left */}
          <Box flex={1}>
            <Image
              src={process.env.PUBLIC_URL + "/assets/shop.png"}
              alt="Woman applying facial toner"
              borderRadius=""
              objectFit="cover"
              width="100%"
              height={{ base: '300px', md: '500px' }}
              boxShadow="lg"
            />
          </Box>

          {/* Text Column - Right */}
          <Box flex={1}>
            <Box pb={2} width="100%">
              <Text
                fontSize="sm"
                fontWeight="800"
                color="#000"
                letterSpacing="0.2em"
                textTransform="uppercase"
              >
                HOW TO USE
              </Text>
            </Box>

            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight="500"
              color="#000"
              lineHeight="1.2"
              mt={4}
              mb={6}
            >
              SHYNEEN FACE TONER
            </Heading>

            {[1, 2, 3].map((item) => (
              <Text
                key={item}
                fontSize={{ base: 'md', md: 'lg' }}
                color="#000"
                lineHeight="1.1"
                fontWeight= "100"
                mb={4}
              >
                This beauty product line was creatively designed to emphasize the flawless beauty of mother 
                nature. We crafted the logo and mixed two natural colors to provide a calm and soothing 
                feeling to everyone who comes across the product.
              </Text>
            ))}
          </Box>
        </HStack>
      </Container>
    </Box>
  );
};

export default HowToUse;
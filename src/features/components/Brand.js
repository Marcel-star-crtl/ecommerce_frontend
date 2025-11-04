import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Container } from '@chakra-ui/react';
import { brandAPI } from '../../api/api';

const Brand = () => {
  const [brandContent, setBrandContent] = useState({
    title: "SHYNEEN",
    description: "This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product.",
    backgroundColor: "pink.200",
    textColor: "white"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandContent = async () => {
      try {
        const response = await brandAPI.getBrandContent();
        if (response.data) {
          setBrandContent(response.data);
        }
      } catch (error) {
        console.error('Error fetching brand content:', error);
        // Keep default content if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchBrandContent();
  }, []);

  if (loading) {
    return (
      <Box
        bg="pink.200"
        py={{ base: 12, md: 16 }}
        my={{ base: 12, md: 8, }}
        mb={{ base: 12, md: 8 }}
        width="100%"
      >
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Text color="white">Loading...</Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      bg={brandContent.backgroundColor || "pink.200"}
      py={{ base: 12, md: 16 }}
      my={{ base: 12, md: 8, }}
      mb={{ base: 12, md: 8 }}
      width="100%"
    >
      <Container maxW="container.xl">
        <VStack spacing={6} textAlign="center">
          <Text
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="300"
            color={brandContent.textColor || "white"}
            letterSpacing={{ base: '0.3em', md: '0.4em', lg: '0.5em' }}
            textTransform="uppercase"
            lineHeight="1.2"
          >
            {brandContent.title || "SHYNEEN"}
          </Text>
          
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color={brandContent.textColor || "white"}
            lineHeight="1.8"
            maxW={{ base: '90%', md: '600px', lg: '700px' }}
            opacity="0.95"
            fontWeight="300"
          >
            {brandContent.description || "This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product."}
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Brand;
import React from 'react';
import { Box, Text, Button, VStack, Container } from '@chakra-ui/react';

const Original = ({
  backgroundImage,
  title = 'Original Shyneen Facial Cleaner',
  description = 'This beauty product line was creatively designed to emphasize the flawless beauty of mother nature.',
  buttonText = 'Get Yours',
  textColor = 'gray.800',
  descriptionColor = 'gray.700', 
  onButtonClick = () => {}
}) => {
  return (
    <Box
      position="relative"
      marginTop="70px"
      marginBottom="70px"
      height="90vh"
      width="100%"
      backgroundImage={backgroundImage}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      display="flex"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.1)"
        zIndex="1"
      />

      <Container 
        maxW="container.xl" 
        position="relative" 
        zIndex="2"
        display="flex"
        alignItems="flex-end"
        height="100%"
      >
        <VStack
          align="flex-start"
          spacing={6}
          maxW="550px"
          pl={{ base: 0, md: 0 }}
          pb={{ base: 8, md: 16 }} 
        >
          <Text
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
            fontWeight="bold"
            color={textColor}
            lineHeight="1.2"
            letterSpacing="-0.02em"
          >
            {title}
          </Text>

          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color={descriptionColor}
            lineHeight="1.6"
            maxW="400px"
          >
            {description}
          </Text>

          <Button
            bg="pink.300"
            color="white"
            size="lg"
            px={8}
            py={6}
            borderRadius="full"
            fontSize="md"
            fontWeight="medium"
            onClick={onButtonClick}
            _hover={{
              bg: 'pink.400',
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            _active={{
              bg: 'pink.500',
              transform: 'translateY(0)',
            }}
            transition="all 0.2s"
          >
            {buttonText}
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default Original;

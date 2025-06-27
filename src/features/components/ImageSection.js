import React from 'react';
import { 
  Box, 
  Image,
  AspectRatio
} from '@chakra-ui/react';

const ImageSection = () => {
  return (
    <Box
      w="100%"
      // maxW="1250px"
      width= "100%"
      mx="auto"
      borderRadius=""
      overflow="hidden"
      // boxShadow="xl"
    >
      <AspectRatio ratio={21/6}>
        <Image
          src={process.env.PUBLIC_URL + "/assets/skin.png"}
          alt="Elegant hands with manicured nails"
          objectFit="cover"
          objectPosition="center"
          w="100%"
          h="100%"
          transition="transform 0.3s ease"
          borderTop="10px solid" borderColor="pink.200" width="100%"
          // _hover={{
          //   transform: "scale(1.02)"
          // }}
        />
      </AspectRatio>
    </Box>
  );
};

export default ImageSection;
import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Container,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    subject: '',
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <Box
      bg="white"
      py={{ base: 12, md: 16 }}
      width="100%"
      minHeight="600px"
    >
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="left" align="flex-start">
            <Text
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="medium"
              color="pink.300"
              letterSpacing="wide"
            >
              Contact Us!
            </Text>
            
            <VStack spacing={2} align="flex-start">
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                color="gray.700"
                lineHeight="1.6"
              >
                Are you looking for help to place an order or have questions about an existing order?
              </Text>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                color="gray.700"
                lineHeight="1.6"
              >
                Fill out the contact form above to get in contact with us!
              </Text>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                color="gray.700"
                lineHeight="1.6"
              >
                You can also check out our FAQ section here, the answer might already be there!
              </Text>
            </VStack>
          </VStack>

          {/* Contact Form */}
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              {/* Name Fields */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl>
                  <FormLabel 
                    fontSize="sm" 
                    color="gray.600" 
                    fontWeight="normal"
                    mb={2}
                  >
                    First Name
                  </FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="md"
                    px={4}
                    py={3}
                    fontSize="sm"
                    _hover={{
                      borderColor: 'gray.400'
                    }}
                    _focus={{
                      borderColor: 'pink.300',
                      boxShadow: '0 0 0 1px #F687B3'
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel 
                    fontSize="sm" 
                    color="gray.600" 
                    fontWeight="normal"
                    mb={2}
                  >
                    Last Name
                  </FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="md"
                    px={4}
                    py={3}
                    fontSize="sm"
                    _hover={{
                      borderColor: 'gray.400'
                    }}
                    _focus={{
                      borderColor: 'pink.300',
                      boxShadow: '0 0 0 1px #F687B3'
                    }}
                  />
                </FormControl>
              </SimpleGrid>

              {/* Subject Field */}
              <FormControl>
                <FormLabel 
                  fontSize="sm" 
                  color="gray.600" 
                  fontWeight="normal"
                  mb={2}
                >
                  Subject
                </FormLabel>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                  px={4}
                  py={3}
                  fontSize="sm"
                  _hover={{
                    borderColor: 'gray.400'
                  }}
                  _focus={{
                    borderColor: 'pink.300',
                    boxShadow: '0 0 0 1px #F687B3'
                  }}
                />
              </FormControl>

              {/* Comment Field */}
              <FormControl>
                <FormLabel 
                  fontSize="sm" 
                  color="gray.600" 
                  fontWeight="normal"
                  mb={2}
                >
                  Comment
                </FormLabel>
                <Textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                  px={4}
                  py={3}
                  fontSize="sm"
                  rows={6}
                  resize="vertical"
                  _hover={{
                    borderColor: 'gray.400'
                  }}
                  _focus={{
                    borderColor: 'pink.300',
                    boxShadow: '0 0 0 1px #F687B3'
                  }}
                />
              </FormControl>

              {/* Submit Button */}
              <Box>
                <Button
                  type="submit"
                  bg="pink.300"
                  color="white"
                  size="md"
                  px={8}
                  py={3}
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight="medium"
                  _hover={{
                    bg: 'pink.400',
                    transform: 'translateY(-1px)',
                    boxShadow: 'md'
                  }}
                  _active={{
                    bg: 'pink.500',
                    transform: 'translateY(0)'
                  }}
                  transition="all 0.2s"
                >
                  Send
                </Button>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactUs;
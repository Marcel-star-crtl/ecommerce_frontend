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
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { enquiryAPI } from '../../api/api';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    city: '',
    country: '',
    subject: '',
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, comment } = formData;
    if (!firstName.trim()) {
      toast({
        title: 'Error',
        description: 'First name is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!lastName.trim()) {
      toast({
        title: 'Error',
        description: 'Last name is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!email.trim()) {
      toast({
        title: 'Error',
        description: 'Email is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (!comment.trim()) {
      toast({
        title: 'Error',
        description: 'Comment is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const enquiryData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile || '',
        city: formData.city || '',
        country: formData.country || '',
        comment: formData.comment,
        subject: formData.subject || 'General Inquiry'
      };

      const response = await enquiryAPI.createEnquiry(enquiryData);
      
      console.log('Enquiry submitted:', response.data);
      
      setSubmitted(true);
      toast({
        title: 'Success!',
        description: 'Your message has been sent successfully. We\'ll get back to you soon!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        city: '',
        country: '',
        subject: '',
        comment: ''
      });
      
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to send message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
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
                Fill out the contact form below to get in contact with us!
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

          {submitted && (
            <Alert status="success" borderRadius="md">
              <AlertIcon />
              Thank you for your message! We'll get back to you within 24 hours.
            </Alert>
          )}

          {/* Contact Form */}
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              {/* Name Fields */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
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

                <FormControl isRequired>
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

              {/* Email and Mobile */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel 
                    fontSize="sm" 
                    color="gray.600" 
                    fontWeight="normal"
                    mb={2}
                  >
                    Email
                  </FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
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
                    Phone Number (Optional)
                  </FormLabel>
                  <Input
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
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

              {/* Location Fields */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl>
                  <FormLabel 
                    fontSize="sm" 
                    color="gray.600" 
                    fontWeight="normal"
                    mb={2}
                  >
                    City (Optional)
                  </FormLabel>
                  <Input
                    name="city"
                    value={formData.city}
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
                    Country (Optional)
                  </FormLabel>
                  <Input
                    name="country"
                    value={formData.country}
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
              <FormControl isRequired>
                <FormLabel 
                  fontSize="sm" 
                  color="gray.600" 
                  fontWeight="normal"
                  mb={2}
                >
                  Message
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
                  isLoading={loading}
                  loadingText="Sending..."
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
                  Send Message
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
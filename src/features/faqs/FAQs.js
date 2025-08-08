import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Text,
  VStack,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { fetchFAQs } from './faqSlice';

const FAQ = () => {
  const dispatch = useDispatch();
  const { faqs, status, error } = useSelector((state) => state.faqs);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFAQs());
    }
  }, [status, dispatch]);

  // Fallback data in case API fails or is empty
  const fallbackFaqData = [
    {
      question: "Are your products cruelty-free and vegan?",
      answer: "Customers often want to know if the brand tests on animals or uses animal-derived ingredients. Customers often want to know if the brand tests on animals or uses animal-derived ingredients.",
    },
    {
      question: "What skin types are your products suitable for?",
      answer: "Our products are formulated to work with all skin types including sensitive, dry, oily, combination, and normal skin. Each product includes specific recommendations for optimal results."
    },
    {
      question: "Are your products safe for sensitive skin?",
      answer: "Yes, our products are dermatologically tested and formulated with gentle, natural ingredients that are safe for sensitive skin. We recommend doing a patch test before first use."
    },
    {
      question: "What ingredients do you use, are there any harmful chemicals?",
      answer: "We use only natural, clean ingredients sourced responsibly. Our products are free from parabens, sulfates, phthalates, and other harmful chemicals. Full ingredient lists are available on each product page."
    },
    {
      question: "What is your return or refund policy?",
      answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return it for a full refund within 30 days of purchase."
    }
  ];

  const faqData = faqs && faqs.length > 0 ? faqs : fallbackFaqData;

  if (status === 'loading') {
    return (
      <Box
        bg="#fff"
        py={{ base: 12, md: 16 }}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" color="pink.300" />
      </Box>
    );
  }

  if (status === 'failed' && error) {
    return (
      <Box
        bg="#fff"
        py={{ base: 12, md: 16 }}
        width="100%"
      >
        <Container maxW="container.md">
          <Alert status="warning">
            <AlertIcon />
            Unable to load FAQs from server. Showing default FAQs.
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      bg="#fff"
      py={{ base: 12, md: 16 }}
      width="100%"
    >
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Text
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            color="gray.800"
            textAlign="left"
            mb={4}
          >
            FAQS
          </Text>

          <Accordion allowToggle defaultIndex={[0]}>
            {faqData.map((faq, index) => (
              <AccordionItem key={faq._id || index} border="none" borderBottom="1px solid" borderColor="gray.300">
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      py={6}
                      px={0}
                      _hover={{ bg: 'transparent' }}
                      _focus={{ boxShadow: 'none' }}
                      justifyContent="space-between"
                    >
                      <Text
                        fontSize={{ base: 'md', md: 'lg' }}
                        fontWeight="medium"
                        color="gray.800"
                        textAlign="left"
                        flex="1"
                      >
                        {faq.question}
                      </Text>
                      {isExpanded ? (
                        <MinusIcon fontSize="16px" color="gray.600" ml={4} />
                      ) : (
                        <AddIcon fontSize="16px" color="gray.600" ml={4} />
                      )}
                    </AccordionButton>
                    <AccordionPanel pb={6} px={0}>
                      <Text
                        fontSize={{ base: 'sm', md: 'md' }}
                        color="gray.600"
                        lineHeight="1.7"
                      >
                        {faq.answer}
                      </Text>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </Container>
    </Box>
  );
};

export default FAQ;
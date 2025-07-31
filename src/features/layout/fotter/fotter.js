import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Text,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  Link,
  Stack
} from '@chakra-ui/react';

const Footer = () => {
  const footerData = {
    "Join Our Community": [
      { name: "Telegram", url: "https://t.me/shyneen", external: true }
    ],
    "Shop All": [
      { name: "Shop All", url: "/shops", external: false },
      { name: "New Arrivals", url: "/new-arrivals", external: false },
      { name: "Skin Care", url: "/skin-care", external: false },
      { name: "Bath & Body", url: "/bath-body", external: false }
    ],
    "Who We Are": [
      { name: "About Us", url: "/aboutus", external: false },
      { name: "Our Story", url: "/aboutus", external: false },
      { name: "Stores", url: "/stores", external: false }
    ],
    "Connect With Us": [
      { name: "Instagram", url: "https://instagram.com/shyneen", external: true },
      { name: "TikTok", url: "https://tiktok.com/@shyneen", external: true },
      { name: "LinkedIn", url: "https://linkedin.com/company/shyneen", external: true },
      { name: "Facebook", url: "https://facebook.com/shyneen", external: true },
      { name: "SnapChat", url: "https://snapchat.com/add/shyneen", external: true }
    ],
    "Customer Support": [
      { name: "Contact", url: "/contact", external: false },
      { name: "FAQs", url: "/faqs", external: false }
    ],
    "Legal": [
      { name: "Terms", url: "/terms", external: false },
      { name: "Privacy Policy", url: "/privacy-policy", external: false },
      { name: "Shipping Policy", url: "/shipping-policy", external: false },
      { name: "Terms of Service", url: "/terms-of-service", external: false }
    ]
  };

  return (
    <Box
      bg="pink.200"
      pt={{ base: 16, md: 20 }}
      pb={{ base: 12, md: 16 }}
      width="100%"
    >
      <Container maxW="container.xl">
        <VStack spacing={{ base: 12, md: 16 }} align="center">
          {/* Brand Name */}
          <Link
            as={RouterLink}
            to="/home"
            _hover={{ textDecoration: 'none' }}
          >
            <Text
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontWeight="300"
              color="white"
              letterSpacing={{ base: '0.4em', md: '0.5em', lg: '0.6em' }}
              textTransform="uppercase"
              lineHeight="1"
              textAlign="center"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              SHYNEEN
            </Text>
          </Link>

          {/* Footer Links Grid */}
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 6 }}
            spacing={{ base: 8, md: 12 }}
            width="100%"
            maxW="1200px"
          >
            {Object.entries(footerData).map(([category, links]) => (
              <VStack
                key={category}
                align="flex-start"
                spacing={4}
                minH="120px"
              >
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="medium"
                  color="white"
                  opacity="0.9"
                  mb={2}
                >
                  {category}
                </Text>
                
                <VStack align="flex-start" spacing={2}>
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      as={link.external ? 'a' : RouterLink}
                      to={link.external ? undefined : link.url}
                      href={link.external ? link.url : undefined}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      fontSize={{ base: 'xs', md: 'sm' }}
                      color="white"
                      opacity="0.8"
                      _hover={{
                        opacity: 1,
                        textDecoration: 'underline'
                      }}
                      transition="opacity 0.2s"
                    >
                      {link.name}
                    </Link>
                  ))}
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
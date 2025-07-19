import React from 'react';
import { Box, Container, HStack, VStack, Text, Divider } from '@chakra-ui/react';

export default function ShippingPolicy() {
  return (
    <Container maxW="7xl" py={8} px={6}>
      <HStack align="start" spacing={8}>
        {/* Left Column - 30% width */}
        <Box w="30%" flexShrink={0}>
          <Text 
            fontSize="2xl" 
            fontWeight="300" 
            color="pink.300"
            letterSpacing="wide"
          >
            Shipping Policy
          </Text>
        </Box>

        {/* Right Column - 70% width */}
        <Box w="70%" color="gray.700">
          <VStack align="start" spacing={6}>
            {/* Header */}
            <VStack align="start" spacing={2}>
              <Text fontSize="sm" color="gray.500">
                Last Updated: May 31, 2020
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                Welcome to SHYNEEN!
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                By accessing or using our website, products, or services, you agree to be bound by the following terms and conditions
                ("Terms of Service"):
              </Text>
            </VStack>

            {/* 1. Use of Our Services */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                1. Use of Our Services
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                Glowé Cosmetics provides cosmetic and skincare products for personal use only. You agree not to misuse our products or
                services, including reselling them without permission.
              </Text>
            </VStack>

            {/* 2. Eligibility */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                2. Eligibility
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                By using our site, you confirm that you are at least 18 years old or have permission from a parent or legal guardian.
              </Text>
            </VStack>

            {/* 3. Product Information */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                3. Product Information
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                We strive to provide accurate descriptions of our products, but we do not guarantee that information, such as ingredients,
                colors, or results, will be error-free. Products may vary slightly from their images.
              </Text>
            </VStack>

            {/* 4. Orders & Payment */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                4. Orders & Payment
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                All orders are subject to acceptance and availability. We reserve the right to cancel any order at our discretion. Payment
                must be made at the time of order through our secure payment gateway.
              </Text>
            </VStack>

            {/* 5. Shipping & Delivery */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                5. Shipping & Delivery
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                Shipping times are estimates and may vary based on location and external factors. Glowé Cosmetics is not liable for
                delays caused by third-party carriers.
              </Text>
            </VStack>

            {/* 6. Returns & Refunds */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                6. Returns & Refunds
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                We offer a 30-day return policy for unopened and unused products. To initiate a return, contact our support team at
                support@glowecosmetics.com.
              </Text>
            </VStack>

            {/* 7. Intellectual Property */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                7. Intellectual Property
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                All content on this site, including logos, text, and images, is the property of Glowé Cosmetics and may not be used
                without permission.
              </Text>
            </VStack>

            {/* 8. User Conduct */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                8. User Conduct
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                You agree not to post or transmit any material that is defamatory, harassing, or offensive through our website or social
                media channels.
              </Text>
            </VStack>

            {/* 9. Limitation of Liability */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                9. Limitation of Liability
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                Glowé Cosmetics is not liable for any damages arising from the use or misuse of our products. Always perform a patch
                test before use.
              </Text>
            </VStack>

            {/* 10. Modifications */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                10. Modifications
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                We reserve the right to change these Terms of Service at any time. Continued use of the site constitutes your acceptance
                of the new terms.
              </Text>
            </VStack>

            {/* 11. Contact Us */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                11. Contact Us
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                For any questions about these Terms, reach out to us at:
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                Email: support@glowecosmetics.com
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                By accessing or using our website, products, or services, you agree to be bound by the
                following terms and conditions ("Terms of Service"):
              </Text>
            </VStack>

            {/* Repeated sections for completeness */}
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                1. Use of Our Services
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                Glowé Cosmetics provides cosmetic and skincare products for personal use only. You agree not to misuse our products or
                services, including reselling them without permission.
              </Text>
            </VStack>

            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                2. Eligibility
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                By using our site, you confirm that you are at least 18 years old or have permission from a parent or legal guardian.
              </Text>
            </VStack>

            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                3. Product Information
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                We strive to provide accurate descriptions of our products, but we do not guarantee that information, such as ingredients,
                colors, or results, will be error-free. Products may vary slightly from their images.
              </Text>
            </VStack>

            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                4. Orders & Payment
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                All orders are subject to acceptance and availability. We reserve the right to cancel any order at our discretion. Payment
                must be made at the time of order through our secure payment gateway.
              </Text>
            </VStack>

            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                5. Shipping & Delivery
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                Shipping times are estimates and may vary based on location and external factors. Glowé Cosmetics is not liable for
                delays caused by third-party carriers.
              </Text>
            </VStack>

            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                6. Returns & Refunds
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                We offer a 30-day return policy for unopened and unused products. To initiate a return, contact our support team at
                support@glowecosmetics.com.
              </Text>
            </VStack>

            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                7. Intellectual Property
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                All content on this site, including logos, text, and images, is the property of Glowé Cosmetics and may not be used
                without permission.
              </Text>
            </VStack>

            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="semibold" color="black">
                8. User Conduct
              </Text>
              <Text fontSize="sm" lineHeight="1.6">
                You agree not to post or transmit any material that is defamatory, harassing, or offensive through our website or social
                media channels.
              </Text>
            </VStack>
          </VStack>
        </Box>
      </HStack>
    </Container>
  );
}
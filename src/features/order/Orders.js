import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./ordersSlice";
import { logout } from "../auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { cartAPI, userAPI } from '../../api/api';
import Loader from '../../components/Loader/Loader';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
  Spacer,
  Divider,
  Badge,
  Card,
  CardBody,
  useColorModeValue,
  Input,
  Select,
  Grid,
  GridItem,
  Icon,
  SimpleGrid,
  FormControl,
  FormLabel,
  useToast
} from "@chakra-ui/react";
import { FiPackage, FiCreditCard, FiRefreshCw, FiLogOut, FiSearch, FiFilter } from "react-icons/fi";

export default function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const { orders, status, error } = useSelector((state) => state.orders);

  const [activeTab, setActiveTab] = useState('orderHistory');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    address: user?.address || '',
  });

  const bgColorr = useColorModeValue("gray.50", "gray.900");
  const bgColor = useColorModeValue("white", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  // Define the correct Cloudinary cloud name
  const CLOUDINARY_CLOUD_NAME = 'ddlhwv65t';

  useEffect(() => {
    if (isLoggedIn && userId) {
      dispatch(fetchOrders({ userId, timestamp: Date.now() }));
    }
  }, [dispatch, isLoggedIn, userId]);

  // Fetch all orders (admin only) if user is admin
  const fetchAllOrders = async () => {
    try {
      const response = await cartAPI.getAllOrders();
      console.log('All orders:', response.data);
    } catch (error) {
      console.error('Error fetching all orders:', error);
    }
  };

  useEffect(() => {
    // Update form data when user data changes
    setFormData({
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      address: user?.address || '',
    });
  }, [user]);

  const handleRefresh = () => {
    if (userId) {
      dispatch(fetchOrders({ userId, timestamp: Date.now() }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'green';
      case 'processing':
      case 'dispatched':
        return 'blue';
      case 'pending':
        return 'orange';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getCloudinaryUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.includes('res.cloudinary.com')) return imageUrl;
    const urlParts = imageUrl.split('/');
    const imageId = urlParts[urlParts.length - 1];
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`;
  };

  const getOrderItemImageUrl = (item) => {
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      const firstImage = item.images[0];
      if (firstImage?.url) return getCloudinaryUrl(firstImage.url);
      if (firstImage?.image) return getCloudinaryUrl(firstImage.image);
      if (typeof firstImage === 'string') return getCloudinaryUrl(firstImage);
    } 
    if (item.image) return getCloudinaryUrl(item.image);
    if (item.product?.images && Array.isArray(item.product.images) && item.product.images.length > 0) {
      const firstImage = item.product.images[0];
      if (firstImage?.url) return getCloudinaryUrl(firstImage.url);
      if (firstImage?.image) return getCloudinaryUrl(firstImage.image);
      if (typeof firstImage === 'string') return getCloudinaryUrl(firstImage);
    }
    if (item.product?.image) return getCloudinaryUrl(item.product.image);
    return 'https://via.placeholder.com/120x120/f8f9fa/666666?text=No+Image';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products?.some(item => 
        item.product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product?.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === 'all' || 
      order.orderStatus?.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const recentOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return orderDate >= thirtyDaysAgo;
  });

  const returns = [
    {
      id: 'RET-001',
      orderId: 'ORD-12345',
      productName: 'Celestial Nightly Skin Repair Oil Serum',
      returnDate: '2024-12-15',
      status: 'Processing',
      refundAmount: 45.99,
      reason: 'Product not as described'
    },
    {
      id: 'RET-002', 
      orderId: 'ORD-12340',
      productName: 'Hydrating Face Cleanser',
      returnDate: '2024-12-10',
      status: 'Approved',
      refundAmount: 25.99,
      reason: 'Damaged during shipping'
    }
  ];

  const tabs = [
    {
      id: 'orderHistory',
      name: 'Order History',
      count: orders.length
    },
    {
      id: 'returns',
      name: 'Returns',
      count: returns.length
    },
    {
      id: 'recentOrders',
      name: 'Recent Orders',
      count: recentOrders.length
    },
    {
      id: 'paymentCredits',
      name: 'Payment & Credits',
      count: 0
    },
    {
      id: 'profilewel',
      name: 'Profile',
      count: 0
    }
  ];

  const renderAccountInfo = () => (
    <VStack spacing={8} align="stretch">
      <Text fontSize="2xl" fontWeight="bold" color="black">
        {`Welcome ${user?.firstname || ''} ${user?.lastname || ''}`}
      </Text>
      
      <VStack spacing={6} align="stretch">
        <HStack spacing={6} align="start">
          <VStack align="start" spacing={2} flex={1}>
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              First Name
            </Text>
            {editMode ? (
              <Input
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
              />
            ) : (
              <Text fontSize="sm" color="black" p={2}>
                {user?.firstname || 'Not provided'}
              </Text>
            )}
          </VStack>
          
          <VStack align="start" spacing={2} flex={1}>
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              Last Name
            </Text>
            {editMode ? (
              <Input
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
              />
            ) : (
              <Text fontSize="sm" color="black" p={2}>
                {user?.lastname || 'Not provided'}
              </Text>
            )}
          </VStack>
          
          {editMode ? (
            <VStack spacing={2}>
              <Button
                variant="outline"
                size="sm"
                borderColor="gray.300"
                color="gray.600"
                bg="white"
                _hover={{ bg: "gray.50" }}
                px={4}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
              <Button
                bg="black"
                color="white"
                size="sm"
                _hover={{ bg: "gray.800" }}
                px={6}
                onClick={handleUpdateProfile}
              >
                Save
              </Button>
            </VStack>
          ) : (
            <Button
              variant="outline"
              size="sm"
              borderColor="gray.300"
              color="gray.600"
              bg="white"
              _hover={{ bg: "gray.50" }}
              px={4}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          )}
        </HStack>

        <VStack spacing={4} align="stretch">
          <HStack justify="space-between" align="center" py={3}>
            <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
              Email
            </Text>
            <Text fontSize="sm" color="gray.500" flex={1}>
              {user?.email || 'Not provided'}
            </Text>
            <Button
              variant="link"
              color="blue.500"
              fontSize="sm"
              fontWeight="normal"
              onClick={() => navigate('/change-email')}
            >
              Change
            </Button>
          </HStack>

          <HStack justify="space-between" align="center" py={3}>
            <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
              Mobile
            </Text>
            {editMode ? (
              <Input
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                flex={1}
              />
            ) : (
              <Text fontSize="sm" color="gray.500" flex={1}>
                {user?.mobile || 'Not provided'}
              </Text>
            )}
          </HStack>

          <HStack justify="space-between" align="center" py={3}>
            <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
              Address
            </Text>
            {editMode ? (
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                flex={1}
              />
            ) : (
              <Text fontSize="sm" color="gray.500" flex={1}>
                {user?.address || 'Not provided'}
              </Text>
            )}
          </HStack>

          {/* Password */}
          <HStack justify="space-between" align="center" py={3}>
            <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
              Password
            </Text>
            <Text fontSize="sm" color="gray.500" flex={1}>
              ••••••••••••••••••••
            </Text>
            <Button
              variant="link"
              color="blue.500"
              fontSize="sm"
              fontWeight="normal"
              onClick={() => navigate('/change-password')}
            >
              Change
            </Button>
          </HStack>

          {/* Account Status */}
          <HStack justify="space-between" align="center" py={3}>
            <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
              Status
            </Text>
            <Text fontSize="sm" color="gray.500" flex={1}>
              {user?.isBlocked ? 'Blocked' : 'Active'}
            </Text>
            {user?.isBlocked && (
              <Button
                variant="link"
                color="blue.500"
                fontSize="sm"
                fontWeight="normal"
                onClick={() => navigate('/contact-support')}
              >
                Contact Support
              </Button>
            )}
          </HStack>
        </VStack>

        {/* Account Actions */}
        <VStack spacing={4} mt={8} align="start">
          <Button
            variant="outline"
            colorScheme="red"
            size="sm"
            onClick={() => {
            }}
          >
            Delete Account
          </Button>
          <Text fontSize="xs" color="gray.500">
            Last updated: {user?.updatedAt ? formatDate(user.updatedAt) : 'Unknown'}
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );

  const renderOrderHistory = () => (
    <VStack spacing={6} align="stretch">
      <HStack spacing={4}>
        <Box position="relative" flex={1}>
          <Icon as={FiSearch} position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400" />
          <Input
            pl={10}
            placeholder="Search orders by ID or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="white"
            borderColor="gray.200"
          />
        </Box>
        <Select
          w="200px"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          bg="white"
          borderColor="gray.200"
        >
          <option value="all">All Orders</option>
          <option value="delivered">Delivered</option>
          <option value="processing">Processing</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </Select>
      </HStack>

      {filteredOrders.length === 0 ? (
        <Card bg="white" border="1px" borderColor="gray.200">
          <CardBody>
            <VStack spacing={4} py={8}>
              <Icon as={FiPackage} size="48px" color="gray.400" />
              <Text fontSize="lg" color="gray.600">
                {searchTerm || statusFilter !== 'all' ? 'No orders match your search criteria' : 'You haven\'t placed any orders yet'}
              </Text>
              <Button as={Link} to="/shops" colorScheme="pink">
                Browse Products
              </Button>
            </VStack>
          </CardBody>
        </Card>
      ) : (
        <VStack spacing={4} align="stretch">
          {filteredOrders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((order) => (
              <Card 
                key={order._id} 
                bg="white" 
                border="1px" 
                borderColor="gray.200" 
                borderRadius="0"
                shadow="none"
              >
                <CardBody p={6}>
                  <VStack spacing={4} align="stretch">
                    {order.products?.map((item, index) => (
                      <Box key={index}>
                        <HStack spacing={6} align="start">
                          <Box
                            width="120px"
                            height="120px"
                            backgroundColor="#f8f9fa"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                            overflow="hidden"
                            padding="0px"
                          >
                            <Image
                              src={getOrderItemImageUrl(item)}
                              alt={item.product?.title || item.product?.name || "Product"}
                              width="120px"
                              height="120px"
                              objectFit="cover"
                              display="block"
                              cursor="pointer"
                              onClick={() => console.log("Navigate to product:", item.product?._id)}
                            />
                          </Box>
                          
                          <VStack align="start" spacing={2} flex={1}>
                            <Text fontWeight="bold" color="black" fontSize="md">
                              {item.product?.brand || "Shyneen Glow"}
                            </Text>
                            <Text fontSize="sm" color="gray.700" lineHeight="1.4">
                              {item.product?.title || item.product?.name || "Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap"}
                            </Text>
                            <Text fontSize="sm" color="gray.500" letterSpacing="wide">
                              ITEM {item.product?.slug || item.product?._id?.slice(-8).toUpperCase() || "2678394"}
                            </Text>
                            <Text fontSize="sm" color="black">
                              Size: {item.product?.size || "1 oz/30 mL"}
                            </Text>
                          </VStack>

                          <VStack align="end" spacing={4} minW="300px">
                            <Box>
                              <HStack spacing={8} mb={3}>
                                <VStack align="center" spacing={1}>
                                  <Text fontSize="sm" color="gray.600">Order Number</Text>
                                  <Text fontSize="sm" color="black" fontWeight="semibold">
                                    #{order.shortId || order._id?.slice(-8) || "234576890987"}
                                  </Text>
                                </VStack>
                                <VStack align="center" spacing={1}>
                                  <Badge colorScheme={getStatusColor(order.orderStatus)} variant="subtle">
                                    {order.orderStatus || "Delivered"}
                                  </Badge>
                                </VStack>
                              </HStack>
                              
                              <HStack spacing={8} mb={3}>
                                <VStack align="center" spacing={1}>
                                  <Text fontSize="sm" color="gray.600">Order Date</Text>
                                  <Text fontSize="sm" color="black" fontWeight="semibold">
                                    {formatDate(order.createdAt)}
                                  </Text>
                                </VStack>
                                <VStack align="center" spacing={1}>
                                  <Text fontSize="sm" color="gray.600">Delivery Date</Text>
                                  <Text fontSize="sm" color="black" fontWeight="semibold">
                                    {order.deliveryDate ? formatDate(order.deliveryDate) : "Jan 25, 2025"}
                                  </Text>
                                </VStack>
                              </HStack>
                              
                              <HStack spacing={8}>
                                <VStack align="center" spacing={1}>
                                  <Text fontSize="sm" color="gray.600">Ship to</Text>
                                  <Text fontSize="sm" color="black" fontWeight="semibold">
                                    {order.userDetails?.address || "Chicago USA"}
                                  </Text>
                                </VStack>
                                <VStack align="center" spacing={1}>
                                  <Text fontSize="sm" color="gray.600">Payment Method</Text>
                                  <Text fontSize="sm" color="black" fontWeight="semibold">
                                    {order.paymentIntent || "CCD"}
                                  </Text>
                                </VStack>
                              </HStack>
                            </Box>
                            
                            <Box borderTop="1px" borderColor="gray.200" pt={3} w="full">
                              <HStack justify="space-between">
                                <Text fontSize="sm" color="gray.500">Total Amount:</Text>
                                <Text fontSize="sm" color="black" fontWeight="bold">
                                  ${order.totalAmount}
                                </Text>
                              </HStack>
                            </Box>
                          </VStack>
                        </HStack>
                        
                        {index < order.products.length - 1 && (
                          <Divider my={6} borderColor="gray.200" />
                        )}
                      </Box>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            ))}
        </VStack>
      )}
    </VStack>
  );

  const renderPaymentCredits = () => (
    <VStack spacing={8} align="stretch">
      <Text fontSize="2xl" fontWeight="bold" color="black">
        Payments & Credits
      </Text>
      
      <HStack spacing={12} align="start">
        <VStack align="start" spacing={4} w="300px">
          <Text fontSize="lg" fontWeight="semibold" color="black">
            Credit / Debit Cards
          </Text>
        </VStack>

        <VStack align="start" spacing={4} flex={1}>
          <Text fontSize="lg" fontWeight="semibold" color="black" mb={4}>
            Credit / Debit Cards
          </Text>
          
          <VStack spacing={4} align="stretch" w="full" maxW="400px">
            <FormControl>
              <Select
                placeholder="Card Type*"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
              >
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
              </Select>
            </FormControl>

            <FormControl>
              <Input
                placeholder="Card Number*"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
              />
            </FormControl>

            <HStack spacing={3}>
              <Input
                placeholder="MM*"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
                maxW="80px"
              />
              <Input
                placeholder="YY*"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
                maxW="80px"
              />
              <Input
                placeholder="CVV/CVC*"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
                maxW="100px"
              />
            </HStack>

            <FormControl>
              <Input
                placeholder="First Name"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
              />
            </FormControl>

            <FormControl>
              <Input
                placeholder="Last Name"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
              />
            </FormControl>

            <FormControl>
              <Select
                placeholder="Country"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
              >
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
              </Select>
            </FormControl>

            <FormControl>
              <Input
                placeholder="Phone (for delivery questions)"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
              />
            </FormControl>

            <FormControl>
              <Input
                placeholder="Street Address"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
              />
            </FormControl>

            <FormControl>
              <Input
                placeholder="ZIP/Postal Code"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
              />
            </FormControl>

            <FormControl>
              <Input
                placeholder="City"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
              />
            </FormControl>

            <FormControl>
              <Input
                placeholder="State/Province"
                bg="white"
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                h="40px"
                fontSize="sm"
                color="gray.500"
              />
            </FormControl>
          </VStack>
        </VStack>
      </HStack>
    </VStack>
  );

  const renderReturns = () => (
    <VStack spacing={6} align="stretch">
      {returns.length === 0 ? (
        <Card bg="white" border="1px" borderColor="gray.200">
          <CardBody>
            <VStack spacing={4} py={8}>
              <Icon as={FiRefreshCw} size="48px" color="gray.400" />
              <Text fontSize="lg" color="gray.600">
                You have no returns at this time
              </Text>
              <Button as={Link} to="/shops" colorScheme="pink">
                Browse Products
              </Button>
            </VStack>
          </CardBody>
        </Card>
      ) : (
        <VStack spacing={4} align="stretch">
          {returns.map((returnItem) => (
            <Card 
              key={returnItem.id} 
              bg="white" 
              border="1px" 
              borderColor="gray.200" 
              borderRadius="0"
              shadow="none"
            >
              <CardBody p={6}>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color="gray.600">Return ID</Text>
                      <Text fontSize="sm" color="black" fontWeight="semibold">
                        {returnItem.id}
                      </Text>
                    </VStack>
                    <VStack align="end" spacing={1}>
                      <Text fontSize="sm" color="gray.600">Order ID</Text>
                      <Text fontSize="sm" color="black" fontWeight="semibold">
                        {returnItem.orderId}
                      </Text>
                    </VStack>
                  </HStack>
                  
                  <Divider />
                  
                  <VStack align="start" spacing={2}>
                    <Text fontSize="md" color="black" fontWeight="semibold">
                      {returnItem.productName}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Reason: {returnItem.reason}
                    </Text>
                    <HStack justify="space-between" w="full">
                      <Text fontSize="sm" color="gray.600">
                        Return Date: {formatDate(returnItem.returnDate)}
                      </Text>
                      <Badge colorScheme={returnItem.status === 'Approved' ? 'green' : 'orange'}>
                        {returnItem.status}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="black" fontWeight="semibold">
                      Refund Amount: ${returnItem.refundAmount}
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}
    </VStack>
  );

  const renderRecentOrders = () => (
    <VStack spacing={6} align="stretch">
      {recentOrders.length === 0 ? (
        <Card bg="white" border="1px" borderColor="gray.200">
          <CardBody>
            <VStack spacing={4} py={8}>
              <Icon as={FiPackage} size="48px" color="gray.400" />
              <Text fontSize="lg" color="gray.600">
                No recent orders in the last 30 days
              </Text>
              <Button as={Link} to="/shops" colorScheme="pink">
                Browse Products
              </Button>
            </VStack>
          </CardBody>
        </Card>
      ) : (
        <VStack spacing={4} align="stretch">
          {recentOrders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((order) => (
              <Card 
                key={order._id} 
                bg="white" 
                border="1px" 
                borderColor="gray.200" 
                borderRadius="0"
                shadow="none"
              >
                <CardBody p={6}>
                  <VStack spacing={4} align="stretch">
                    {order.products?.map((item, index) => (
                      <Box key={index}>
                        <HStack spacing={6} align="start">
                          <Box
                            width="120px"
                            height="120px"
                            backgroundColor="gray.50"
                            borderRadius="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                            overflow="hidden"
                            padding="0"
                          >
                            <Image
                              src={getOrderItemImageUrl(item)}
                              alt={item.product?.title || item.product?.name || "Product"}
                              boxSize="120px"
                              objectFit="cover"
                              borderRadius="0"
                              display="block"
                            />
                          </Box>
                          
                          <VStack align="start" spacing={2} flex={1}>
                            <Text fontWeight="bold" color="black" fontSize="md">
                              {item.product?.brand || "Shyneen Glow"}
                            </Text>
                            <Text fontSize="sm" color="gray.700" lineHeight="1.4">
                              {item.product?.title || item.product?.name || "Celestial Nightly Skin Repair Oil Serum"}
                            </Text>
                            <Text fontSize="sm" color="gray.500" letterSpacing="wide">
                              ITEM {item.product?.slug || "2678394"}
                            </Text>
                            <Text fontSize="sm" color="black">
                              Size: {item.product?.size || "1 oz/30 mL"}
                            </Text>
                          </VStack>

                          <VStack align="end" spacing={4} minW="300px">
                            <Box>
                              <HStack spacing={8} mb={3}>
                                <VStack align="center" spacing={1}>
                                  <Text fontSize="sm" color="gray.600">Order Number</Text>
                                  <Text fontSize="sm" color="black" fontWeight="semibold">
                                    #{order.shortId || order._id?.slice(-8) || "234576890987"}
                                  </Text>
                                </VStack>
                                <VStack align="center" spacing={1}>
                                  <Badge colorScheme={getStatusColor(order.orderStatus)} variant="subtle">
                                    {order.orderStatus || "Delivered"}
                                  </Badge>
                                </VStack>
                              </HStack>
                              
                              <HStack spacing={8} mb={3}>
                                <VStack align="center" spacing={1}>
                                  <Text fontSize="sm" color="gray.600">Order Date</Text>
                                  <Text fontSize="sm" color="black" fontWeight="semibold">
                                    {formatDate(order.createdAt)}
                                  </Text>
                                </VStack>
                                <VStack align="center" spacing={1}>
                                  <Text fontSize="sm" color="gray.600">Total</Text>
                                  <Text fontSize="sm" color="black" fontWeight="semibold">
                                    ${order.totalAmount}
                                  </Text>
                                </VStack>
                              </HStack>
                            </Box>
                          </VStack>
                        </HStack>
                        
                        {index < order.products.length - 1 && (
                          <Divider my={6} borderColor="gray.200" />
                        )}
                      </Box>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            ))}
        </VStack>
      )}
    </VStack>
  );

  // Enhanced order management functions
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await cartAPI.updateOrderStatus(orderId, newStatus);
      // Refresh orders after update
      dispatch(fetchOrders({ userId, timestamp: Date.now() }));
      toast({
        title: "Order status updated",
        description: `Order status changed to ${newStatus}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating order",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await userAPI.updateProfile({
        firstname: formData.firstname,
        lastname: formData.lastname,
        mobile: formData.mobile
      });
      
      if (formData.address !== user?.address) {
        await userAPI.saveAddress(formData.address);
      }
      
      setEditMode(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Loading state
  if (status === 'loading') {
    return <Loader fullScreen />;
  }

  // Error state
  if (error) {
    return (
      <Container maxW="6xl" py={8} bg={bgColor} minH="100vh">
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Error Loading Orders</Text>
            <Text>{error}</Text>
          </Box>
        </Alert>
        <Button 
          mt={4} 
          colorScheme="pink" 
          onClick={handleRefresh} 
          disabled={!userId}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  // Not logged in state
  if (!isLoggedIn || !userId) {
    return (
      <Container maxW="6xl" py={8} bg={bgColor} minH="100vh">
        <Flex justify="center" align="center" h="50vh">
          <VStack spacing={4}>
            <Text fontSize="xl" color="gray.600">
              Please log in to view your orders
            </Text>
            <Button as={Link} to="/login" colorScheme="pink">
              Login
            </Button>
          </VStack>
        </Flex>
      </Container>
    );
  }

  return (
    <>
      <Container maxW="100%" py={12} bg={bgColorr} style={{padding: "4rem 4rem"}}>
        <VStack spacing={8} align="stretch" maxW="12xl">
          <HStack justify="space-between" align="center" bg={bgColorr}>
            <Text fontSize="3xl" fontWeight="bold" color="black">
              My Account
            </Text>
            <HStack spacing={4}>
              <Button
                leftIcon={<FiRefreshCw />}
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={status === 'loading'}
              >
                Refresh
              </Button>
              <Button
                leftIcon={<FiLogOut />}
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </HStack>
          </HStack>
        </VStack>
      </Container>
      <Container maxW="8xl" py={8} bg={bgColor} minH="100vh">
        <VStack spacing={8} align="stretch">
          <HStack align="start" spacing={8}>
            {/* Left Sidebar Navigation */}
            <VStack spacing={2} align="stretch" w="250px" bg="white" p={4} borderRadius="md">
              <Text fontSize="sm" color="gray.500" mb={2} textTransform="uppercase" letterSpacing="wide">
                Account Information
              </Text>
              
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={() => setActiveTab(tab.id)}
                  bg={activeTab === tab.id ? "gray.100" : "transparent"}
                  color={activeTab === tab.id ? "black" : "gray.600"}
                  fontWeight={activeTab === tab.id ? "semibold" : "normal"}
                  _hover={{ bg: "gray.50" }}
                >
                  <HStack justify="space-between" w="full">
                    <Text>{tab.name}</Text>
                    {tab.count > 0 && (
                      <Badge size="sm" colorScheme="gray">
                        {tab.count}
                      </Badge>
                    )}
                  </HStack>
                </Button>
              ))}
              
              <Divider my={4} />
              
              <Button
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<Icon as={FiLogOut} />}
                onClick={handleLogout}
                color="gray.600"
                fontWeight="normal"
                _hover={{ bg: "gray.50" }}
              >
                Log out
              </Button>
            </VStack>

            {/* Main Content Area */}
            <Box flex={1} bg="white" p={8} borderRadius="md">
              {activeTab === 'orderHistory' && renderOrderHistory()}
              {activeTab === 'returns' && renderReturns()}
              {activeTab === 'recentOrders' && renderRecentOrders()}
              {activeTab === 'paymentCredits' && renderPaymentCredits()}
              {activeTab === 'profilewel' && renderAccountInfo()}
              {(activeTab !== 'orderHistory' && activeTab !== 'returns' && activeTab !== 'recentOrders' && activeTab !== 'paymentCredits' && activeTab !== 'profilewel') && renderAccountInfo()}
            </Box>
          </HStack>
        </VStack>
      </Container>
    </>
  );
}
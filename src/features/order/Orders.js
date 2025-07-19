// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import OrderDetails from "./OrderDetails";
// import { fetchOrders } from "./ordersSlice";
// import {
//   MDBCard,
//   MDBCardHeader,
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// import { Link } from "react-router-dom";

// export default function Orders() {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const orders = useSelector((state) => state.orders.orders);

//   useEffect(() => {
//     if (isLoggedIn) {
//       dispatch(fetchOrders());
//     }
//   }, [dispatch, isLoggedIn]);

//   console.log(orders);
//   return (
//     <>
//       <section
//         className="h-100 gradient-custom"
//         style={{ backgroundColor: "#eee" }}
//       >
//         {!orders.length ? (
//           <MDBContainer className="py-5 h-100">
//             <MDBRow className="justify-content-center align-items-center h-100">
//               <MDBCol lg="10" xl="8">
//                 <MDBCard style={{ borderRadius: "10px" }}>
//                   <MDBCardHeader className="px-4 py-5">
//                     <MDBTypography tag="h5" className="text-muted mb-0">
//                       No Orders In This Page Yet
//                     </MDBTypography>
//                   </MDBCardHeader>
//                 </MDBCard>
//               </MDBCol>
//             </MDBRow>
//           </MDBContainer>
//         ) : (
//           orders.map((order) => <OrderDetails key={order.id} order={order} />)
//         )}
//       </section>
//     </>
//   );
// }











// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import OrderDetails from "./OrderDetails";
// import { fetchOrders } from "./ordersSlice";
// import {
//   MDBCard,
//   MDBCardHeader,
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBTypography,
//   MDBBtn,
//   MDBSpinner
// } from "mdb-react-ui-kit";
// import { Link } from "react-router-dom";

// export default function Orders() {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const user = useSelector((state) => state.auth.user);
//   const userId = user?._id; // Fixed: Make sure we get the userId properly
//   const { orders, status, error } = useSelector((state) => state.orders);

//   // Debug logging
//   console.log("Orders Component Debug:", {
//     isLoggedIn,
//     user,
//     userId,
//     ordersState: { orders, status, error }
//   });

//   useEffect(() => {
//     console.log("useEffect triggered:", { isLoggedIn, userId });
    
//     if (isLoggedIn && userId) {
//       console.log("Dispatching fetchOrders with userId:", userId);
//       // Add timestamp to prevent caching
//       dispatch(fetchOrders({ userId, timestamp: Date.now() }));
//     } else {
//       console.log("Not fetching orders - missing requirements:", { isLoggedIn, userId });
//     }
//   }, [dispatch, isLoggedIn, userId]);

//   const handleRefresh = () => {
//     if (userId) {
//       console.log("Refreshing orders for userId:", userId);
//       dispatch(fetchOrders({ userId, timestamp: Date.now() }));
//     } else {
//       console.error("Cannot refresh - userId is missing");
//     }
//   };

//   // Show loading state
//   if (status === 'loading') {
//     return (
//       <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
//         <MDBContainer className="py-5 h-100">
//           <MDBRow className="justify-content-center align-items-center h-100">
//             <MDBCol lg="10" xl="8">
//               <MDBCard style={{ borderRadius: "10px" }}>
//                 <MDBCardHeader className="px-4 py-5 text-center">
//                   <MDBSpinner grow size="sm" className="me-2" />
//                   <MDBTypography tag="h5" className="text-muted mb-0">
//                     Loading your orders...
//                   </MDBTypography>
//                 </MDBCardHeader>
//               </MDBCard>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </section>
//     );
//   }

//   // Show error state
//   if (error) {
//     return (
//       <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
//         <MDBContainer className="py-5 h-100">
//           <MDBRow className="justify-content-center align-items-center h-100">
//             <MDBCol lg="10" xl="8">
//               <MDBCard style={{ borderRadius: "10px" }}>
//                 <MDBCardHeader className="px-4 py-5 text-center">
//                   <MDBTypography tag="h5" className="text-danger mb-3">
//                     Error Loading Orders
//                   </MDBTypography>
//                   <p className="text-muted mb-3">{error}</p>
//                   <MDBBtn color="primary" onClick={handleRefresh} disabled={!userId}>
//                     Try Again
//                   </MDBBtn>
//                 </MDBCardHeader>
//               </MDBCard>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </section>
//     );
//   }

//   // Show not logged in state
//   if (!isLoggedIn || !userId) {
//     return (
//       <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
//         <MDBContainer className="py-5 h-100">
//           <MDBRow className="justify-content-center align-items-center h-100">
//             <MDBCol lg="10" xl="8">
//               <MDBCard style={{ borderRadius: "10px" }}>
//                 <MDBCardHeader className="px-4 py-5 text-center">
//                   <MDBTypography tag="h5" className="text-muted mb-3">
//                     Please log in to view your orders
//                   </MDBTypography>
//                   <Link to="/login" className="btn btn-primary">
//                     Login
//                   </Link>
//                 </MDBCardHeader>
//               </MDBCard>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </section>
//     );
//   }

//   return (
//     <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
//       {orders.length === 0 && status === 'succeeded' ? (
//         <MDBContainer className="py-5 h-100">
//           <MDBRow className="justify-content-center align-items-center h-100">
//             <MDBCol lg="10" xl="8">
//               <MDBCard style={{ borderRadius: "10px" }}>
//                 <MDBCardHeader className="px-4 py-5 text-center">
//                   <MDBTypography tag="h5" className="text-muted mb-3">
//                     You haven't placed any orders yet
//                   </MDBTypography>
//                   <p className="text-muted mb-3">
//                     Debug: userId={userId}, orders.length={orders.length}, status={status}
//                   </p>
//                   <Link to="/products" className="btn btn-primary">
//                     Browse Products
//                   </Link>
//                 </MDBCardHeader>
//               </MDBCard>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       ) : (
//         <MDBContainer>
//           <MDBRow className="justify-content-center mb-4">
//             <MDBCol md="10" xl="8">
//               <div className="d-flex justify-content-between align-items-center">
//                 <MDBTypography tag="h4">
//                   Your Orders ({orders.length})
//                 </MDBTypography>
//                 <MDBBtn outline color="primary" size="sm" onClick={handleRefresh}>
//                   Refresh Orders
//                 </MDBBtn>
//               </div>
//             </MDBCol>
//           </MDBRow>
//           {orders
//             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//             .map((order) => {
//               console.log("Rendering order:", order);
//               return <OrderDetails key={order._id} order={order} />;
//             })}
//         </MDBContainer>
//       )}
//     </section>
//   );
// }











// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrders } from "./ordersSlice";
// import { Link } from "react-router-dom";
// import {
//   Box,
//   Container,
//   VStack,
//   HStack,
//   Text,
//   Image,
//   Button,
//   Spinner,
//   Alert,
//   AlertIcon,
//   Flex,
//   Divider,
//   Badge,
//   Card,
//   CardBody,
//   Grid,
//   GridItem,
//   useColorModeValue
// } from "@chakra-ui/react";

// export default function Orders() {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const user = useSelector((state) => state.auth.user);
//   const userId = user?._id;
//   const { orders, status, error } = useSelector((state) => state.orders);

//   const bgColor = useColorModeValue("gray.50", "gray.900");
//   const cardBg = useColorModeValue("white", "gray.800");
//   const sidebarBg = useColorModeValue("white", "gray.800");

//   useEffect(() => {
//     console.log("useEffect triggered:", { isLoggedIn, userId });
    
//     if (isLoggedIn && userId) {
//       console.log("Dispatching fetchOrders with userId:", userId);
//       dispatch(fetchOrders({ userId, timestamp: Date.now() }));
//     } else {
//       console.log("Not fetching orders - missing requirements:", { isLoggedIn, userId });
//     }
//   }, [dispatch, isLoggedIn, userId]);

//   const handleRefresh = () => {
//     if (userId) {
//       console.log("Refreshing orders for userId:", userId);
//       dispatch(fetchOrders({ userId, timestamp: Date.now() }));
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'delivered':
//         return 'green';
//       case 'processing':
//       case 'dispatched':
//         return 'blue';
//       case 'pending':
//         return 'orange';
//       case 'cancelled':
//         return 'red';
//       default:
//         return 'gray';
//     }
//   };

//   // Loading state
//   if (status === 'loading') {
//     return (
//       <Box bg={bgColor} minH="100vh">
//         <Container maxW="7xl" py={8}>
//           <Flex justify="center" align="center" h="50vh">
//             <VStack spacing={4}>
//               <Spinner size="xl" color="pink.500" />
//               <Text color="gray.600">Loading your orders...</Text>
//             </VStack>
//           </Flex>
//         </Container>
//       </Box>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <Box bg={bgColor} minH="100vh">
//         <Container maxW="7xl" py={8}>
//           <Alert status="error" borderRadius="md">
//             <AlertIcon />
//             <Box>
//               <Text fontWeight="bold">Error Loading Orders</Text>
//               <Text>{error}</Text>
//             </Box>
//           </Alert>
//           <Button 
//             mt={4} 
//             colorScheme="pink" 
//             onClick={handleRefresh} 
//             disabled={!userId}
//           >
//             Try Again
//           </Button>
//         </Container>
//       </Box>
//     );
//   }

//   // Not logged in state
//   if (!isLoggedIn || !userId) {
//     return (
//       <Box bg={bgColor} minH="100vh">
//         <Container maxW="7xl" py={8}>
//           <Flex justify="center" align="center" h="50vh">
//             <VStack spacing={4}>
//               <Text fontSize="xl" color="gray.600">
//                 Please log in to view your orders
//               </Text>
//               <Button as={Link} to="/login" colorScheme="pink">
//                 Login
//               </Button>
//             </VStack>
//           </Flex>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box bg={bgColor} minH="100vh">
//       <Container maxW="7xl" py={8}>
//         <Grid templateColumns="250px 1fr" gap={8}>
//           {/* Sidebar */}
//           <GridItem>
//             <Box bg={sidebarBg} p={6} borderRadius="md" h="fit-content">
//               <VStack align="stretch" spacing={4}>
//                 <Text fontSize="sm" color="gray.500" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide">
//                   Account Information
//                 </Text>
                
//                 <VStack align="stretch" spacing={2}>
//                   <Button
//                     variant="ghost"
//                     justifyContent="flex-start"
//                     fontWeight="semibold"
//                     color="black"
//                     bg="transparent"
//                     _hover={{ bg: "gray.50" }}
//                     px={0}
//                   >
//                     Order History
//                   </Button>
//                   <Button 
//                     variant="ghost" 
//                     justifyContent="flex-start" 
//                     color="gray.600"
//                     _hover={{ bg: "gray.50" }}
//                     px={0}
//                   >
//                     Returns
//                   </Button>
//                   <Button 
//                     variant="ghost" 
//                     justifyContent="flex-start" 
//                     color="gray.600"
//                     _hover={{ bg: "gray.50" }}
//                     px={0}
//                   >
//                     Recent Orders
//                   </Button>
//                   <Button 
//                     variant="ghost" 
//                     justifyContent="flex-start" 
//                     color="gray.600"
//                     _hover={{ bg: "gray.50" }}
//                     px={0}
//                   >
//                     Payment & Credits
//                   </Button>
//                   <Button 
//                     variant="ghost" 
//                     justifyContent="flex-start" 
//                     color="gray.600"
//                     _hover={{ bg: "gray.50" }}
//                     px={0}
//                   >
//                     Log out
//                   </Button>
//                 </VStack>
//               </VStack>
//             </Box>
//           </GridItem>

//           {/* Main Content */}
//           <GridItem>
//             <VStack align="stretch" spacing={6}>
//               <Text fontSize="2xl" fontWeight="normal" color="black">
//                 Order History
//               </Text>

//               {orders.length === 0 && status === 'succeeded' ? (
//                 <Card bg={cardBg} border="1px" borderColor="gray.200">
//                   <CardBody>
//                     <VStack spacing={4} py={8}>
//                       <Text fontSize="lg" color="gray.600">
//                         You haven't placed any orders yet
//                       </Text>
//                       <Button as={Link} to="/products" colorScheme="pink">
//                         Browse Products
//                       </Button>
//                     </VStack>
//                   </CardBody>
//                 </Card>
//               ) : (
//                 <VStack spacing={4} align="stretch">
//                   {orders
//                     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//                     .map((order) => (
//                       <Card key={order._id} bg={cardBg} border="1px" borderColor="gray.200" borderRadius="md">
//                         <CardBody p={6}>
//                           {/* Order Items */}
//                           <VStack spacing={4} align="stretch">
//                             {order.products?.map((item, index) => (
//                               <Box key={index}>
//                                 <HStack spacing={6} align="start">
//                                   {/* Product Image */}
//                                   <Image
//                                     src={item.product?.images?.[0] || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"}
//                                     alt={item.product?.title || "Product"}
//                                     boxSize="80px"
//                                     objectFit="cover"
//                                     borderRadius="md"
//                                     fallbackSrc="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
//                                   />
                                  
//                                   {/* Product Details */}
//                                   <VStack align="start" spacing={1} flex={1}>
//                                     <Text fontWeight="semibold" color="black" fontSize="sm">
//                                       Shyneen Glow
//                                     </Text>
//                                     <Text fontSize="sm" color="gray.600" lineHeight="1.4">
//                                       {item.product?.title || item.product?.name || "Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap"}
//                                     </Text>
//                                     <Text fontSize="xs" color="gray.400" letterSpacing="wide">
//                                       ITEM {item.product?.slug || "2678394"}
//                                     </Text>
//                                     <Text fontSize="xs" color="gray.600">
//                                       Size: {item.product?.size || "1 oz/30 mL"}
//                                     </Text>
//                                   </VStack>

//                                   {/* Price and Order Details */}
//                                   <VStack align="end" spacing={2} minW="200px">
//                                     <Text fontWeight="bold" fontSize="lg" color="black">
//                                       ${item.product?.price || order.totalAmount}
//                                     </Text>
                                    
//                                     {/* Order Details Grid */}
//                                     <VStack align="end" spacing={1} fontSize="xs">
//                                       <HStack justify="space-between" w="150px">
//                                         <Text color="gray.500">Order Number</Text>
//                                         <Text color="black" fontWeight="semibold">
//                                           #{order.shortId || order._id?.slice(-8) || "244376900967"}
//                                         </Text>
//                                       </HStack>
                                      
//                                       <HStack justify="space-between" w="150px">
//                                         <Text color="gray.500">Order Date</Text>
//                                         <Text color="black" fontWeight="semibold">
//                                           {formatDate(order.createdAt)}
//                                         </Text>
//                                       </HStack>
                                      
//                                       <HStack justify="space-between" w="150px">
//                                         <Text color="gray.500">Delivery Date</Text>
//                                         <Text color="black" fontWeight="semibold">
//                                           {order.deliveryDate ? formatDate(order.deliveryDate) : "Jan 28, 2025"}
//                                         </Text>
//                                       </HStack>
                                      
//                                       <HStack justify="space-between" w="150px">
//                                         <Text color="gray.500">Ship to</Text>
//                                         <Text color="black" fontWeight="semibold">
//                                           {order.userDetails?.address || "Chicago, USA"}
//                                         </Text>
//                                       </HStack>
                                      
//                                       <HStack justify="space-between" w="150px">
//                                         <Text color="gray.500">Payment Method</Text>
//                                         <Text color="black" fontWeight="semibold">
//                                           {order.paymentIntent || "COD"}
//                                         </Text>
//                                       </HStack>
                                      
//                                       <HStack justify="space-between" w="150px" mt={2}>
//                                         <Text color="gray.500"></Text>
//                                         <Badge 
//                                           colorScheme={getStatusColor(order.orderStatus)} 
//                                           size="sm"
//                                           textTransform="capitalize"
//                                         >
//                                           {order.orderStatus || "Delivered"}
//                                         </Badge>
//                                       </HStack>
//                                     </VStack>
//                                   </VStack>
//                                 </HStack>
                                
//                                 {/* Order Total */}
//                                 {index === order.products.length - 1 && (
//                                   <Box mt={4} pt={4}>
//                                     <HStack justify="end">
//                                       <Text fontSize="sm" color="gray.500" mr={8}>
//                                         Total Amount: 
//                                       </Text>
//                                       <Text fontWeight="bold" fontSize="lg" color="black">
//                                         ${order.totalAmount}
//                                       </Text>
//                                     </HStack>
//                                   </Box>
//                                 )}
                                
//                                 {index < order.products.length - 1 && <Divider my={4} />}
//                               </Box>
//                             ))}
//                           </VStack>
//                         </CardBody>
//                       </Card>
//                     ))}
//                 </VStack>
//               )}
//             </VStack>
//           </GridItem>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }








// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrders } from "./ordersSlice";
// import { logout } from "../auth/authSlice";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Container,
//   VStack,
//   HStack,
//   Text,
//   Image,
//   Button,
//   Spinner,
//   Alert,
//   AlertIcon,
//   Flex,
//   Spacer,
//   Divider,
//   Badge,
//   Card,
//   CardBody,
//   useColorModeValue,
//   Input,
//   Select,
//   Grid,
//   GridItem,
//   Icon,
//   SimpleGrid
// } from "@chakra-ui/react";
// import { FiPackage, FiCreditCard, FiRefreshCw, FiLogOut, FiSearch, FiFilter } from "react-icons/fi";

// export default function Orders() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const user = useSelector((state) => state.auth.user);
//   const userId = user?._id;
//   const { orders, status, error } = useSelector((state) => state.orders);

//   const [activeTab, setActiveTab] = useState('orderHistory');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');

//   const bgColor = useColorModeValue("gray.50", "gray.900");
//   const cardBg = useColorModeValue("white", "gray.800");

//   useEffect(() => {
//     console.log("useEffect triggered:", { isLoggedIn, userId });
    
//     if (isLoggedIn && userId) {
//       console.log("Dispatching fetchOrders with userId:", userId);
//       dispatch(fetchOrders({ userId, timestamp: Date.now() }));
//     } else {
//       console.log("Not fetching orders - missing requirements:", { isLoggedIn, userId });
//     }
//   }, [dispatch, isLoggedIn, userId]);

//   const handleRefresh = () => {
//     if (userId) {
//       console.log("Refreshing orders for userId:", userId);
//       dispatch(fetchOrders({ userId, timestamp: Date.now() }));
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'delivered':
//         return 'green';
//       case 'processing':
//       case 'dispatched':
//         return 'blue';
//       case 'pending':
//         return 'orange';
//       case 'cancelled':
//         return 'red';
//       default:
//         return 'gray';
//     }
//   };

//   // Filter orders based on search and status
//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = searchTerm === '' || 
//       order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.products?.some(item => 
//         item.product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.product?.brand?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
    
//     const matchesStatus = statusFilter === 'all' || 
//       order.orderStatus?.toLowerCase() === statusFilter.toLowerCase();
    
//     return matchesSearch && matchesStatus;
//   });

//   // Get recent orders (last 30 days)
//   const recentOrders = orders.filter(order => {
//     const orderDate = new Date(order.createdAt);
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//     return orderDate >= thirtyDaysAgo;
//   });

//   // Mock returns data
//   const returns = [
//     {
//       id: 'RET-001',
//       orderId: 'ORD-12345',
//       productName: 'Celestial Nightly Skin Repair Oil Serum',
//       returnDate: '2024-12-15',
//       status: 'Processing',
//       refundAmount: 45.99,
//       reason: 'Product not as described'
//     },
//     {
//       id: 'RET-002', 
//       orderId: 'ORD-12340',
//       productName: 'Hydrating Face Cleanser',
//       returnDate: '2024-12-10',
//       status: 'Approved',
//       refundAmount: 25.99,
//       reason: 'Damaged during shipping'
//     }
//   ];

//   // Mock payment data
//   const paymentMethods = [
//     {
//       id: 'card-001',
//       type: 'Credit Card',
//       last4: '4532',
//       brand: 'Visa',
//       expiry: '12/26',
//       isDefault: true
//     },
//     {
//       id: 'card-002',
//       type: 'Credit Card', 
//       last4: '8901',
//       brand: 'Mastercard',
//       expiry: '08/27',
//       isDefault: false
//     }
//   ];

//   const credits = [
//     {
//       id: 'credit-001',
//       amount: 15.50,
//       description: 'Refund for Order #ORD-12340',
//       date: '2024-12-10',
//       status: 'Available'
//     },
//     {
//       id: 'credit-002',
//       amount: 5.00,
//       description: 'Welcome bonus credit',
//       date: '2024-11-15',
//       status: 'Used'
//     }
//   ];

//   const tabs = [
//     {
//       id: 'orderHistory',
//       name: 'Order History',
//       icon: FiPackage,
//       count: orders.length
//     },
//     {
//       id: 'returns',
//       name: 'Returns',
//       icon: FiRefreshCw,
//       count: returns.length
//     },
//     {
//       id: 'recentOrders',
//       name: 'Recent Orders',
//       icon: FiPackage,
//       count: recentOrders.length
//     },
//     {
//       id: 'paymentCredits',
//       name: 'Payment & Credits',
//       icon: FiCreditCard,
//       count: paymentMethods.length + credits.length
//     }
//   ];

//   // Loading state
//   if (status === 'loading') {
//     return (
//       <Container maxW="6xl" py={8} bg={bgColor} minH="100vh">
//         <Flex justify="center" align="center" h="50vh">
//           <VStack spacing={4}>
//             <Spinner size="xl" color="pink.500" />
//             <Text color="gray.600">Loading your orders...</Text>
//           </VStack>
//         </Flex>
//       </Container>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <Container maxW="6xl" py={8} bg={bgColor} minH="100vh">
//         <Alert status="error" borderRadius="md">
//           <AlertIcon />
//           <Box>
//             <Text fontWeight="bold">Error Loading Orders</Text>
//             <Text>{error}</Text>
//           </Box>
//         </Alert>
//         <Button 
//           mt={4} 
//           colorScheme="pink" 
//           onClick={handleRefresh} 
//           disabled={!userId}
//         >
//           Try Again
//         </Button>
//       </Container>
//     );
//   }

//   // Not logged in state
//   if (!isLoggedIn || !userId) {
//     return (
//       <Container maxW="6xl" py={8} bg={bgColor} minH="100vh">
//         <Flex justify="center" align="center" h="50vh">
//           <VStack spacing={4}>
//             <Text fontSize="xl" color="gray.600">
//               Please log in to view your orders
//             </Text>
//             <Button as={Link} to="/login" colorScheme="pink">
//               Login
//             </Button>
//           </VStack>
//         </Flex>
//       </Container>
//     );
//   }

//   const renderOrderHistory = () => (
//     <VStack spacing={6} align="stretch">
//       {/* Search and Filter */}
//       <HStack spacing={4}>
//         <Box position="relative" flex={1}>
//           <Icon as={FiSearch} position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400" />
//           <Input
//             pl={10}
//             placeholder="Search orders by ID or product name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             bg="white"
//             borderColor="gray.200"
//           />
//         </Box>
//         <Select
//           w="200px"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           bg="white"
//           borderColor="gray.200"
//         >
//           <option value="all">All Orders</option>
//           <option value="delivered">Delivered</option>
//           <option value="processing">Processing</option>
//           <option value="pending">Pending</option>
//           <option value="cancelled">Cancelled</option>
//         </Select>
//       </HStack>

//       {filteredOrders.length === 0 ? (
//         <Card bg="white" border="1px" borderColor="gray.200">
//           <CardBody>
//             <VStack spacing={4} py={8}>
//               <Icon as={FiPackage} size="48px" color="gray.400" />
//               <Text fontSize="lg" color="gray.600">
//                 {searchTerm || statusFilter !== 'all' ? 'No orders match your search criteria' : 'You haven\'t placed any orders yet'}
//               </Text>
//               <Button as={Link} to="/shops" colorScheme="pink">
//                 Browse Products
//               </Button>
//             </VStack>
//           </CardBody>
//         </Card>
//       ) : (
//         <VStack spacing={4} align="stretch">
//           {filteredOrders
//             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//             .map((order) => (
//               <Card 
//                 key={order._id} 
//                 bg="white" 
//                 border="1px" 
//                 borderColor="gray.200" 
//                 borderRadius="0"
//                 shadow="none"
//               >
//                 <CardBody p={6}>
//                   <VStack spacing={4} align="stretch">
//                     {order.products?.map((item, index) => (
//                       <Box key={index}>
//                         <HStack spacing={6} align="start">
//                           <Image
//                             src={item.product?.images?.[0] || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"}
//                             alt={item.product?.title || "Product"}
//                             boxSize="120px"
//                             objectFit="cover"
//                             borderRadius="0"
//                           />
                          
//                           <VStack align="start" spacing={2} flex={1}>
//                             <Text fontWeight="bold" color="black" fontSize="md">
//                               {item.product?.brand || "Shyneen Glow"}
//                             </Text>
//                             <Text fontSize="sm" color="gray.700" lineHeight="1.4">
//                               {item.product?.title || item.product?.name || "Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap"}
//                             </Text>
//                             <Text fontSize="sm" color="gray.500" letterSpacing="wide">
//                               ITEM {item.product?.slug || "2678394"}
//                             </Text>
//                             <Text fontSize="sm" color="black">
//                               Size: {item.product?.size || "1 oz/30 mL"}
//                             </Text>
//                           </VStack>

//                           <VStack align="end" spacing={4} minW="300px">
//                             <Box>
//                               <HStack spacing={8} mb={3}>
//                                 <VStack align="center" spacing={1}>
//                                   <Text fontSize="sm" color="gray.600">Order Number</Text>
//                                   <Text fontSize="sm" color="black" fontWeight="semibold">
//                                     #{order.shortId || order._id?.slice(-8) || "234576890987"}
//                                   </Text>
//                                 </VStack>
//                                 <VStack align="center" spacing={1}>
//                                   <Badge colorScheme={getStatusColor(order.orderStatus)} variant="subtle">
//                                     {order.orderStatus || "Delivered"}
//                                   </Badge>
//                                 </VStack>
//                               </HStack>
                              
//                               <HStack spacing={8} mb={3}>
//                                 <VStack align="center" spacing={1}>
//                                   <Text fontSize="sm" color="gray.600">Order Date</Text>
//                                   <Text fontSize="sm" color="black" fontWeight="semibold">
//                                     {formatDate(order.createdAt)}
//                                   </Text>
//                                 </VStack>
//                                 <VStack align="center" spacing={1}>
//                                   <Text fontSize="sm" color="gray.600">Delivery Date</Text>
//                                   <Text fontSize="sm" color="black" fontWeight="semibold">
//                                     {order.deliveryDate ? formatDate(order.deliveryDate) : "Jan 25, 2025"}
//                                   </Text>
//                                 </VStack>
//                               </HStack>
                              
//                               <HStack spacing={8}>
//                                 <VStack align="center" spacing={1}>
//                                   <Text fontSize="sm" color="gray.600">Ship to</Text>
//                                   <Text fontSize="sm" color="black" fontWeight="semibold">
//                                     {order.userDetails?.address || "Chicago USA"}
//                                   </Text>
//                                 </VStack>
//                                 <VStack align="center" spacing={1}>
//                                   <Text fontSize="sm" color="gray.600">Payment Method</Text>
//                                   <Text fontSize="sm" color="black" fontWeight="semibold">
//                                     {order.paymentIntent || "CCD"}
//                                   </Text>
//                                 </VStack>
//                               </HStack>
//                             </Box>
                            
//                             <Box borderTop="1px" borderColor="gray.200" pt={3} w="full">
//                               <HStack justify="space-between">
//                                 <Text fontSize="sm" color="gray.500">Total Amount:</Text>
//                                 <Text fontSize="sm" color="black" fontWeight="bold">
//                                   ${order.totalAmount}
//                                 </Text>
//                               </HStack>
//                             </Box>
//                           </VStack>
//                         </HStack>
                        
//                         {index < order.products.length - 1 && (
//                           <Divider my={6} borderColor="gray.200" />
//                         )}
//                       </Box>
//                     ))}
//                   </VStack>
//                 </CardBody>
//               </Card>
//             ))}
//         </VStack>
//       )}
//     </VStack>
//   );

//   const renderReturns = () => (
//     <VStack spacing={6} align="stretch">
//       <Text fontSize="2xl" fontWeight="bold" color="black">
//         Returns & Refunds
//       </Text>
      
//       {returns.length === 0 ? (
//         <Card bg="white" border="1px" borderColor="gray.200">
//           <CardBody>
//             <VStack spacing={4} py={8}>
//               <Icon as={FiRefreshCw} size="48px" color="gray.400" />
//               <Text fontSize="lg" color="gray.600">
//                 No returns found
//               </Text>
//               <Text fontSize="sm" color="gray.500" textAlign="center">
//                 If you need to return an item, contact our customer service team
//               </Text>
//               <Button as={Link} to="/contact" colorScheme="pink">
//                 Contact Support
//               </Button>
//             </VStack>
//           </CardBody>
//         </Card>
//       ) : (
//         <VStack spacing={4} align="stretch">
//           {returns.map((returnItem) => (
//             <Card key={returnItem.id} bg="white" border="1px" borderColor="gray.200">
//               <CardBody p={6}>
//                 <Grid templateColumns="repeat(4, 1fr)" gap={6} alignItems="center">
//                   <GridItem>
//                     <VStack align="start" spacing={1}>
//                       <Text fontSize="sm" color="gray.600">Return ID</Text>
//                       <Text fontWeight="semibold" color="black">{returnItem.id}</Text>
//                     </VStack>
//                   </GridItem>
                  
//                   <GridItem>
//                     <VStack align="start" spacing={1}>
//                       <Text fontSize="sm" color="gray.600">Product</Text>
//                       <Text fontWeight="semibold" color="black" fontSize="sm">{returnItem.productName}</Text>
//                       <Text fontSize="xs" color="gray.500">Order: {returnItem.orderId}</Text>
//                     </VStack>
//                   </GridItem>
                  
//                   <GridItem>
//                     <VStack align="start" spacing={1}>
//                       <Text fontSize="sm" color="gray.600">Status</Text>
//                       <Badge colorScheme={returnItem.status === 'Approved' ? 'green' : 'orange'}>
//                         {returnItem.status}
//                       </Badge>
//                       <Text fontSize="xs" color="gray.500">{formatDate(returnItem.returnDate)}</Text>
//                     </VStack>
//                   </GridItem>
                  
//                   <GridItem>
//                     <VStack align="end" spacing={1}>
//                       <Text fontSize="sm" color="gray.600">Refund Amount</Text>
//                       <Text fontWeight="bold" color="black" fontSize="lg">${returnItem.refundAmount}</Text>
//                       <Text fontSize="xs" color="gray.500">{returnItem.reason}</Text>
//                     </VStack>
//                   </GridItem>
//                 </Grid>
//               </CardBody>
//             </Card>
//           ))}
//         </VStack>
//       )}
//     </VStack>
//   );

//   const renderRecentOrders = () => (
//     <VStack spacing={6} align="stretch">
//       <Text fontSize="2xl" fontWeight="bold" color="black">
//         Recent Orders (Last 30 Days)
//       </Text>
      
//       {recentOrders.length === 0 ? (
//         <Card bg="white" border="1px" borderColor="gray.200">
//           <CardBody>
//             <VStack spacing={4} py={8}>
//               <Icon as={FiPackage} size="48px" color="gray.400" />
//               <Text fontSize="lg" color="gray.600">
//                 No recent orders
//               </Text>
//               <Text fontSize="sm" color="gray.500">
//                 Orders from the last 30 days will appear here
//               </Text>
//             </VStack>
//           </CardBody>
//         </Card>
//       ) : (
//         <SimpleGrid columns={{base: 1, md: 2}} spacing={4}>
//           {recentOrders.map((order) => (
//             <Card key={order._id} bg="white" border="1px" borderColor="gray.200">
//               <CardBody p={4}>
//                 <VStack spacing={3} align="stretch">
//                   <HStack justify="space-between">
//                     <Text fontWeight="bold" fontSize="sm">
//                       #{order.shortId || order._id?.slice(-8)}
//                     </Text>
//                     <Badge colorScheme={getStatusColor(order.orderStatus)} size="sm">
//                       {order.orderStatus || "Delivered"}
//                     </Badge>
//                   </HStack>
                  
//                   <Text fontSize="sm" color="gray.600">
//                     {formatDate(order.createdAt)}
//                   </Text>
                  
//                   <HStack justify="space-between">
//                     <Text fontSize="sm" color="gray.500">
//                       {order.products?.length || 1} item(s)
//                     </Text>
//                     <Text fontWeight="bold" color="black">
//                       ${order.totalAmount}
//                     </Text>
//                   </HStack>
                  
//                   <Button size="sm" variant="outline" colorScheme="pink">
//                     View Details
//                   </Button>
//                 </VStack>
//               </CardBody>
//             </Card>
//           ))}
//         </SimpleGrid>
//       )}
//     </VStack>
//   );

//   const renderPaymentCredits = () => (
//     <VStack spacing={8} align="stretch">
//       <Text fontSize="2xl" fontWeight="bold" color="black">
//         Payment Methods & Credits
//       </Text>
      
//       {/* Payment Methods */}
//       <Box>
//         <Text fontSize="lg" fontWeight="semibold" color="black" mb={4}>
//           Payment Methods
//         </Text>
//         <VStack spacing={3} align="stretch">
//           {paymentMethods.map((method) => (
//             <Card key={method.id} bg="white" border="1px" borderColor="gray.200">
//               <CardBody p={4}>
//                 <HStack justify="space-between" align="center">
//                   <HStack spacing={4}>
//                     <Icon as={FiCreditCard} size="24px" color="gray.600" />
//                     <VStack align="start" spacing={0}>
//                       <HStack>
//                         <Text fontWeight="semibold" color="black">
//                           {method.brand} •••• {method.last4}
//                         </Text>
//                         {method.isDefault && (
//                           <Badge colorScheme="green" size="sm">Default</Badge>
//                         )}
//                       </HStack>
//                       <Text fontSize="sm" color="gray.500">
//                         Expires {method.expiry}
//                       </Text>
//                     </VStack>
//                   </HStack>
                  
//                   <HStack spacing={2}>
//                     <Button size="sm" variant="outline">Edit</Button>
//                     {!method.isDefault && (
//                       <Button size="sm" variant="ghost" colorScheme="red">Remove</Button>
//                     )}
//                   </HStack>
//                 </HStack>
//               </CardBody>
//             </Card>
//           ))}
//           <Button variant="outline" colorScheme="pink" alignSelf="start">
//             Add New Payment Method
//           </Button>
//         </VStack>
//       </Box>
      
//       {/* Credits */}
//       <Box>
//         <Text fontSize="lg" fontWeight="semibold" color="black" mb={4}>
//           Store Credits
//         </Text>
//         <VStack spacing={3} align="stretch">
//           {credits.map((credit) => (
//             <Card key={credit.id} bg="white" border="1px" borderColor="gray.200">
//               <CardBody p={4}>
//                 <HStack justify="space-between" align="center">
//                   <VStack align="start" spacing={1}>
//                     <Text fontWeight="semibold" color="black">
//                       {credit.description}
//                     </Text>
//                     <Text fontSize="sm" color="gray.500">
//                       {formatDate(credit.date)}
//                     </Text>
//                   </VStack>
                  
//                   <HStack spacing={4}>
//                     <Badge 
//                       colorScheme={credit.status === 'Available' ? 'green' : 'gray'}
//                       variant="subtle"
//                     >
//                       {credit.status}
//                     </Badge>
//                     <Text fontWeight="bold" color="black" fontSize="lg">
//                       ${credit.amount}
//                     </Text>
//                   </HStack>
//                 </HStack>
//               </CardBody>
//             </Card>
//           ))}
//         </VStack>
//       </Box>
//     </VStack>
//   );

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'orderHistory':
//         return renderOrderHistory();
//       case 'returns':
//         return renderReturns();
//       case 'recentOrders':
//         return renderRecentOrders();
//       case 'paymentCredits':
//         return renderPaymentCredits();
//       default:
//         return renderOrderHistory();
//     }
//   };

//   return (
//     <Container maxW="6xl" py={8} bg="white" minH="100vh">
//       <Flex gap={8}>
//         {/* Sidebar */}
//         <Box w="250px" flexShrink={0}>
//           <VStack align="stretch" spacing={6}>
//             <Text fontSize="xl" fontWeight="bold" color="black">
//               My Account
//             </Text>
            
//             <Box>
//               <Text fontSize="sm" color="gray.500" mb={3}>
//                 Account Information
//               </Text>
//               <VStack align="stretch" spacing={1}>
//                 {tabs.map((tab) => (
//                   <Button
//                     key={tab.id}
//                     variant="ghost"
//                     justifyContent="flex-start"
//                     fontWeight="normal"
//                     color={activeTab === tab.id ? "pink.500" : "black"}
//                     bg={activeTab === tab.id ? "pink.50" : "transparent"}
//                     _hover={{ bg: activeTab === tab.id ? "pink.50" : "gray.50" }}
//                     px={3}
//                     h="auto"
//                     py={3}
//                     onClick={() => setActiveTab(tab.id)}
//                     leftIcon={<Icon as={tab.icon} />}
//                   >
//                     <HStack justify="space-between" w="full">
//                       <Text>{tab.name}</Text>
//                       {tab.count > 0 && (
//                         <Badge
//                           colorScheme={activeTab === tab.id ? "pink" : "gray"}
//                           variant="subtle"
//                           fontSize="xs"
//                         >
//                           {tab.count}
//                         </Badge>
//                       )}
//                     </HStack>
//                   </Button>
//                 ))}
                
//                 <Divider my={2} />
                
//                 <Button
//                   variant="ghost"
//                   justifyContent="flex-start"
//                   fontWeight="normal"
//                   color="red.500"
//                   bg="transparent"
//                   _hover={{ bg: "red.50" }}
//                   px={3}
//                   h="auto"
//                   py={3}
//                   onClick={handleLogout}
//                   leftIcon={<Icon as={FiLogOut} />}
//                 >
//                   Log out
//                 </Button>
//               </VStack>
//             </Box>
//           </VStack>
//         </Box>

//         {/* Main Content */}
//         <Box flex={1}>
//           {renderTabContent()}
          
//           {/* Refresh Button for Order History */}
//           {activeTab === 'orderHistory' && (
//             <Flex justify="center" mt={6}>
//               <Button
//                 variant="outline"
//                 color="#F7A9C7"
//                 onClick={handleRefresh}
//                 disabled={!userId}
//                 leftIcon={<Icon as={FiRefreshCw} />}
//               >
//                 Refresh Orders
//               </Button>
//             </Flex>
//           )}
//         </Box>
//       </Flex>
//     </Container>
//   );
// }









import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./ordersSlice";
import { logout } from "../auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
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
  FormLabel
} from "@chakra-ui/react";
import { FiPackage, FiCreditCard, FiRefreshCw, FiLogOut, FiSearch, FiFilter } from "react-icons/fi";

export default function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const { orders, status, error } = useSelector((state) => state.orders);

  const [activeTab, setActiveTab] = useState('orderHistory');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const bgColorr = useColorModeValue("gray.50", "gray.900");
  const bgColor = useColorModeValue("white", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    console.log("useEffect triggered:", { isLoggedIn, userId });
    
    if (isLoggedIn && userId) {
      console.log("Dispatching fetchOrders with userId:", userId);
      dispatch(fetchOrders({ userId, timestamp: Date.now() }));
    } else {
      console.log("Not fetching orders - missing requirements:", { isLoggedIn, userId });
    }
  }, [dispatch, isLoggedIn, userId]);

  const handleRefresh = () => {
    if (userId) {
      console.log("Refreshing orders for userId:", userId);
      dispatch(fetchOrders({ userId, timestamp: Date.now() }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
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

  // Filter orders based on search and status
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

  // Get recent orders (last 30 days)
  const recentOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return orderDate >= thirtyDaysAgo;
  });

  // Mock returns data
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
      // icon: FiPackage,
      count: orders.length
    },
    {
      id: 'returns',
      name: 'Returns',
      // icon: FiRefreshCw,
      count: returns.length
    },
    {
      id: 'recentOrders',
      name: 'Recent Orders',
      // icon: FiPackage,
      count: recentOrders.length
    },
    {
      id: 'paymentCredits',
      name: 'Payment & Credits',
      // icon: FiCreditCard,
      count: 0
    },
    {
      id: 'profilewel',
      name: 'Profile',
      // icon: FiCreditCard,
      count: 0
    }
  ];

  // Loading state
  if (status === 'loading') {
    return (
      <Container maxW="6xl" py={8} bg={bgColor} minH="100vh">
        <Flex justify="center" align="center" h="50vh">
          <VStack spacing={4}>
            <Spinner size="xl" color="pink.500" />
            <Text color="gray.600">Loading your orders...</Text>
          </VStack>
        </Flex>
      </Container>
    );
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

  const renderOrderHistory = () => (
    <VStack spacing={6} align="stretch">
      {/* Search and Filter */}
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
                          <Image
                            src={item.product?.images?.[0] || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"}
                            alt={item.product?.title || "Product"}
                            boxSize="120px"
                            objectFit="cover"
                            borderRadius="0"
                          />
                          
                          <VStack align="start" spacing={2} flex={1}>
                            <Text fontWeight="bold" color="black" fontSize="md">
                              {item.product?.brand || "Shyneen Glow"}
                            </Text>
                            <Text fontSize="sm" color="gray.700" lineHeight="1.4">
                              {item.product?.title || item.product?.name || "Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap"}
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

  const renderAccountInfo = () => (
    <VStack spacing={8} align="stretch">
      <Text fontSize="2xl" fontWeight="bold" color="black">
        Welcome Ebot Nicole
      </Text>
      
      <VStack spacing={6} align="stretch">
        {/* Name Section */}
        <HStack spacing={6} align="start">
          <VStack align="start" spacing={2} flex={1}>
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              First Name
            </Text>
            <Input
              value="Ebot"
              bg="white"
              border="1px"
              borderColor="gray.300"
              borderRadius="md"
              h="40px"
              fontSize="sm"
              readOnly
            />
          </VStack>
          
          <VStack align="start" spacing={2} flex={1}>
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              Last Name
            </Text>
            <Input
              value="Nicole"
              bg="white"
              border="1px"
              borderColor="gray.300"
              borderRadius="md"
              h="40px"
              fontSize="sm"
              readOnly
            />
          </VStack>
          
          <VStack spacing={2}>
            <Button
              variant="outline"
              size="sm"
              borderColor="gray.300"
              color="gray.600"
              bg="white"
              _hover={{ bg: "gray.50" }}
              px={4}
            >
              Cancel
            </Button>
            <Button
              bg="black"
              color="white"
              size="sm"
              _hover={{ bg: "gray.800" }}
              px={6}
            >
              Update
            </Button>
          </VStack>
        </HStack>

        {/* Account Information Fields */}
        <VStack spacing={4} align="stretch">
          {/* Email */}
          <HStack justify="space-between" align="center" py={3}>
            <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
              Email
            </Text>
            <Text fontSize="sm" color="gray.500" flex={1}>
              ebotnicole20@gmail.com
            </Text>
            <Button
              variant="link"
              color="blue.500"
              fontSize="sm"
              fontWeight="normal"
            >
              Edit
            </Button>
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
            >
              Edit
            </Button>
          </HStack>

          {/* Passkey */}
          <HStack justify="space-between" align="center" py={3}>
            <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
              Passkey
            </Text>
            <Text fontSize="sm" color="gray.500" flex={1}>
              ebotnicole20@gmail.com
            </Text>
            <Box w="40px" />
          </HStack>

          {/* Birthday */}
          <HStack justify="space-between" align="center" py={3}>
            <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
              Birthday
            </Text>
            <Text fontSize="sm" color="gray.500" flex={1}>
              September 24, 19xx
            </Text>
            <Box w="40px" />
          </HStack>

          {/* Ownership */}
          <HStack justify="space-between" align="center" py={3}>
            <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
              Ownership
            </Text>
            <Text fontSize="sm" color="gray.500" flex={1}>
              Your Account is currently open
            </Text>
            <Button
              variant="link"
              color="blue.500"
              fontSize="sm"
              fontWeight="normal"
            >
              Close Account
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );

  // const renderReturns = () => (
  //   <VStack spacing={8} align="stretch">
  //     <Text fontSize="2xl" fontWeight="bold" color="black">
  //       Welcome Ebot Nicole
  //     </Text>
      
  //     <VStack spacing={6} align="stretch">
  //       {/* Name Section */}
  //       <HStack spacing={6} align="start">
  //         <VStack align="start" spacing={2} flex={1}>
  //           <Text fontSize="sm" color="gray.600" fontWeight="medium">
  //             Name
  //           </Text>
  //           <Input
  //             value="Ebot Nicole"
  //             bg="white"
  //             border="1px"
  //             borderColor="gray.300"
  //             borderRadius="md"
  //             h="40px"
  //             fontSize="sm"
  //             readOnly
  //           />
  //         </VStack>
          
  //         <VStack align="end" spacing={2} mt={6}>
  //           <Button
  //             variant="link"
  //             color="blue.500"
  //             fontSize="sm"
  //             fontWeight="normal"
  //           >
  //             Edit
  //           </Button>
  //         </VStack>
  //       </HStack>

  //       {/* Account Information Fields */}
  //       <VStack spacing={4} align="stretch">
  //         {/* Email */}
  //         <HStack justify="space-between" align="center" py={3}>
  //           <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
  //             Email
  //           </Text>
  //           <Text fontSize="sm" color="gray.500" flex={1}>
  //             ebotnicole20@gmail.com
  //           </Text>
  //           <Button
  //             variant="link"
  //             color="blue.500"
  //             fontSize="sm"
  //             fontWeight="normal"
  //           >
  //             Edit
  //           </Button>
  //         </HStack>

  //         {/* Password */}
  //         <HStack justify="space-between" align="center" py={3}>
  //           <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
  //             Password
  //           </Text>
  //           <Text fontSize="sm" color="gray.500" flex={1}>
  //             ••••••••••••••••••••
  //           </Text>
  //           <Button
  //             variant="link"
  //             color="blue.500"
  //             fontSize="sm"
  //             fontWeight="normal"
  //           >
  //             Edit
  //           </Button>
  //         </HStack>

  //         {/* Passkey */}
  //         <HStack justify="space-between" align="center" py={3}>
  //           <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
  //             Passkey
  //           </Text>
  //           <Text fontSize="sm" color="gray.500" flex={1}>
  //             ebotnicole20@gmail.com
  //           </Text>
  //           <Box w="40px" />
  //         </HStack>

  //         {/* Birthday */}
  //         <HStack justify="space-between" align="center" py={3}>
  //           <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
  //             Birthday
  //           </Text>
  //           <Text fontSize="sm" color="gray.500" flex={1}>
  //             September 24, 19xx
  //           </Text>
  //           <Box w="40px" />
  //         </HStack>

  //         {/* Ownership */}
  //         <HStack justify="space-between" align="center" py={3}>
  //           <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
  //             Ownership
  //           </Text>
  //           <Text fontSize="sm" color="gray.500" flex={1}>
  //             Your Account is currently open
  //           </Text>
  //           <Button
  //             variant="link"
  //             color="blue.500"
  //             fontSize="sm"
  //             fontWeight="normal"
  //           >
  //             Close Account
  //           </Button>
  //         </HStack>
  //       </VStack>
  //     </VStack>
  //   </VStack>
  // );

  // const renderRecentOrders = () => (
  //   <VStack spacing={8} align="stretch">
  //     <Text fontSize="2xl" fontWeight="bold" color="black">
  //       Welcome Ebot Nicole
  //     </Text>
      
  //     <VStack spacing={6} align="stretch">
  //       {/* Name Section */}
  //       <HStack spacing={6} align="start">
  //         <VStack align="start" spacing={2} flex={1}>
  //           <Text fontSize="sm" color="gray.600" fontWeight="medium">
  //             Name
  //           </Text>
  //           <Input
  //             value="Ebot Nicole"
  //             bg="white"
  //             border="1px"
  //             borderColor="gray.300"
  //             borderRadius="md"
  //             h="40px"
  //             fontSize="sm"
  //             readOnly
  //           />
  //         </VStack>
          
  //         <VStack align="end" spacing={2} mt={6}>
  //           <Button
  //             variant="link"
  //             color="blue.500"
  //             fontSize="sm"
  //             fontWeight="normal"
  //           >
  //             Edit
  //           </Button>
  //         </VStack>
  //       </HStack>

  //       {/* Account Information Fields */}
  //       <VStack spacing={4} align="stretch">
  //         {/* Email */}
  //         <HStack justify="space-between" align="center" py={3}>
  //           <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
  //             Email
  //           </Text>
  //           <Text fontSize="sm" color="gray.500" flex={1}>
  //             ebotnicole20@gmail.com
  //           </Text>
  //           <Button
  //             variant="link"
  //             color="blue.500"
  //             fontSize="sm"
  //             fontWeight="normal"
  //           >
  //             Edit
  //           </Button>
  //         </HStack>

  //         {/* Password */}
  //         <HStack justify="space-between" align="center" py={3}>
  //           <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
  //             Password
  //           </Text>
  //           <Text fontSize="sm" color="gray.500" flex={1}>
  //             ••••••••••••••••••••
  //           </Text>
  //           <Button
  //             variant="link"
  //             color="blue.500"
  //             fontSize="sm"
  //             fontWeight="normal"
  //           >
  //             Edit
  //           </Button>
  //         </HStack>

  //         {/* Passkey */}
  //         <HStack justify="space-between" align="center" py={3}>
  //           <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
  //             Passkey
  //           </Text>
  //           <Text fontSize="sm" color="gray.500" flex={1}>
  //             ebotnicole20@gmail.com
  //           </Text>
  //           <Box w="40px" />
  //         </HStack>

  //         {/* Birthday */}
  //         <HStack justify="space-between" align="center" py={3}>
  //           <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
  //             Birthday
  //           </Text>
  //           <Text fontSize="sm" color="gray.500" flex={1}>
  //             September 24, 19xx
  //           </Text>
  //           <Box w="40px" />
  //         </HStack>

  //         {/* Ownership */}
  //         <HStack justify="space-between" align="center" py={3}>
  //           <Text fontSize="sm" color="black" fontWeight="medium" w="100px">
  //             Ownership
  //           </Text>
  //           <Text fontSize="sm" color="gray.500" flex={1}>
  //             Your Account is currently open
  //           </Text>
  //           <Button
  //             variant="link"
  //             color="blue.500"
  //             fontSize="sm"
  //             fontWeight="normal"
  //           >
  //             Close Account
  //           </Button>
  //         </HStack>
  //       </VStack>
  //     </VStack>
  //   </VStack>
  // );



// Add this after your existing renderPaymentCredits function (complete the form)
const renderPaymentCredits = () => (
  <VStack spacing={8} align="stretch">
    <Text fontSize="2xl" fontWeight="bold" color="black">
      Payments & Credits
    </Text>
    
    <HStack spacing={12} align="start">
      {/* Left Side - Credit/Debit Cards Title */}
      <VStack align="start" spacing={4} w="300px">
        <Text fontSize="lg" fontWeight="semibold" color="black">
          Credit / Debit Cards
        </Text>
      </VStack>

      {/* Right Side - Form */}
      <VStack align="start" spacing={4} flex={1}>
        <Text fontSize="lg" fontWeight="semibold" color="black" mb={4}>
          Credit / Debit Cards
        </Text>
        
        <VStack spacing={4} align="stretch" w="full" maxW="400px">
          {/* Card Type */}
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

          {/* Card Number */}
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

          {/* MM, YY, CVV */}
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

          {/* First Name */}
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

          {/* Last Name */}
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

          {/* Country */}
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

          {/* Phone */}
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

          {/* Street Address */}
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

          {/* ZIP/Postal Code */}
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

          {/* City */}
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

          {/* State/Province */}
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
                        <Image
                          src={item.product?.images?.[0] || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"}
                          alt={item.product?.title || "Product"}
                          boxSize="120px"
                          objectFit="cover"
                          borderRadius="0"
                        />
                        
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

return (
  <>
  <Container maxW="100%" py={12} bg={bgColorr} style={{padding: "4rem 4rem"}}>
    <VStack spacing={8} align="stretch" maxW="12xl">
      {/* Header with Refresh and Logout */}
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
            // colorScheme="#F7A9C7"
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
      {/* Header with Refresh and Logout */}
      {/* <HStack justify="space-between" align="center" bg={bgColorr}>
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
            // colorScheme="#F7A9C7"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </HStack>
      </HStack> */}

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
              // leftIcon={<Icon as={tab.icon} />}
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
          {activeTab === 'profile' && renderAccountInfo()}
          {(activeTab !== 'orderHistory' && activeTab !== 'returns' && activeTab !== 'recentOrders' && activeTab !== 'paymentCredits') && renderAccountInfo()}
        </Box>
      </HStack>
    </VStack>
  </Container>
  </>
)};
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../order/ordersSlice';
import { orderAPI } from '../../../api/api';
import { FiPackage, FiImage } from 'react-icons/fi';
import './OrderHistory.css';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, status } = useSelector((state) => state.orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      console.log('Fetching orders for user:', user._id);
      dispatch(fetchOrders({ userId: user._id, timestamp: Date.now() }));
    }
  }, [dispatch, user?._id]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setLoading(true);
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      // Refresh orders after status update
      if (user?._id) {
        dispatch(fetchOrders({ userId: user._id, timestamp: Date.now() }));
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.products?.some(p => p.product?.title?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.orderStatus?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Debug: Log orders and products
  useEffect(() => {
    if (orders.length > 0) {
      console.log('Orders in component:', orders);
      orders.forEach((order, idx) => {
        console.log(`Order ${idx}:`, {
          id: order._id,
          totalAmount: order.totalAmount,
          productsCount: order.products?.length,
          products: order.products?.map(p => ({
            hasProduct: !!p.product,
            title: p.product?.title,
            price: p.product?.price,
            count: p.count
          }))
        });
      });
    }
  }, [orders]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'processing':
      case 'dispatched':
        return 'status-processing';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const calculateTotal = (order) => {
    // Use totalAmount from order if available
    if (order.totalAmount) {
      return order.totalAmount;
    }
    // Fallback to calculating from products
    return order.products?.reduce((total, item) => {
      return total + ((item.product?.price || 0) * item.count);
    }, 0) || 0;
  };

  if (status === 'loading') {
    return (
      <div className="order-loading">
        <div className="loading-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="order-history">
      <div className="order-header">
        <h2>Order History</h2>
        <p>Track and manage all your orders</p>
      </div>

      {/* Filters */}
      <div className="order-filters">
        <div className="search-group">
          <input
            type="text"
            placeholder="Search orders by ID or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon"><FiPackage size={48} /></div>
            <h3>No orders found</h3>
            <p>
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'You haven\'t placed any orders yet'
              }
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <div className="order-info">
                  <div className="order-number">
                    <span className="label">Order #</span>
                    <span className="value">{order._id?.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="order-date">
                    <span className="label">Order Date</span>
                    <span className="value">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-total">
                    <span className="label">Total</span>
                    <span className="value">${calculateTotal(order).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="order-status">
                  <span className={`status-badge ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus || 'Pending'}
                  </span>
                </div>
              </div>

              <div className="order-products">
                {order.products?.map((item, index) => (
                  <div key={index} className="order-product">
                    <div className="product-image">
                      {item.product?.images?.[0] ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.title}
                          onError={(e) => {
                            e.target.src = '/assets/placeholder-product.png';
                          }}
                        />
                      ) : (
                        <div className="placeholder-image"><FiImage size={24} /></div>
                      )}
                    </div>
                    
                    <div className="product-details">
                      <h4 className="product-title">
                        {item.product?.title || 'Product (Unavailable)'}
                      </h4>
                      <div className="product-meta">
                        <span>Qty: {item.count}</span>
                        {item.product?.price && <span>${item.product.price.toFixed(2)}</span>}
                        {item.color && item.color !== 'default' && <span>Color: {item.color}</span>}
                      </div>
                      {!item.product && (
                        <p className="product-warning">This product is no longer available</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-actions">
                <button className="btn-secondary">
                  View Details
                </button>
                
                {order.orderStatus?.toLowerCase() === 'delivered' && (
                  <button className="btn-primary">
                    Reorder
                  </button>
                )}
                
                {['pending', 'processing'].includes(order.orderStatus?.toLowerCase()) && (
                  <button 
                    className="btn-danger"
                    onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                    disabled={loading}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
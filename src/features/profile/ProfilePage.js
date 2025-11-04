import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth/authSlice';
import AccountInfo from './components/AccountInfo';
import OrderHistory from './components/OrderHistory';
import Returns from './components/Returns';
import PaymentMethods from './components/PaymentMethods';
import { FiUser, FiPackage, FiRotateCcw, FiCreditCard, FiRefreshCw, FiLogOut } from 'react-icons/fi';
import './ProfilePage.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const tabs = [
    {
      id: 'account',
      name: 'Account Information',
      icon: FiUser
    },
    {
      id: 'orders',
      name: 'Order History',
      icon: FiPackage
    },
    {
      id: 'returns',
      name: 'Returns',
      icon: FiRotateCcw
    },
    {
      id: 'payment',
      name: 'Payment & Credits',
      icon: FiCreditCard
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountInfo user={user} />;
      case 'orders':
        return <OrderHistory />;
      case 'returns':
        return <Returns />;
      case 'payment':
        return <PaymentMethods />;
      default:
        return <AccountInfo user={user} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="profile-login-prompt">
        <div className="login-prompt-content">
          <h2>Access Your Account</h2>
          <p>Please log in to view your account information</p>
          <button 
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-header-content">
            <h1 className="profile-title">My Account</h1>
            <div className="profile-actions">
              <button 
                onClick={() => window.location.reload()}
                className="btn-secondary refresh-btn"
              >
                <FiRefreshCw size={16} /> Refresh
              </button>
              <button 
                onClick={handleLogout}
                className="btn-logout"
              >
                <FiLogOut size={16} /> Logout
              </button>
            </div>
          </div>
          <div className="profile-welcome">
            <p>Welcome back, <span className="user-name">{user?.firstname} {user?.lastname}</span></p>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Sidebar Navigation */}
          <div className="profile-sidebar">
            <h3 className="sidebar-title">Account Information</h3>
            <nav className="sidebar-nav">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    <IconComponent className="nav-icon" size={20} />
                    <span className="nav-text">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="profile-content">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
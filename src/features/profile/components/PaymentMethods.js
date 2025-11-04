import React from 'react';
import { FiCreditCard, FiDollarSign, FiStar, FiGift, FiPlus, FiEdit2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import './PaymentMethods.css';

const PaymentMethods = () => {
  const { user } = useSelector((state) => state.auth);

  // Payment methods, credits, and rewards will be implemented when backend endpoints are available
  const paymentMethods = [];
  const credits = {
    storeCredit: 0,
    rewardPoints: 0,
    pointsValue: 0
  };

  const handleAddCard = () => {
    console.log('Adding new card - feature coming soon');
  };

  return (
    <div className="payment-methods">
      <div className="payment-header">
        <h2>Payment & Credits</h2>
        <p>Manage your payment methods and view available credits</p>
      </div>

      {/* Store Credits Section */}
      <div className="credits-section">
        <h3>Available Credits</h3>
        <div className="credits-grid">
          <div className="credit-card">
            <div className="credit-icon"><FiDollarSign size={28} /></div>
            <div className="credit-details">
              <span className="credit-label">Store Credit</span>
              <span className="credit-amount">${credits.storeCredit.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="credit-card">
            <div className="credit-icon"><FiStar size={28} /></div>
            <div className="credit-details">
              <span className="credit-label">Reward Points</span>
              <span className="credit-amount">{credits.rewardPoints.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="credit-card">
            <div className="credit-icon"><FiGift size={28} /></div>
            <div className="credit-details">
              <span className="credit-label">Points Value</span>
              <span className="credit-amount">${credits.pointsValue.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="credits-actions">
          <button className="btn-secondary" disabled title="Coming soon">
            View Rewards Program
          </button>
          <button className="btn-secondary" disabled title="Coming soon">
            Redeem Points
          </button>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="payment-methods-section">
        <div className="section-header1">
          <h3>Saved Payment Methods</h3>
          <button className="btn-primary" onClick={handleAddCard} disabled title="Coming soon">
            <FiPlus size={16} /> Add New Card
          </button>
        </div>

        <div className="empty-payment-methods">
          <div className="empty-icon"><FiCreditCard size={48} /></div>
          <h4>No payment methods saved</h4>
          <p>Payment method management will be available soon. For now, you can add payment details during checkout.</p>
        </div>
      </div>

      {/* Billing Address Section */}
      <div className="billing-section">
        <h3>Billing Address</h3>
        <div className="billing-address">
          <div className="address-details">
            {user?.address ? (
              <>
                <p><strong>{user?.firstname} {user?.lastname}</strong></p>
                <p>{user?.address}</p>
                {user?.mobile && <p>Phone: {user?.mobile}</p>}
                {user?.email && <p>Email: {user?.email}</p>}
              </>
            ) : (
              <p className="no-address">No billing address saved yet. Add your address in the Account Info tab.</p>
            )}
          </div>
          
          {user?.address && (
            <div className="address-actions">
              <button className="btn-secondary" disabled title="Edit in Account Info tab">
                <FiEdit2 size={16} /> Edit Address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
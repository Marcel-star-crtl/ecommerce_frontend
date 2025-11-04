import React from 'react';
import { FiPackage, FiFileText, FiRotateCcw } from 'react-icons/fi';
import './Returns.css';

const Returns = () => {
  // Returns functionality will be implemented when backend endpoints are available
  const returns = [];

  return (
    <div className="returns-section">
      <div className="returns-header">
        <h2>Returns & Refunds</h2>
        <p>Manage your product returns and track refund status</p>
      </div>

      <div className="returns-info">
        <div className="info-card">
          <h3>Return Policy</h3>
          <ul>
            <li>30-day return window from delivery date</li>
            <li>Items must be unopened and in original packaging</li>
            <li>Refunds processed within 5-7 business days</li>
            <li>Original shipping costs are non-refundable</li>
          </ul>
        </div>

        <div className="quick-actions">
          <button className="btn-primary" disabled title="Coming soon">
            <FiPackage size={16} /> Initiate New Return
          </button>
          <button className="btn-secondary">
            <FiFileText size={16} /> Return Policy Details
          </button>
        </div>
      </div>

      <div className="returns-list">
        <div className="empty-returns">
          <div className="empty-icon"><FiRotateCcw size={48} /></div>
          <h3>No returns yet</h3>
          <p>You haven't initiated any returns. If you need to return an item, you can start the process from your order history.</p>
        </div>
      </div>
    </div>
  );
};

export default Returns;
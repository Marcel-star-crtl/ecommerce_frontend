import React, { useState } from 'react';
import { userAPI } from '../../../api/api';
import './AccountInfo.css';

const AccountInfo = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    address: user?.address || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      await userAPI.updateProfile({
        firstname: formData.firstname,
        lastname: formData.lastname,
        mobile: formData.mobile
      });
      
      if (formData.address !== user?.address) {
        await userAPI.saveAddress(formData.address);
      }
      
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      
      // Auto-hide message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      address: user?.address || ''
    });
    setIsEditing(false);
    setMessage('');
  };

  return (
    <div className="account-info">
      <div className="account-header">
        <h2>Personal Information</h2>
        <p>Manage your account details and preferences</p>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="account-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className="form-input"
              />
            ) : (
              <div className="form-display">{user?.firstname || 'Not provided'}</div>
            )}
          </div>
          
          <div className="form-group">
            <label>Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="form-input"
              />
            ) : (
              <div className="form-display">{user?.lastname || 'Not provided'}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email Address</label>
            <div className="form-display email-display">
              {user?.email || 'Not provided'}
              <button className="change-link">Change</button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Mobile Number</label>
            {isEditing ? (
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter mobile number"
              />
            ) : (
              <div className="form-display">{user?.mobile || 'Not provided'}</div>
            )}
          </div>
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          {isEditing ? (
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Enter your address"
              rows="3"
            />
          ) : (
            <div className="form-display">{user?.address || 'Not provided'}</div>
          )}
        </div>

        <div className="form-group full-width">
          <label>Password</label>
          <div className="form-display password-display">
            ••••••••••••••••••••
            <button className="change-link">Change Password</button>
          </div>
        </div>

        <div className="account-status">
          <div className="status-item">
            <span className="status-label">Account Status</span>
            <span className={`status-value ${user?.isBlocked ? 'blocked' : 'active'}`}>
              {user?.isBlocked ? 'Blocked' : 'Active'}
            </span>
          </div>
          
          <div className="status-item">
            <span className="status-label">Member Since</span>
            <span className="status-value">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              }) : 'Unknown'}
            </span>
          </div>
        </div>

        <div className="form-actions">
          {isEditing ? (
            <div className="edit-actions">
              <button 
                onClick={handleCancel} 
                className="btn-cancel"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="btn-save"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn-edit"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="danger-zone">
        <h3>Account Actions</h3>
        <div className="danger-actions">
          <button className="btn-danger">
            Delete Account
          </button>
          <p className="danger-text">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
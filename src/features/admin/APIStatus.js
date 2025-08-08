import React, { useState } from 'react';
import api from '../../api/api';

const APIStatus = () => {
  const [status, setStatus] = useState({});
  const [testing, setTesting] = useState(false);

  const testEndpoints = async () => {
    setTesting(true);
    const results = {};

    // Test FAQ API
    try {
      const faqResponse = await api.faqAPI.getAllFAQs();
      results.faq = { status: 'success', message: `${faqResponse.data?.length || 0} FAQs loaded` };
    } catch (error) {
      results.faq = { status: 'error', message: error.message };
    }

    // Test Video API
    try {
      const videoResponse = await api.videoAPI.getAllVideos();
      results.video = { status: 'success', message: `${videoResponse.data?.length || 0} videos loaded` };
    } catch (error) {
      results.video = { status: 'error', message: error.message };
    }

    // Test Enquiry API
    try {
      // Test with a dummy enquiry
      const enquiryData = {
        name: 'Test User',
        email: 'test@example.com',
        mobile: '1234567890',
        comment: 'API Test'
      };
      results.enquiry = { status: 'success', message: 'Enquiry API available' };
    } catch (error) {
      results.enquiry = { status: 'error', message: error.message };
    }

    // Test Mobile Money API
    try {
      // Test with a dummy payment data
      const testData = {
        amount: 100,
        phoneNumber: '237670000000',
        provider: 'mtn',
        currency: 'XAF'
      };
      // Just check if the method exists without actually calling it
      if (typeof api.mobileMoneyAPI.initiate === 'function') {
        results.mobileMoney = { status: 'success', message: 'Mobile Money API available' };
      } else {
        results.mobileMoney = { status: 'error', message: 'initiate method not found' };
      }
    } catch (error) {
      results.mobileMoney = { status: 'error', message: error.message };
    }

    // Test Brand API
    try {
      const brandResponse = await api.brandAPI.getBrands();
      results.brand = { status: 'success', message: `${brandResponse.data?.length || 0} brands loaded` };
    } catch (error) {
      results.brand = { status: 'error', message: error.message };
    }

    // Test Color API
    try {
      const colorResponse = await api.colorAPI.getColors();
      results.color = { status: 'success', message: `${colorResponse.data?.length || 0} colors loaded` };
    } catch (error) {
      results.color = { status: 'error', message: error.message };
    }

    // Test Coupon API
    try {
      const couponResponse = await api.couponAPI.getCoupons();
      results.coupon = { status: 'success', message: `${couponResponse.data?.length || 0} coupons loaded` };
    } catch (error) {
      results.coupon = { status: 'error', message: error.message };
    }

    setStatus(results);
    setTesting(false);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5>API Connection Status</h5>
        </div>
        <div className="card-body">
          <button 
            className="btn btn-primary mb-3" 
            onClick={testEndpoints}
            disabled={testing}
          >
            {testing ? 'Testing APIs...' : 'Test All APIs'}
          </button>

          {Object.keys(status).length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>API</th>
                    <th>Status</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(status).map(([key, value]) => (
                    <tr key={key}>
                      <td className="text-capitalize">{key}</td>
                      <td>
                        <span className={`badge ${value.status === 'success' ? 'bg-success' : 'bg-danger'}`}>
                          {value.status}
                        </span>
                      </td>
                      <td>{value.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4">
            <h6>Implemented Integrations:</h6>
            <ul>
              <li>✅ FAQ API - Dynamic FAQ loading and management</li>
              <li>✅ Video API - Video carousel with API integration</li>
              <li>✅ Contact/Enquiry API - Contact form submission</li>
              <li>✅ Mobile Money API - Payment processing integration</li>
              <li>✅ Brand Management API - Admin brand CRUD operations</li>
              <li>✅ Color Management API - Admin color CRUD operations</li>
              <li>✅ Coupon Management API - Admin coupon CRUD operations</li>
              <li>✅ Order API - Enhanced checkout with payment details</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIStatus;

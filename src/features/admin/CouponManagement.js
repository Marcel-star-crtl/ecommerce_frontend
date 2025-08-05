import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoupons, createCoupon, updateCoupon, deleteCoupon } from './couponSlice';
import Loader from '../../components/Loader/Loader';

const CouponManagement = () => {
  const dispatch = useDispatch();
  const { coupons, status, error } = useSelector(state => state.coupons);
  const [formData, setFormData] = useState({
    name: '',
    expiry: '',
    discount: ''
  });
  const [editingCoupon, setEditingCoupon] = useState(null);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.expiry && formData.discount) {
      await dispatch(createCoupon({
        name: formData.name,
        expiry: formData.expiry,
        discount: parseFloat(formData.discount)
      }));
      setFormData({ name: '', expiry: '', discount: '' });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editingCoupon && formData.name.trim() && formData.expiry && formData.discount) {
      await dispatch(updateCoupon({
        id: editingCoupon._id,
        data: {
          name: formData.name,
          expiry: formData.expiry,
          discount: parseFloat(formData.discount)
        }
      }));
      setEditingCoupon(null);
      setFormData({ name: '', expiry: '', discount: '' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      await dispatch(deleteCoupon(id));
    }
  };

  const startEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      name: coupon.name,
      expiry: coupon.expiry.split('T')[0],
      discount: coupon.discount.toString()
    });
  };

  const cancelEdit = () => {
    setEditingCoupon(null);
    setFormData({ name: '', expiry: '', discount: '' });
  };

  if (status === 'loading') {
    return <Loader fullScreen />;
  }

  return (
    <div className="container mt-4">
      <h2>Coupon Management</h2>
      
      <div className="card mb-4">
        <div className="card-header">
          <h5>{editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={editingCoupon ? handleUpdate : handleCreate}>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Coupon Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., SAVE20"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Expiry Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.expiry}
                    onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Discount (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g., 20"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) => setFormData({...formData, discount: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary" type="submit">
                {editingCoupon ? 'Update Coupon' : 'Add Coupon'}
              </button>
              {editingCoupon && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          Error: {error}
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5>Existing Coupons</h5>
        </div>
        <div className="card-body">
          {coupons.length === 0 ? (
            <p>No coupons found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Discount</th>
                    <th>Expiry Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(coupon => {
                    const isExpired = new Date(coupon.expiry) < new Date();
                    return (
                      <tr key={coupon._id}>
                        <td>
                          <span className="badge bg-primary">{coupon.name}</span>
                        </td>
                        <td>{coupon.discount}%</td>
                        <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${isExpired ? 'bg-danger' : 'bg-success'}`}>
                            {isExpired ? 'Expired' : 'Active'}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => startEdit(coupon)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(coupon._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponManagement;
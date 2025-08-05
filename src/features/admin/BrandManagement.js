import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, createBrand, updateBrand, deleteBrand } from './brandSlice';
import Loader from '../../components/Loader/Loader';

const BrandManagement = () => {
  const dispatch = useDispatch();
  const { brands, status, error } = useSelector(state => state.brands);
  const [newBrandTitle, setNewBrandTitle] = useState('');
  const [editingBrand, setEditingBrand] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (newBrandTitle.trim()) {
      await dispatch(createBrand(newBrandTitle));
      setNewBrandTitle('');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editTitle.trim() && editingBrand) {
      await dispatch(updateBrand({ id: editingBrand._id, title: editTitle }));
      setEditingBrand(null);
      setEditTitle('');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      await dispatch(deleteBrand(id));
    }
  };

  const startEdit = (brand) => {
    setEditingBrand(brand);
    setEditTitle(brand.title);
  };

  if (status === 'loading') {
    return <Loader fullScreen />;
  }

  return (
    <div className="container mt-4">
      <h2>Brand Management</h2>
      
      <div className="card mb-4">
        <div className="card-header">
          <h5>Add New Brand</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleCreate}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Brand name"
                value={newBrandTitle}
                onChange={(e) => setNewBrandTitle(e.target.value)}
                required
              />
              <button className="btn btn-primary" type="submit">
                Add Brand
              </button>
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
          <h5>Existing Brands</h5>
        </div>
        <div className="card-body">
          {brands.length === 0 ? (
            <p>No brands found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map(brand => (
                    <tr key={brand._id}>
                      <td>
                        {editingBrand?._id === brand._id ? (
                          <form onSubmit={handleUpdate} className="d-inline">
                            <input
                              type="text"
                              className="form-control d-inline-block"
                              style={{ width: 'auto' }}
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              required
                            />
                          </form>
                        ) : (
                          brand.title
                        )}
                      </td>
                      <td>
                        {editingBrand?._id === brand._id ? (
                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={handleUpdate}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setEditingBrand(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => startEdit(brand)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(brand._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandManagement;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColors, createColor, updateColor, deleteColor } from './colorSlice';
import Loader from '../../components/Loader/Loader';

const ColorManagement = () => {
  const dispatch = useDispatch();
  const { colors, status, error } = useSelector(state => state.colors);
  const [newColorTitle, setNewColorTitle] = useState('');
  const [editingColor, setEditingColor] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (newColorTitle.trim()) {
      await dispatch(createColor(newColorTitle));
      setNewColorTitle('');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editTitle.trim() && editingColor) {
      await dispatch(updateColor({ id: editingColor._id, title: editTitle }));
      setEditingColor(null);
      setEditTitle('');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this color?')) {
      await dispatch(deleteColor(id));
    }
  };

  const startEdit = (color) => {
    setEditingColor(color);
    setEditTitle(color.title);
  };

  if (status === 'loading') {
    return <Loader fullScreen />;
  }

  return (
    <div className="container mt-4">
      <h2>Color Management</h2>
      
      <div className="card mb-4">
        <div className="card-header">
          <h5>Add New Color</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleCreate}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Color name"
                value={newColorTitle}
                onChange={(e) => setNewColorTitle(e.target.value)}
                required
              />
              <button className="btn btn-primary" type="submit">
                Add Color
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
          <h5>Existing Colors</h5>
        </div>
        <div className="card-body">
          {colors.length === 0 ? (
            <p>No colors found.</p>
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
                  {colors.map(color => (
                    <tr key={color._id}>
                      <td>
                        {editingColor?._id === color._id ? (
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
                          <span className="d-flex align-items-center">
                            <div
                              className="me-2"
                              style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: color.title.toLowerCase(),
                                border: '1px solid #ccc',
                                borderRadius: '3px'
                              }}
                            ></div>
                            {color.title}
                          </span>
                        )}
                      </td>
                      <td>
                        {editingColor?._id === color._id ? (
                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={handleUpdate}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setEditingColor(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => startEdit(color)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(color._id)}
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

export default ColorManagement;
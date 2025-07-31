import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";
import { fetchCategories } from "../../Category/PopularCategories/popularCategoriesSlice";
import { resetCart } from "../../cart/cartSlice";
import api from "../../../api/api";

function Navbar() {
  const dispatch = useDispatch();
  const { cartCount } = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { categories } = useSelector((state) => state.categories);

  // Search functionality state
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleLogout = () => {
    dispatch(resetCart());
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Search functionality
  const handleSearch = (event) => {
    const query = event.target.value.trim();
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (query === "") {
      setShowResults(false);
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      const categoryParam = selectedCategory ? `&category__name=${selectedCategory}` : "";
      
      api.get(`/products?search=${query}${categoryParam}`)
        .then((res) => {
          setSearchError("");
          setShowResults(true);
          setSearchResults(res.data.results || []);
        })
        .catch((err) => {
          console.log(err);
          setSearchError("No products found");
          setShowResults(true);
          setSearchResults([]);
        });
    }, 500);

    setSearchTimeout(timeout);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setShowResults(false);
      setSearchResults([]);
    }
  };

  return (
    <>
      <nav className="navbar" style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e5e5',
        padding: '12px 0',
        fontFamily: 'Arial, sans-serif',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div className="container-fluid" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px' }}>
          <div className="d-flex justify-content-between align-items-center w-100">
            
            {/* Left side - Brand */}
            <div className="navbar-brand" style={{ flex: '0 0 auto' }}>
              <Link to="/home" className="text-decoration-none">
                <span style={{
                  fontSize: window.innerWidth <= 768 ? '20px' : '24px',
                  fontWeight: '300',
                  letterSpacing: window.innerWidth <= 768 ? '2px' : '4px',
                  color: '#333',
                  textTransform: 'uppercase'
                }}>
                  SHYNEEN
                </span>
              </Link>
            </div>

            {/* Center - Navigation Links (Desktop only) */}
            <div className="navbar-nav d-none d-lg-flex" style={{ flex: '1' }}>
              <div className="d-flex justify-content-center gap-4">
                <Link
                  to="/new-arrivals"
                  className="nav-link text-decoration-none"
                  style={{
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: '400',
                    padding: '8px 16px',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#666'}
                  onMouseLeave={(e) => e.target.style.color = '#333'}
                >
                  New Arrivals
                </Link>
                <Link
                  to="/shops"
                  className="nav-link text-decoration-none"
                  style={{
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: '400',
                    padding: '8px 16px',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#666'}
                  onMouseLeave={(e) => e.target.style.color = '#333'}
                >
                  Shop all
                </Link>
                <Link
                  to="/skin-care"
                  className="nav-link text-decoration-none"
                  style={{
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: '400',
                    padding: '8px 16px',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#666'}
                  onMouseLeave={(e) => e.target.style.color = '#333'}
                >
                  Skin Care
                </Link>
                <Link
                  to="/bath-body"
                  className="nav-link text-decoration-none"
                  style={{
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: '400',
                    padding: '8px 16px',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#666'}
                  onMouseLeave={(e) => e.target.style.color = '#333'}
                >
                  Bath & Body
                </Link>
              </div>
            </div>

            {/* Right side - Icons and Account */}
            <div className="d-flex align-items-center gap-2 gap-md-3" style={{ flex: '0 0 auto' }}>
              
              {/* Search Icon */}
              <button
                className="btn p-0"
                onClick={toggleSearch}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#333',
                  fontSize: '20px'
                }}
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </button>

              {/* Heart/Wishlist Icon */}
              <Link
                to="/wishlist"
                className="text-decoration-none position-relative"
                style={{ color: '#333' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span
                  className="position-absolute badge rounded-pill bg-danger"
                  style={{
                    top: '-8px',
                    right: '-8px',
                    fontSize: '10px',
                    minWidth: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  1
                </span>
              </Link>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="text-decoration-none position-relative"
                style={{ color: '#333' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 7.99191 15.2736 8.31378 15.5981C8.63564 15.9225 9.04213 16.1314 9.48 16.19H19.4C19.7056 16.1934 20.0112 16.1342 20.2972 16.0156C20.5832 15.897 20.8421 15.7218 21.0564 15.5009C21.2706 15.28 21.4354 15.0186 21.5402 14.731C21.6449 14.4434 21.6872 14.1361 21.664 13.83L20.36 6H6"></path>
                </svg>
                {cartCount > 0 && (
                  <span
                    className="position-absolute badge rounded-pill bg-danger"
                    style={{
                      top: '-8px',
                      right: '-8px',
                      fontSize: '10px',
                      minWidth: '16px',
                      height: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Desktop Account Links */}
              <div className="d-none d-md-flex align-items-center gap-2 gap-lg-3">
                <Link
                  to="/stores"
                  className="text-decoration-none d-none d-lg-inline"
                  style={{
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: '400',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Stores
                </Link>
                <Link
                  to="/aboutus"
                  className="text-decoration-none d-none d-lg-inline"
                  style={{
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: '400',
                    whiteSpace: 'nowrap'
                  }}
                >
                  About
                </Link>
                {!isLoggedIn ? (
                  <Link
                    to="/login"
                    className="text-decoration-none"
                    style={{
                      color: '#333',
                      fontSize: '14px',
                      fontWeight: '400',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="btn p-0"
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#333',
                      fontSize: '14px',
                      fontWeight: '400',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Logout
                  </button>
                )}
                <Link
                  to="/contact"
                  className="text-decoration-none d-none d-lg-inline"
                  style={{
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: '400',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Contact
                </Link>
              </div>

              {/* Avatar Icon for Orders */}
              {isLoggedIn && (
                <Link
                  to="/orders"
                  className="text-decoration-none"
                  style={{ color: '#333' }}
                  title="My Orders"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      borderRadius: '50%',
                      border: '1px solid #333',
                      padding: '2px'
                    }}
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="btn d-md-none p-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#333'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div 
            className="w-100" 
            style={{ 
              backgroundColor: '#f8f9fa', 
              borderTop: '1px solid #e5e5e5',
              padding: '16px 0'
            }}
          >
            <div className="container-fluid" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px' }}>
              <div className="position-relative">
                <div className="d-flex gap-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
                  <select
                    className="form-select border-end-0"
                    style={{
                      flex: '0 0 120px',
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      fontSize: '14px'
                    }}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">All Categories</option>
                    {categories && categories.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="search"
                    className="form-control border-start-0"
                    placeholder="Search for products..."
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      fontSize: '14px'
                    }}
                    onChange={handleSearch}
                    onFocus={() => searchResults.length > 0 && setShowResults(true)}
                  />
                </div>

                {/* Search Results */}
                {showResults && (
                  <div 
                    className="position-absolute w-100"
                    style={{
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      maxWidth: '600px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      zIndex: 1000,
                      maxHeight: '400px',
                      overflowY: 'auto'
                    }}
                  >
                    {searchError ? (
                      <div className="text-center p-3 text-muted">
                        {searchError}
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="text-decoration-none"
                            style={{ color: 'inherit' }}
                            onClick={() => {
                              setShowResults(false);
                              setShowSearch(false);
                            }}
                          >
                            <div 
                              className="d-flex align-items-center p-3"
                              style={{
                                borderBottom: '1px solid #f0f0f0',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                              <img
                                src={`https://res.cloudinary.com/ddk98mjzn/${product.images.length ? product.images[0].image : ''}`}
                                alt={product.name}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'cover',
                                  borderRadius: '4px',
                                  marginRight: '12px'
                                }}
                              />
                              <div>
                                <div style={{ fontWeight: '500', fontSize: '14px' }}>
                                  {product.name}
                                </div>
                                {product.price && (
                                  <div style={{ fontSize: '12px', color: '#666' }}>
                                    ${product.price}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                        <div 
                          className="text-center p-2"
                          style={{ 
                            backgroundColor: '#f8f9fa',
                            fontSize: '12px',
                            color: '#666',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            setShowResults(false);
                            setShowSearch(false);
                          }}
                        >
                          View all results
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-3 text-muted">
                        Start typing to search for products...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Offcanvas Menu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header" style={{ borderBottom: '1px solid #e5e5e5' }}>
          <h5 className="offcanvas-title" id="mobileMenuLabel" style={{ letterSpacing: '2px' }}>
            SHYNEEN
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex flex-column gap-3">
            <Link 
              to="/new-arrivals" 
              className="text-decoration-none text-dark py-2"
              style={{ fontSize: '16px' }}
            >
              New Arrivals
            </Link>
            <Link 
              to="/shops" 
              className="text-decoration-none text-dark py-2"
              style={{ fontSize: '16px' }}
            >
              Shop all
            </Link>
            <Link 
              to="/skin-care" 
              className="text-decoration-none text-dark py-2"
              style={{ fontSize: '16px' }}
            >
              Skin Care
            </Link>
            <Link 
              to="/bath-body" 
              className="text-decoration-none text-dark py-2"
              style={{ fontSize: '16px' }}
            >
              Bath & Body
            </Link>
            <hr style={{ margin: '16px 0' }} />
            <Link 
              to="/stores" 
              className="text-decoration-none text-dark py-2"
              style={{ fontSize: '16px' }}
            >
              Stores
            </Link>
            <Link 
              to="/aboutus" 
              className="text-decoration-none text-dark py-2"
              style={{ fontSize: '16px' }}
            >
              About
            </Link>
            {!isLoggedIn ? (
              <Link 
                to="/login" 
                className="text-decoration-none text-dark py-2"
                style={{ fontSize: '16px' }}
              >
                Login
              </Link>
            ) : (
              <>
                <Link 
                  to="/orders" 
                  className="text-decoration-none text-dark py-2"
                  style={{ fontSize: '16px' }}
                >
                  My Orders
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-link text-start p-0 text-dark"
                  style={{ fontSize: '16px', textAlign: 'left' }}
                >
                  Logout
                </button>
              </>
            )}
            <Link 
              to="/contact" 
              className="text-decoration-none text-dark py-2"
              style={{ fontSize: '16px' }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for search results on mobile */}
      {showResults && (
        <div
          className="position-fixed d-block d-lg-none"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
          onClick={() => {
            setShowResults(false);
            setShowSearch(false);
          }}
        />
      )}
    </>
  );
}

export default Navbar;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";
import { fetchCategories } from "../../Category/PopularCategories/popularCategoriesSlice";
import { resetCart } from "../../cart/cartSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { cartCount } = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { categories } = useSelector((state) => state.categories);

  const handleLogout = () => {
    dispatch(resetCart());
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <nav className="navbar" style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e5e5',
      padding: '16px 0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div className="container-fluid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="d-flex justify-contentt-between align-items-center w-100">
          
          {/* Left side - Brand */}
          <div className="navbar-brand" style={{ flex: '0 0 300px' }}>
            <Link to="/home" className="text-decoration-none">
              <span style={{
                fontSize: '24px',
                fontWeight: '300',
                letterSpacing: '4px',
                color: '#333',
                textTransform: 'uppercase'
              }}>
                SHYNEEN
              </span>
            </Link>
          </div>

          {/* Center - Navigation Links */}
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
                  transition: 'color 0.3s ease'
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
                  transition: 'color 0.3s ease'
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
                  transition: 'color 0.3s ease'
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
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#666'}
                onMouseLeave={(e) => e.target.style.color = '#333'}
              >
                Bath & Body
              </Link>
            </div>
          </div>

          {/* Right side - Icons and Account */}
          <div className="d-flex align-items-center gap-3" style={{ flex: '0 0 300px', justifyContent: 'flex-end' }}>
            
            {/* Search Icon */}
            <button 
              className="btn p-0"
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
              className="text-decoration-none"
              style={{ color: '#333' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 7.99191 15.2736 8.31378 15.5981C8.63564 15.9225 9.04213 16.1314 9.48 16.19H19.4C19.7056 16.1934 20.0112 16.1342 20.2972 16.0156C20.5832 15.897 20.8421 15.7218 21.0564 15.5009C21.2706 15.28 21.4354 15.0186 21.5402 14.731C21.6449 14.4434 21.6872 14.1361 21.664 13.83L20.36 6H6"></path>
              </svg>
            </Link>

            {/* Account Links */}
            <div className="d-none d-lg-flex align-items-center gap-3">
              <Link 
                to="/stores" 
                className="text-decoration-none"
                style={{
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: '400'
                }}
              >
                Stores
              </Link>
              <Link 
                to="/aboutus" 
                className="text-decoration-none"
                style={{
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: '400'
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
                    fontWeight: '400'
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
                    fontWeight: '400'
                  }}
                >
                  Logout
                </button>
              )}
              <Link 
                to="/contact" 
                className="text-decoration-none"
                style={{
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: '400'
                }}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="btn d-lg-none p-0"
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

      {/* Mobile Offcanvas Menu */}
      <div 
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileMenuLabel">SHYNEEN</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex flex-column gap-3">
            <Link to="/new-arrivals" className="text-decoration-none text-dark">New Arrivals</Link>
            <Link to="/shops" className="text-decoration-none text-dark">Shop all</Link>
            <Link to="/skin-care" className="text-decoration-none text-dark">Skin Care</Link>
            <Link to="/bath-body" className="text-decoration-none text-dark">Bath & Body</Link>
            <hr />
            <Link to="/stores" className="text-decoration-none text-dark">Stores</Link>
            <Link to="/about" className="text-decoration-none text-dark">About</Link>
            {!isLoggedIn ? (
              <Link to="/login" className="text-decoration-none text-dark">Login</Link>
            ) : (
              <button onClick={handleLogout} className="btn btn-link text-start p-0 text-dark">Logout</button>
            )}
            <Link to="/contact" className="text-decoration-none text-dark">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
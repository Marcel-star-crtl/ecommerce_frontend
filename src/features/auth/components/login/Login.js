import React, { useState } from "react";
import api from "../../../../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setServerError("");

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await api.post("/user/login", { email, password });

        const loginPayload = {
          user: {
            id: response.data._id,        
            _id: response.data._id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            mobile: response.data.mobile,
          },
          token: response.data.token,
          isLoggedIn: true
        };
        
        dispatch(login(loginPayload));
        navigate("/home");
      } catch (error) {
        setServerError(error?.response?.data?.message || "Invalid email or password.");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/assets/slide1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '400',
            color: '#333',
            marginBottom: '30px',
            textAlign: 'left',
          }}
        >
          Log in to your account
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 0',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                fontSize: '14px',
                color: '#666',
                backgroundColor: 'transparent',
                outline: 'none',
              }}
            />
            {errors.email && (
              <p style={{ color: '#e53e3e', fontSize: '12px', marginTop: '5px' }}>
                {errors.email}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '10px', position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 0',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                fontSize: '14px',
                color: '#666',
                backgroundColor: 'transparent',
                outline: 'none',
                paddingRight: '50px',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '0',
                top: '12px',
                background: 'none',
                border: 'none',
                color: '#999',
                fontSize: '12px',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {errors.password && (
              <p style={{ color: '#e53e3e', fontSize: '12px', marginTop: '5px' }}>
                {errors.password}
              </p>
            )}
          </div>

          <div style={{ textAlign: 'right', marginBottom: '30px' }}>
            <a
              href="#"
              style={{
                color: '#999',
                fontSize: '12px',
                textDecoration: 'none',
              }}
            >
              Forgotten password?
            </a>
          </div>

          {serverError && (
            <p style={{ color: '#e53e3e', fontSize: '12px', marginBottom: '15px' }}>
              {serverError}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#E8A5C4',
              color: 'white',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '30px',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#E298BC')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#E8A5C4')}
          >
            Log in
          </button>
        </form>

        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '400',
              color: '#333',
              marginBottom: '15px',
            }}
          >
            New to Shyneen?
          </h3>
          <p
            style={{
              fontSize: '12px',
              color: '#666',
              lineHeight: '1.5',
              marginBottom: '15px',
            }}
          >
            This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to...
          </p>
        </div>

        <button
          style={{
            display: 'block',
            width: '100%',
            padding: '15px',
            backgroundColor: 'transparent',
            color: '#999',
            border: '1px solid #e0e0e0',
            fontSize: '14px',
            textAlign: 'center',
            textDecoration: 'none',
            transition: 'all 0.2s',
            boxSizing: 'border-box',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#f5f5f5';
            e.target.style.color = '#333';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#999';
          }}
          onClick={() => navigate("/register")}
        >
          Create account
        </button>
      </div>
    </div>
  );
}

export default Login;
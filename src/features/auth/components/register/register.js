import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeScreen from "./WelcomeScreen";
import api from "../../../../api/api"; 

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [subscribeToComms, setSubscribeToComms] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (!acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await api.post("/user/register", {
        firstname: firstName,
        lastname: lastName,
        email,
        mobile,
        password,
      });
      console.log("Registration response:", res.data);
      setRegistrationSuccess(true);
      setServerError('');
    } catch (error) {
      console.error(error);
      setServerError(error?.response?.data?.message || "Registration failed. Try again.");
    }
  };

  if (registrationSuccess) {
    return (
      <WelcomeScreen
        userName={firstName}
        onProceed={() => navigate("/profile")}
        onClose={() => navigate("/home")}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/assets/slide1.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        <button
          type="button"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "20px",
            color: "#999",
            cursor: "pointer",
            padding: "5px",
            lineHeight: "1",
          }}
          onClick={() => navigate("/home")}
        >
          ×
        </button>

        <button
          type="button"
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "none",
            border: "none",
            fontSize: "16px",
            color: "#999",
            cursor: "pointer",
            padding: "5px",
          }}
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <h2
          style={{
            fontSize: "18px",
            fontWeight: "400",
            color: "#333",
            marginBottom: "30px",
            textAlign: "left",
            marginTop: "20px",
          }}
        >
          Create an account
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
            <div style={{ flex: "1" }}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "14px",
                  color: "#666",
                  backgroundColor: "transparent",
                  outline: "none",
                }}
              />
              {errors.firstName && (
                <p style={{ color: "#e53e3e", fontSize: "12px", marginTop: "5px" }}>{errors.firstName}</p>
              )}
            </div>
            <div style={{ flex: "1" }}>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "14px",
                  color: "#666",
                  backgroundColor: "transparent",
                  outline: "none",
                }}
              />
              {errors.lastName && (
                <p style={{ color: "#e53e3e", fontSize: "12px", marginTop: "5px" }}>{errors.lastName}</p>
              )}
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 0",
                border: "none",
                borderBottom: "1px solid #e0e0e0",
                fontSize: "14px",
                color: "#666",
                backgroundColor: "transparent",
                outline: "none",
              }}
            />
            {errors.email && (
              <p style={{ color: "#e53e3e", fontSize: "12px", marginTop: "5px" }}>{errors.email}</p>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="tel"
              placeholder="Mobile (optional)"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 0",
                border: "none",
                borderBottom: "1px solid #e0e0e0",
                fontSize: "14px",
                color: "#666",
                backgroundColor: "transparent",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px", position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 0",
                border: "none",
                borderBottom: "1px solid #e0e0e0",
                fontSize: "14px",
                color: "#666",
                backgroundColor: "transparent",
                outline: "none",
                paddingRight: "50px",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "0",
                top: "12px",
                background: "none",
                border: "none",
                color: "#999",
                fontSize: "12px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p style={{ color: "#e53e3e", fontSize: "12px", marginTop: "5px" }}>{errors.password}</p>
            )}
            <p style={{ color: "#999", fontSize: "11px", marginTop: "5px", textAlign: "right" }}>
              Forgotten password?
            </p>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                fontSize: "12px",
                color: "#666",
                lineHeight: "1.4",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={subscribeToComms}
                onChange={(e) => setSubscribeToComms(e.target.checked)}
                style={{
                  marginRight: "8px",
                  marginTop: "2px",
                  minWidth: "14px",
                }}
              />
              <span>
                Subscribe to receive communications from Aesop. By subscribing, you confirm you have read and
                understood our{" "}
                <a href="#" style={{ color: "#666", textDecoration: "underline" }}>
                  privacy policy
                </a>
                .
              </span>
            </label>
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                fontSize: "12px",
                color: "#666",
                lineHeight: "1.4",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                style={{
                  marginRight: "8px",
                  marginTop: "2px",
                  minWidth: "14px",
                }}
              />
              <span>
                By creating an account, you confirm you have read and understood our{" "}
                <a href="#" style={{ color: "#666", textDecoration: "underline" }}>
                  privacy policy
                </a>{" "}
                and{" "}
                <a href="#" style={{ color: "#666", textDecoration: "underline" }}>
                  terms and conditions
                </a>
                .
              </span>
            </label>
            {errors.acceptTerms && (
              <p style={{ color: "#e53e3e", fontSize: "12px", marginTop: "5px" }}>{errors.acceptTerms}</p>
            )}
          </div>

          {serverError && (
            <div style={{ color: "#e53e3e", fontSize: "12px", marginBottom: "10px" }}>{serverError}</div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#E8A5C4",
              color: "white",
              border: "none",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              marginBottom: "20px",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#E298BC")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#E8A5C4")}
          >
            Create account
          </button>
        </form>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "#999", margin: "0" }}>Do you already have an account?</p>
        </div>
      </div>
    </div>
  );
}

export default Register;

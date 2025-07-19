// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Alert, AlertIcon } from "@chakra-ui/react";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRow,
//   MDBCol,
//   MDBIcon,
//   MDBInput,
//   MDBValidation,
//   MDBValidationItem,
// } from "mdb-react-ui-kit";
// import api from "../../../../api/api";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   setError,
//   clearError,
//   setSuccess,
//   clearSuccess,
// } from "../../../utils/apiStatusSlice.js";
// import { login } from "../../authSlice";
// import styles from "./stylee.module.css";

// function Login() {
//   const dispatch = useDispatch();
//   const error = useSelector((state) => state.apiStatus.error);
//   const success = useSelector((state) => state.apiStatus.success);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     api
//       .post("/user/login", data)
//       .then((res) => {
//         // The original code had { access, refresh }, but the backend sends a different structure.
//         // Let's assume the backend sends the structure you defined in the backend controller.
//         const user = res.data;
//         // You might need to adjust your authSlice 'login' action to handle this payload.
//         dispatch(login(user));
//         dispatch(clearError());
//         dispatch(setSuccess("Logged In Successfully"));
//         setTimeout(() => {
//           navigate("/home");
//         }, 1000);
//       })
//       .catch((err) => {
//         dispatch(clearSuccess());
//         // Display a more user-friendly error from the server response if available
//         const errorMessage = err.response?.data?.message || err.message;
//         dispatch(setError(errorMessage));
//       });
//   };

//   useEffect(() => {
//     // Clear errors and successes when the component unmounts
//     return () => {
//       dispatch(clearSuccess());
//       dispatch(clearError());
//     };
//   }, [dispatch]);

//   return (
//     <div className={`${styles.body}`}>
//       <MDBContainer className="my-5" data-aos="zoom-in">
//         <MDBCard>
//           <div className="d-flex flex-row m-auto my-3 ">
//             <span className="h1 fw-bold mb-0">Login</span>
//           </div>
//           <MDBRow className="g-0">
//             <MDBCol md="6">
//               <MDBCardImage
//                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//                 alt="login form"
//                 className="rounded-start w-100"
//               />
//             </MDBCol>

//             <MDBCol md="6">
//               <MDBCardBody className="d-flex flex-column">
//                 <MDBValidation
//                   className="text-center"
//                   onSubmit={handleSubmit(onSubmit)}
//                   noValidate
//                 >
//                   <h5
//                     className="fw-normal my-4 pb-3"
//                     style={{ letterSpacing: "1px" }}
//                   >
//                     Sign into your account
//                   </h5>

//                   <MDBValidationItem
//                     feedback={errors.email ? errors.email?.message : ""}
//                     invalid={!!errors.email}
//                   >
//                     <MDBInput
//                       wrapperClass={!errors.email ? "mb-4" : "mb-5"}
//                       label="Email Address"
//                       id="emailInput"
//                       type="email"
//                       size="lg"
//                       required
//                       {...register("email", {
//                         required: {
//                           value: true,
//                           message: "Email is required.",
//                         },
//                         pattern: {
//                           value: /^\S+@\S+\.\S+$/,
//                           message: "Please enter a valid email address.",
//                         },
//                       })}
//                     />
//                   </MDBValidationItem>

//                   <MDBValidationItem
//                     feedback={errors.password ? errors.password?.message : ""}
//                     invalid={!!errors.password}
//                   >
//                     <MDBInput
//                       wrapperClass={!errors.password ? "mb-4" : "mb-5"}
//                       label="Password"
//                       id="passwordInput"
//                       type="password"
//                       size="lg"
//                       required
//                       {...register("password", {
//                         required: {
//                           value: true,
//                           message: "Password is required.",
//                         },
//                       })}
//                     />
//                   </MDBValidationItem>

//                   <MDBBtn
//                     className="mt-2 mb-4 px-5 mx-auto"
//                     color="dark"
//                     size="lg"
//                     type="submit"
//                   >
//                     Login
//                   </MDBBtn>

//                   <p className="small fw-bold mt-2 pt-1 mb-2">
//                     Don't have an account?{" "}
//                     <Link to="/register" className="link-danger">
//                       Register Here
//                     </Link>
//                   </p>
//                 </MDBValidation>{" "}
//                 {error || success ? (
//                   <div className="w-max m-auto mt-3">
//                     <Alert status={error ? "error" : "success"}>
//                       <AlertIcon />
//                       {error ? error : success}
//                     </Alert>
//                   </div>
//                 ) : null}
//               </MDBCardBody>
//             </MDBCol>
//           </MDBRow>
//         </MDBCard>
//       </MDBContainer>
//     </div>
//   );
// }

// export default Login;










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
        
        // Transform the response to match what authSlice expects
        const loginPayload = {
          user: {
            id: response.data._id,        // Map _id to id
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
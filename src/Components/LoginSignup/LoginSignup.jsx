import React, { useState } from 'react';
import './LoginSignup.css';

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userType: "client", // Default to client login
  });
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted:", formData.email, formData.password, formData.userType);
    // Add your login logic here
  };

  const handleSendPassword = () => {
    // Add logic to send password to the email entered in forgot password popup
    console.log("Sending password to:", forgotPasswordEmail);
    // Reset the email and close the popup
    setForgotPasswordEmail("");
    setShowForgotPassword(false);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();    

    // Proceed with signup logic
    console.log("Signup form submitted:", formData);
    // Add your signup logic here

    // Reset form data
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userType: "client", // Default to client login
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errorsCopy = { ...errors }; // Make a copy of the errors state

    // Validation
    const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (name) {
      case "firstName":
        if (!value.match(nameRegex)) {
          errorsCopy.firstName = "First name should contain only alphabets";
        } else {
          delete errorsCopy.firstName;
        }
        break;
      case "lastName":
        if (!value.match(nameRegex)) {
          errorsCopy.lastName = "Last name should contain only alphabets";
        } else {
          delete errorsCopy.lastName;
        }
        break;
      case "email":
        if (!value.match(emailRegex)) {
          errorsCopy.email = "Invalid email address";
        } else {
          delete errorsCopy.email;
        }
        break;
      default:
        break;
    }

    // Update the errors state
    setErrors(errorsCopy);

    // Update the form data state
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
      // Remove clientEmail and clientPassword if they exist in the form data
      ...(name === "clientEmail" || name === "clientPassword" ? {} : {
        email: name === "email" ? value : prevFormData.email,
        password: name === "password" ? value : prevFormData.password,
      }),
    }));
  };

  const toggleAction = () => {
    setAction((prevAction) => (prevAction === "Login" ? "Sign Up" : "Login"));
  };

  return (
    <div className="container">
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray" : "submit"} onClick={toggleAction}>Sign Up</div>
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={toggleAction}>Login</div>
      </div>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      {action === "Login" ? (
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <div className="inputs">
            <div className="input">
              <span className='inputIcon' style={{ color: 'grey' }}><MdEmail /></span>
              <input
                type="email"
                placeholder="Email Id"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="input">
              <span className='inputIcon' style={{ color: 'grey' }}><RiLockPasswordFill /></span>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="forgot-password" onClick={handleForgotPasswordClick}>Forgot Password? <span>Click Here!</span></div>
          <div className="submit-container">
            <button type="submit" className="submit text-center">Login</button>
          </div>
        </form>
      ) : (
        <form className="signup-form" onSubmit={handleSignupSubmit}>
          <div className="inputs">
            <div className="input">
              <span className='inputIcon' style={{ color: 'grey' }}><FaUser /></span>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>

            <div className="input">
              <span className='inputIcon' style={{ color: 'grey' }}><FaUser /></span>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>

            <div className="input">
              <span className='inputIcon' style={{ color: 'grey' }}><MdEmail /></span>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="input">
              <span className='inputIcon' style={{ color: 'grey' }}><RiLockPasswordFill /></span>
              <input
                type="password"
                placeholder="Set Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="forgot-password">Already have an Account? <span onClick={toggleAction}>Login here!</span></div>
          <div className="submit-container">
            <button type="submit" className="submit text-center">Signup</button>
          </div>
        </form>
      )}
      {showForgotPassword && (
        <div className="popup">
          <div className="popup-content">
            <span className="closefp" onClick={handleForgotPasswordClose}>Close &times;</span>
            <h2>Forgot Password?</h2>
            <div className="login-form">
              <div className="inputs">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
                <button className='submit' onClick={handleSendPassword}>Send Password</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
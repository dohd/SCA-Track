import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  const handleSubmmit = (event) => {
    event.preventDefault();

    // Check username length
    if (userName.length < 4 || userName.length > 32) {
      setErrorMessage("Username must be between 4 and 32 characters.");
      return;
    }

    // Check password length
    if (pass.length < 4 || pass.length > 32) {
      setErrorMessage("Password must be between 4 and 32 characters.");
      return;
    }
        // Check if passwords match
        if (pass !== confirmPass) {
          setErrorMessage("Passwords do not match.");
          return;
        }
    

    axios
      .post("http://localhost:3000/register", {
        userName,
        pass,
        email,
      })
      .then((res) => {
        if (res.data.status === "success") {
          alert("User added!");
        } else {
          alert("Error");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      });
  };

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "90%",
        marginBottom: "20px",
      }}
    >
      <div
    style={{
      width: "100%",
      maxWidth: "800px",
      backgroundColor: "#FFDEAD",
      padding: "20px",
      borderRadius: "6px",
      marginLeft: "60px",
    }} >

<div
          style={{
            display: "flex",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              Register User
            </h1>
          </div>
          <div
            style={{
              width: "50%",
            }}
          >
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "background-color 0.2s",
                marginRight: "10px",
                marginLeft: "80%",
              }}
              type="button"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      <section className="register-form">
      
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          {/* Username Input */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <label
              htmlFor="username"
              style={{
                fontSize: "24px",
                marginBottom: "20px",
                color: "#333",
              }}
            >
              Username:
            </label>
            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              required
              aria-describedby="uidnote"
              onChange={(e) => setUserName(e.target.value)}
            />
            <p
              style={{
                marginTop: "20px",
              }}
            >
              4 to 32 characters.
              Must begin with a letter.
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}>
              <label
                htmlFor="email"
                style={{fontSize: "24px",
                marginBottom: "20px",
                color: "#333",
                }}
              >
                Email:
              </label>
              <input
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                required
                aria-describedby="uidnote"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p
               style={{
                textAlign: "center",
                marginTop: "20px",
              }}
              >
                4 to 24 characters.
                Must begin with a letter.
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>


          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              htmlFor="password"
              style={{
              fontSize: "24px",
              marginBottom: "20px",
              color: "#333",
              }}
            >
              Password:
            </label>
            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              type="password"
              id="password"
              name="password"
              required
              aria-describedby="passnote"
              onChange={(e) => setPass(e.target.value)}
            />
            <p
              style={{
                marginTop: "20px",
              }}
            >
              Enter password input field.
            </p>
          </div>

          {/* Confirm Password Input */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              htmlFor="confirm_pwd"
              style={{
              fontSize: "24px",
              marginBottom: "20px",
              color: "#333",
              }}
            >
              Confirm Password:
            </label>
            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              type="password"
              id="confirm_pwd"
              name="confirm_password"
              required
              aria-describedby="confirmpassnote"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <p
              style={{
                textAlign: "left",
                marginTop: "20px",
              }}
            >
              Enter password again to confirm.
            </p>
          </div>

          {/* Display Error Message */}
          {errorMessage && (
            <div
              style={{
                color: "red",
                marginTop: "10px",
              }}
            >
              {errorMessage}
            </div>
          )}


          {/* Submit Button */}
          <button
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              display: "inline-block",
              color: "white",
              marginTop: "10px",
              backgroundColor: "green",
              textDecoration: "underline",
            }}
            type="submit"
            onClick={handleSubmmit}
          >
            Register User
          </button>
        </form>
      </section>
    </div>
    </Box>
    
  );
};

export default Register;

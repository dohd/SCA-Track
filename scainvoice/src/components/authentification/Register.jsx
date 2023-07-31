import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

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
    <div className="register-container">
      <section className="register-form">
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "20px",
            color: "#333",
            textAlign: "center",
          }}
        >
          Register
        </h1>
        <form
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          {/* Username Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <label
              htmlFor="username"
              style={{
                fontSize: "32px",
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
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 32 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}>
              <label
                htmlFor="email"
                style={{
                  fontSize: "32px",
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
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <label
              htmlFor="password"
              style={{
                fontSize: "32px",
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
                textAlign: "center",
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
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <label
              htmlFor="confirm_pwd"
              style={{
                fontSize: "32px",
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
                textAlign: "center",
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
                textAlign: "center",
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
            Sign up
          </button>
        </form>
      </section>
    </div>
  );
};

export default Register;

import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import form from "./form.css";
import { useNavigate } from "react-router-dom";
import { Margin } from "@mui/icons-material";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmmit  = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/register", {
      userName,
      pass,
    })
    .then(res => {
      if(res.data.status === "success") {
        handlelogin();
      } else {
        alert("Error");
      } 
    })
    .then(err => console.log(err));
    
  }

  const handlelogin=()=>{
    navigate('/ ')
}


  return (
    <div className="register-container">
      
        <section className="register-form">
          
          <h1 style={{ fontSize: "32px", marginBottom: "20px", color: "#333",
        textAlign: "center" }}>
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
            <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}>
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
            }}>
              <label
                htmlFor="confirm_pwd"
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
                id="confirm_pwd"
                name="password2"
                required
                aria-describedby="confirmnote"
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
          <p style={{marginTop: "10px", fontSize: "16px", marginBottom: "20px", color: "#333" }}>
            Already registered?
            <br />
            <span
              className="line"
              style={{
                display: "inline-block",
                color: "black ",
                textDecoration: "underline",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={handlelogin}
            >
              Sign In
            </span>
          </p>
        </section>
      
      <div className="welcome-container">
        <h2>Welcome to our spartec!</h2>
      </div>
      {/* Image */}
      <div className="image-container">
        <img src="/path/to/logo.png" alt="spartec" />
      </div>
    </div>
  );
};

export default Register;

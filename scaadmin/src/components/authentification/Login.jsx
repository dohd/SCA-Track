import { useRef, useState, useEffect, useContext } from "react";
import form from "./form.css";
import axios from "axios";
import { Padding } from "@mui/icons-material";
const LOGIN_URL = "/login";

const Login = () => {
  // State variable to track the selected option (user or admin)
  const [selectedOption, setSelectedOption] = useState("user");

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const [redirectTo, setRedirectTo] = useState("");
  const handleSubmmit = (event) => {
    event.preventDefault();
    axios
      .post("http://192.168.8.87:3000/adminLogin", {
        user,
        pwd,
      })
      .then((res) => {
        if (res.data.status === "success") {
          handlesignin();
        } else {
          alert(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  };

  const handlesignin = () => {
    // If sign-in is successful, set the desired dashboard path based on the selected role
    if (selectedOption === "user") {
      console.log("redirect to user dashboard");
      setRedirectTo("/admindashboard"); // Redirect user to '/dashboard'
    } else if (selectedOption === "admin") {
      console.log("redirect to admin dashboard");
      setRedirectTo("/admindashboard"); // Redirect admin to '/admin/dashboard' or the appropriate URL
    }
  };
  // Watch for changes in the redirectTo state variable and perform redirection when it changes
  useEffect(() => {
    if (redirectTo) {
      window.location.href = redirectTo;
    }
  }, [redirectTo]);

  return (
    <div className="login-container">
      
        <section className="login-form">
          
          <h1 style={{
             fontSize: "32px", 
             marginBottom: "20px", 
             color: "#333" ,
             textAlign: "center"
            }}>
            Login
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {/* "user" option */}
            <h1
              style={{
                fontSize: "32px",
                marginBottom: "20px",
                cursor: "pointer",
                backgroundColor: "green",
                color: "white",
                width: "100%",
                textAlign: "center"
              }}
            >
              Admin
            </h1>
           
          </div>

          <form 
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}>
            <label
              htmlFor="username"
              style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}
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
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              //  required
            />

            <label
              htmlFor="password"
              style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}
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
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              //  required
            />
            <button
              type="submit"
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
              onClick={handleSubmmit}
            >
              Sign in
            </button>
          </form>
        </section>
      
    </div>
  );
};

export default Login;

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
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleloguser = () => {
    console.log("logged user");
    setSelectedOption("user");
  };
  const handlelogadmin = () => {
    console.log("logged admin");
    setSelectedOption("admin");
  };
  const handlelogreg = () => {
    console.log("this is the reg section");
    setRedirectTo("/register");
  };
  // State variable to hold the desired dashboard path for redirection

  const [redirectTo, setRedirectTo] = useState("");
  const handleSubmmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/login", {
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
      setRedirectTo("/dashboard"); // Redirect user to '/dashboard'
    } else if (selectedOption === "admin") {
      console.log("redirect to admin dashboard");
      setRedirectTo("/admin/dashboard"); // Redirect admin to '/admin/dashboard' or the appropriate URL
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
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
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
                color: selectedOption === "user" ? "#FFFFFF" : "#333", // Change color based on selection
                cursor: "pointer",
                backgroundColor: "green",
                width: "50%",
                textAlign: "center"
              }}
              onClick={handleloguser}
            >
              User
            </h1>
            <br />
            {/* "admin" option */}
            <h1
              style={{
                fontSize: "32px",
                marginBottom: "20px",
                color: selectedOption === "admin" ? "#FFFFFF" : "#333",
                cursor: "pointer",
                backgroundColor: "green",
                width: "50%",
                textAlign: "center",
                // border: "1px solid white"
              }}
              onClick={handlelogadmin}
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
          }}
          onSubmit={handleSubmit}>
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
          <p style={{ 
                marginTop: "10px", fontSize: "16px", marginBottom: "20px", color: "#333" }}>
            Need an Account?
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
              onClick={handlelogreg}
            >
              {/*put router link here*/}
              Sign Up
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;

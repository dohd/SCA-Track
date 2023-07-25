import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'
import form from "./form.css"
import { Link } from "react-router-dom";
import Login from "./Login";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';
{/*USER_REGEX and PWD_REGEX are regular expressions used for input validation. They define the rules for valid usernames and passwords.
REGISTER_URL is a constant representing the API endpoint for user registration. */}

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])
    {/*The first useEffect hook runs once when the component mounts ([]
     empty dependency array) and sets the focus on the username input using userRef.current.focus(). */}

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])
    {/*The second useEffect hook listens for changes in the user state and updates the validName state
 based on the validation result of the username using the USER_REGEX. */}

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        // Validate the username and password using the regular expressions
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        // If the username or password is invalid based on the regular expressions
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");// Set the error message to inform the user of the invalid input
            return;
            
        }
        // Attempt to register the user by making a POST request to the REGISTER_URL
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),// Send the username and password in the request body
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
             console.log(response?.data); // Log the response data (assuming the response contains data)
    console.log(response?.accessToken); // Log the access token (assuming the response contains an accessToken)
    console.log(JSON.stringify(response)); // Log the response as a JSON string

    setSuccess(true); // Set the success state to true to show the "Success!" section

    // Clear the state and controlled inputs by resetting the user, password, and matchPwd states to empty strings
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    const handlereg=()=>{
        console.log('registered');
    }
    

   

  return (
    <div className="register-container">
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section className="register-form">
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
            {errMsg}
          </p>
          <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>Register</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>Username:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                8 to 24 characters.
              </p>
            </div>

            <div>
              <label htmlFor="confirm_pwd" style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>Confirm Password:</label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? 'false' : 'true'}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                Must match the first password input field.
              </p>
            </div>

            <button
              type="submit"
              style={{ display: 'inline-block', color: 'blue', textDecoration: 'underline' }}
              onClick={handlereg}
            >
              Sign up
            </button>
          </form>
          <p style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>
            Already registered?<br />
            <span className="line" style={{ display: 'inline-block', color: 'black ', textDecoration: 'underline' }} >
              Sign In </span>
          </p>
        </section>
      )}
      <div className="welcome-container">
                <h2>Welcome to our website!</h2>
 
            </div>
            {/* Image */}
            <div className="image-container">
                <img src="/path/to/logo.png" alt="spartec" />
            </div>
        </div>
            )
}

export default Register


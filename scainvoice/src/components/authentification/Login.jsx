import { useRef, useState, useEffect, useContext } from 'react';
import form from "./form.css"
import axios from 'axios';
const LOGIN_URL = '/login';

const Login = () => {
   // State variable to track the selected option (user or admin)
  const [selectedOption, setSelectedOption] = useState('user');
    
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

       try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
                
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
        

    }
     
    
    
    const handleloguser=()=>{
        console.log('logged user')
        setSelectedOption('user');
    }
    const handlelogadmin=()=>{
        console.log('logged admin')
        setSelectedOption('admin');
    }
    const handlelogreg=()=>{
        console.log('this is the reg section')
        setRedirectTo('/register');
    }
   // State variable to hold the desired dashboard path for redirection
  const [redirectTo, setRedirectTo] = useState('');

  const handlesignin = async () => {
    try {
      // Your sign-in logic here...
      // For example, perform a request to your server to validate credentials

      // Simulate sign-in success (remove this in your actual implementation)
      const signInSuccessful = true;

      if (signInSuccessful) {
        // If sign-in is successful, set the desired dashboard path based on the selected role
        if (selectedOption === 'user') {
          console.log('redirect to userdashboard')
          setRedirectTo('/dashboard'); // Redirect user to '/dashboard'
        } else if (selectedOption === 'admin') {
          console.log('redirect to admin dashboard')
          setRedirectTo('/dashboard'); // Redirect admin to '/dashboard' as well (change this as needed)
        }
      } else {
        // If sign-in fails, show an error message (you can customize this based on your needs)
        setErrMsg('Invalid credentials. Please try again.');
      }
    } catch (err) {
      // Handle any errors that occurred during the sign-in process (if applicable)
      console.error('Sign-in error:', err);
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
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }} > Login</h1>
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
      {/* "user" option */}
      <h1
        style={{
          fontSize: '32px',
          marginBottom: '20px',
          color: selectedOption === 'user' ? '#333' : '#0000FF', // Change color based on selection
          cursor: 'pointer',
        }}
        onClick={handleloguser}
      >
        User
      </h1>
      <br />
      {/* "admin" option */}
      <h1
        style={{
          fontSize: '32px',
          marginBottom: '20px',
          color: selectedOption === 'admin' ? '#333' : '#0000FF', 
          cursor: 'pointer',
        }}
        onClick={handlelogadmin}
      >
        Admin
      </h1>
    </div>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username" style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                          //  required
                        />

                        <label htmlFor="password" style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                          //  required
                        />
                        <button
              type="submit"
              style={{ display: 'inline-block', color: 'blue', textDecoration: 'underline' }}
              onClick={handlesignin}  >Sign in</button>
                    </form>
                    <p style= {{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>
                        Need an Account?<br />
                        <span className="line" style={{ display: 'inline-block', color: 'black ', textDecoration: 'underline' }} onClick={handlelogreg}>
                            {/*put router link here*/}
                            Sign Up
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default Login





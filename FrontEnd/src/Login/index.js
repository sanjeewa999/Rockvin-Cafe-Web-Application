import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import img1 from "../Images/logo/res-logo.png";
import { Image } from "antd";
import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignIn() {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[err, setErr] = useState("");

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['admin']);

  useEffect(() =>{
    if (cookies.admin) {
        if (cookies.email !== "") {
            navigate("/dashboard");
        }
    }
  })

  const loginadmin = async(e) =>{
    e.preventDefault();
    console.log("clicked");
    console.log(email+','+password);
    try {
        const response = await axios.get(`http://localhost:5000/admin/${email}`);
        console.log();
        if (response.data.sysusr_password === password) {
            if (response.data.role === 1) {
                setCookie('id', response.data.sysusr_id, { path: '/' });
                setCookie('email', response.data.sysusr_email, { path: '/' });
                setCookie('username', response.data.sysusr_name, { path: '/' });
                setCookie('role', response.data.role, { path: '/' });
                navigate("/dashboard");
            }else if(response.data.role===2){
                setCookie('id', response.data.sysusr_id, { path: '/' });
                setCookie('email', response.data.sysusr_email, { path: '/' });
                setCookie('username', response.data.sysusr_name, { path: '/' });
                setCookie('role', response.data.role, { path: '/' });
                navigate("/cheforders");
            }else{
                console.log(response.data.role);
            }
        }else{
            setErr("Email or Password is does not match");
        }
    } catch (error) {
        console.log(error);
    }
}



  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Create an object with the form data
  //   const formData = {
  //     email,
  //     password,
  //   };

  //   // Send a POST request to your Spring Boot endpoint
  //   axios.post("http://localhost:5000/login", formData)
  //     .then((response) => {
  //       // Handle the response from the server
  //       if (response.status === 200){
  //         console.log("Success")
  //         navigate('/dashboard');
  //       }
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occur during the request
  //       alert("Invalid Emial or Password");
  //       console.error(error);
  //     });
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            /*background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)',*/
          }}
        >
        <Image
          width={100}
          src={img1}
        >
        </Image>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
        />*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e)=>loginadmin(e)} value="Login"
            >
              Sign In
            </Button>
            <Grid container>
              {/*<Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
        </Grid>*/}
              {/* <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

//export default SignIn;

/*import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send login request to Spring Boot endpoint
    // Get the username and password from the form
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Create a request object
    const request = {
      username,
      password,
    };

    // Send the request to the Spring Boot endpoint
    axios.post('/api/auth/authenticate', request).then((res) => {
      if (res.status === 200) {
        // Redirect to the homepage
        window.location.href = '/';
      } else {
        // Display an error message
        alert('Invalid username or password');
      }
    });
  };

  return (
    <div className="login-container">
      <h1 className="lHead">Admin Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};*/

/*function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login-container">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
      
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
      
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );

}*/


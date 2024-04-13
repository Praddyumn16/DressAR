// Login.js
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/home');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ border: '2px solid gray', padding: '2rem', borderRadius: '0.25rem', display: 'flex', flexDirection: 'column', backgroundColor: 'lightgray'}}>
        <Form.Group controlId="formUsername" style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ marginRight: '0.75rem'}}>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
        
        <Form.Group controlId="formPassword" style={{ marginBottom: '1rem' }}>
          <Form.Label style={{ marginRight: '1rem'}}>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
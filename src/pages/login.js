import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Col, Button, Row, Spinner } from 'react-bootstrap';
import { useLoginMutation } from '../services/appApi';
import './login.css'
import { socket } from '../context/appContext';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginMutation();

  async function handleLogin(event) {
    event.preventDefault();
    loginUser({username, password}).then(({data}) => {
      if (data) {
        // console.log(data);
        socket.emit("new-user", data)
        navigate('/chat');
      }
    })
  }

    return (
      <Container>
        <Row>
          <Col md={5} className="login_bg"></Col>
          <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
            <Form style={{width: '80%', maxWidth: 500 }} onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId='formBasicEmail'>
                {error && <p className='alert alert-danger'>{error.data}</p>}
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name='username'
                  className="form-control"
                  placeholder='Username'
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name='password'
                  className="form-control"
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Group>
              <Button type="submit" className="btn btn-success">
                {isLoading ? <Spinner animation='grow' /> : "Login"}
              </Button>
              <Link to='/register'>
                <Button className="btn btn-primary m-1">
                  Registrarse
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    );
}

export default Login;
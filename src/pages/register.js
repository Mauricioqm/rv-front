import React, { useState } from 'react';
import { Container, Form, Col, Button, Row } from 'react-bootstrap';
import { useSignupUserMutation } from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import appConfig from '../appConfig';
import './register.css'
import pic from '../assets/pic-profile.jpg';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  //Carga de imagenes
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size us 1mb")
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "qv2m2skv");
    try {
      setUploadingImg(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/dlrdxocg7/image/upload", {
        method: "post",
        body: data,
      });
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert("Por favor cargue su foto de perfil");
    const url = await uploadImage(image);
    // console.log(url);
    signupUser({ username, email, password, picture: url }).then(({ data }) => {
      if (data) {
        console.log(data);
        navigate('/chat');
      }
    })
  }

  return (
    <Container>
      <Row>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{ width: '80%', maxWidth: 500 }} onSubmit={handleSignup}>
            <h1 className='text-center'>Crear cuenta</h1>
            <div className='signup-profile-pic__container'>
              <img src={imagePreview || pic} className="singup-profile-pic" alt='' />
              <label htmlFor="img-upload" className='image-upload-label'>
                <i className='fas fa-plus-circle add-picture-icon'></i>
              </label>
              <input type="file" id="image-upload" accept='image/png, image/jpeg, image/jpg' onChange={validateImg} />
            </div>
            {error && <p className='alert alert-danger'>{error.data}</p>}
            <Form.Group className="mb-3" controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                placeholder='Username'
                name='username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name='email'
                className="form-control"
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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

            <Button type="submit" className="btn btn-success" variant='primary'>
              {uploadingImg || isLoading ? "Registrando..." : "Registrado"}
            </Button>
            <Link to='/login'>
              <Button className="btn btn-primary m-1">
                Login
              </Button>
            </Link>
          </Form>
        </Col>
        <Col md={5} className="register_bg"></Col>
      </Row>
    </Container>
  );

}

export default Signup;
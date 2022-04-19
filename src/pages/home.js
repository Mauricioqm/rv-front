import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./home.css";

export default class Home extends Component {
  render() {
    return (
    <Row>
      <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
        <div>
          <h1>Comparte el mundo con tus amigos</h1>
          <p>Esta app te permitirá conecctarte con el mundo</p>
          <LinkContainer to="/chat">
            <Button variant="success">Iniciar <i className="fas fa-comments home-message-icon"></i>
            </Button>
          </LinkContainer>
        </div>
      </Col>
      <Col md={6} className="home__bg">
      </Col>
    </Row>
    )
  }
}
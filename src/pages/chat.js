import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../Components/sidebar';
import MessageForm from '../Components/MessageForm';

class componentName extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={4}>
            < Sidebar />
          </Col>

          <Col md={8}>
            <MessageForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default componentName;
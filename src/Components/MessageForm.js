import React, { useState, useContext, useRef, useEffect,  } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';

import './messageForm.css';

function MessageForm() {

  const[message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const {socket, currentRoom, setMessages, messages, privateMemberMsg} = useContext(AppContext);
  const messageEndRef = useRef(null);

  console.log(privateMemberMsg);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function getFormattedDate(){
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month: '0' + month;

    let day = date.getDate().toString();

    day = day.length > 1 ? day : '0' + day;;

    return month + '/' + day + '/' + year;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }


  const todayDate = getFormattedDate();

  socket.off('room-messages').on('room-messages', (roomMessages) => {
    console.log(roomMessages);
    setMessages(roomMessages);
  })

  function handleSubmit(e) {
    e.preventDefault();
    if(!message) return;
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ':' + minutes;
    const roomId = currentRoom;
    socket.emit('message-room', roomId, message, user, time, todayDate);
    setMessage("");
  }

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({behavior: "smooth"});
  }

  return (
    <>
      <div className='messages-output'>
        {/* {user && !privateMemberMsg?.id && <div className='alert alert-info'>Sala: {currentRoom}</div>} */}
        {user && !privateMemberMsg?.id &&
          <>
            <div className='alert alert-info conversation-info'>
              <div>
                {/* Chat con {privateMemberMsg.username} <img src={privateMemberMsg.picture} alt="" className='conversation-profile-pic'/> */}
              </div>
            </div>
          </>
        }
        {!user && <div className='alert alert-danger'>Por favor inicie sesión</div>}

        {user && messages.map(({_id: date, messagesByDate}, idx) => (
          <div key={idx}>
            <p className='alert alert-info text-center message-date-indicator'>{date}</p>
            {messagesByDate?.map(({content, time, from: sender}, msgIdx) => (
              <div className={sender?.email === user?.email ? "message" : "incoming-message"} key={msgIdx}>
                <div className='message-inner'>
                  <div className='d-flex align-items-center mb-3'>
                    <img src={sender.picture} style={{width: 35, height: 35, objectFit: 'cover', borderRadius: '50%', marginRight: 10}} alt=""/>
                    <p className='message-sender'>{sender._id === user?._id ? "Tú" : sender.username}</p>
                  </div>
                  <p className='message-content'>{content}</p>
                  <p className='message-timestamp-left'>{time}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control type='text' placeholder='Mensaje' disabled={!user} value={message} onChange={(e)=> setMessage(e.target.value)}></Form.Control>
            </Form.Group>
          </Col>

          <Col md={1}>
            <Button variant='primary' type='submit' style={{ width: "100%", backgroundColor: "orange" }} disabled={!user}>
              <i className='fas fa-paper-plane'></i>
            </Button>
          </Col>
        </Row>
      </Form>

    </>
  );
}

export default MessageForm;
import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Header,
  Card,
  Divider,
} from "semantic-ui-react";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Selection = () => {
  const [chatList, setChatList] = useState([]);
  return (
    <Container>
      <Header style={{ textAlign: "center", marginBottom: "30px" }} as="h1">
        Choose Class Chat or Calendar
      </Header>
      <Card.Group
        centered
        stackable
        textAlign="center"
        style={{ margin: "10px" }}
      >
        <Link to="/calendar">
          <Card color="red">
            <Card.Content>
              <Card.Header>Calendar</Card.Header>
              <Card.Description></Card.Description>
            </Card.Content>
          </Card>
        </Link>
        <Link to="/chat">
          <Card color="red">
            <Card.Content>
              <Card.Header>AI Tutor</Card.Header>
              <Card.Description></Card.Description>
            </Card.Content>
          </Card>
        </Link>
      </Card.Group>
      {chatList.map((e) => {
        return (
          <Link to={"/chat?" + {}}>
            <Card color="red">
              <Card.Content>
                <Card.Header>Example Chat</Card.Header>
                <Card.Description></Card.Description>
              </Card.Content>
            </Card>
          </Link>
        );
      })}
    </Container>
  );
};

export default Selection;

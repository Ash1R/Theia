import React, { useState, useRef, useEffect } from "react";
import { Container, Input, Button, Comment, Header } from "semantic-ui-react";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageContainerRef = useRef(null);
  const controller = new AbortController();

  async function get_url(controller, url) {
    const response = await fetch(url, {
      method: "GET",
      mode: "no-cors",

      signal: controller.signal,
    });
    return response.json();
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  const scrollToBottom = () => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  };

  return (
    <Container text>
      <Header as="h1" style={{ textAlign: "center", marginTop: "30px" }}>
        Chatroom {}
      </Header>
      <div
        ref={messageContainerRef}
        style={{ height: "400px", overflowY: "auto" }}
      >
        <Comment.Group>
          {messages.map((message, index) => (
            <Comment key={index}>
              <Comment.Content>
                <Comment.Text>{message}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </div>
      <Input
        fluid
        placeholder="Type your message..."
        value={newMessage}
        onChange={handleInputChange}
        action={
          <Button primary onClick={handleSendMessage}>
            Send
          </Button>
        }
      />
    </Container>
  );
}

export default ChatInterface;

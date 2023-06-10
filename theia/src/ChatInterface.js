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
    const controller = new AbortController();
    var a = get_url(
      controller,
      "http://192.168.65.158:5000/upload/Datamanager/Data/class/class01.json"
    ).then((data) => console.log(data));
  });

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
      <Header>Chatroom {}</Header>
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

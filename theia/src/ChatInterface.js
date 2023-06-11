import React, { useState, useRef, useEffect } from "react";
import { Container, Input, Button, Comment, Header } from "semantic-ui-react";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import axios from "axios";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageContainerRef = useRef(null);
  const [user, setUser] = useState("");
  const [id, setID] = useState("");
  const [users, setUsers] = useState([]);
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
    async function does() {
      const queryParameters = new URLSearchParams(window.location.search);

      const user = queryParameters.get("user");
      const ident = queryParameters.get("chatid");
      setUser(user);
      console.log(ident);
      setID(ident);
      const db = getFirestore();

      const assq = query(
        collection(db, "chatrooms"),

        where("id", "==", ident)
      );

      const assSnapshot = await getDocs(assq);

      var assList = [];
      assSnapshot.forEach((match) => {
        console.log("it");
        assList.push(match.data());
      });
      console.log(assList[0]);

      setMessages(assList[0]["chat"]);
      setUsers(assList[0]["users"]);
    }
    does();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setNewMessage("" + e.target.value);
  };

  async function handleSendMessage() {
    setMessages([...messages, user + ": " + newMessage]);
    if (newMessage.includes("/gpt")) {
      console.log("exe");
      // ...

      async function sendMessageToAI(msg) {
        try {
          const response = await axios.post(
            "http://192.168.65.101:5000/message",
            { message: msg }
          );
          setMessages([...messages, "Tutor: " + response.data.message]);
          // Now use this message to update the chatroom
        } catch (error) {
          console.error(error);
        }
      }
      sendMessageToAI(newMessage);
    }
    setNewMessage("");
    const db = getFirestore();
    const goodRef = doc(db, "chatrooms", id);
    console.log(messages);

    setDoc(goodRef, { chat: messages, id: id, users: users }, { merge: true });
  }

  const scrollToBottom = () => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  };

  return (
    <Container text>
      <Header as="h1"  style={{ textAlign: "center", marginTop: "40px", fontSize: 75}}>
        Chat Room {}
      </Header>
      <div
        ref={messageContainerRef}
        style={{ width: "1500px", height: "800px", overflowY: "auto",  textAlign: "left"}}
      >
        <Comment.Group>
          {messages.map((message, index) => (
            <Comment key={index} style = {{ width: "1000px", fontSize: 25}}>
              <Comment.Content>
                <Comment.Text> {message}</Comment.Text>
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

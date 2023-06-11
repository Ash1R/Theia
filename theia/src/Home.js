import React, { useState } from "react";
import { Container, Form, Button, Header } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Home = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [created, setshowCreated] = useState(true);

  const handleSubmit = () => {
    setshowCreated(false);
    const db = getFirestore();
    const adocRef = doc(db, "cred", String(name) + "_" + String(password));
    setDoc(adocRef, { name, password }, { merge: true });
  };

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Header style={{ marginLeft: "50px" }} as="h1">
          T H E I A
        </Header>

        <Form.Field>
          <input
            style={{ marginLeft: "40px", marginTop: "10px" }}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <input
            style={{ marginLeft: "40px", marginTop: "10px" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Link to={"/select?user=" + name}>
          <Form.Field>
            {" "}
            <Button style={{ marginLeft: "40px", marginTop: "10px" }} massive>
              login
            </Button>
          </Form.Field>
        </Link>

        <Form.Field>
          {" "}
          <Button
            onClick={handleSubmit}
            style={{ marginLeft: "40px", marginTop: "10px" }}
            massive
          >
            make account w/ these
          </Button>
        </Form.Field>
        <Form.Field style={{ marginLeft: "40px", marginTop: "10px" }}>
          {created ? (
            <p></p>
          ) : (
            <Header style={{ color: "green" }}>account created!</Header>
          )}
        </Form.Field>
      </Form>
    </Container>
  );
};
export default Home;

import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Header,
  Card,
  Divider,
} from "semantic-ui-react";

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
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Selection = () => {
  const [chatList, setChatList] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [use, setUse] = useState("");

  useEffect(() => {
    async function does() {
      const db = getFirestore();
      const queryParameters = new URLSearchParams(window.location.search);

      const user = queryParameters.get("user");
      setUse(user);

      const assq = query(
        collection(db, "chatrooms"),
        where("users", "array-contains", user)
      );

      const assSnapshot = await getDocs(assq);
      var assList = [];
      assSnapshot.forEach((match) => {
        assList.push(match.data());
      });
      setRooms(assList);
      console.log(rooms);
    }
    does();
  }, []);

  async function add() {
    const db = getFirestore();
    const assq = query(
      collection(db, "chatrooms"),

      where("id", "==", code)
    );

    const assSnapshot = await getDocs(assq);

    var assList = [];
    assSnapshot.forEach((match) => {
      assList.push(match.data());
    });

    console.log(assList);
    var nusers = assList[0]["users"];
    const queryParameters = new URLSearchParams(window.location.search);
    const user = queryParameters.get("user");
    nusers.push(user);

    const goodRef = doc(db, "chatrooms", assList[0]["id"]);

    setDoc(
      goodRef,
      { chat: assList[0]["chat"], id: assList[0]["id"], users: nusers },
      { merge: true }
    );
    setCode("");
  }

  async function newRoom() {
    const db = getFirestore();
    const goodRef = doc(db, "chatrooms", name);
    setDoc(goodRef, { chat: [], id: name, users: [use] }, { merge: true });
    setName("");
  }
  return (
    <Container>
      <Header style={{ textAlign: "center", marginBottom: "30px" }} as="h1">
        Choose Class Chat or Calendar
      </Header>
      <Container>
        <Card.Group
          one
          centered
          stackable
          textAlign="center"
          style={{ margin: "10px" }}
        >
          {rooms.map((e) => {
            return (
              <Link to={"/chat?user=" + use + "&chatid=" + e["id"]}>
                <Card color="red">
                  <Card.Content>
                    <Card.Header>{e["id"]}</Card.Header>
                    <Card.Description>Owner: {e["users"][0]}</Card.Description>
                  </Card.Content>
                </Card>
              </Link>
            );
          })}

          <Container style={{ marginTop: "50px", textAlign: "center" }}>
            <Container>
              {" "}
              <label>Add Yourself To A Room </label>
              <input
                onChange={(e) => setCode(e.target.value)}
                value={code}
              ></input>
              <Button onClick={add} style={{ marginLeft: "20px" }}>
                add
              </Button>
            </Container>

            <Container style={{ marginTop: "20px" }}>
              {" "}
              <label>Create A Room </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></input>
              <Button onClick={newRoom} style={{ marginLeft: "20px" }}>
                add
              </Button>
            </Container>
          </Container>
        </Card.Group>
      </Container>
    </Container>
  );
};

export default Selection;

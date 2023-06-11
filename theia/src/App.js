import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Selection from "./Selection";
import "semantic-ui-css/semantic.min.css";
import ChatInterface from "./ChatInterface";

import InteractiveCalendar from "./Calendar";
import {
  getFirestore,
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/select" element={<Selection />}></Route>
        <Route path="/chat" element={<ChatInterface />}></Route>
        <Route path="calendar" element={<InteractiveCalendar />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

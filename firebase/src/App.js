import React from "react";
import "./App.css";
import { Auth } from "./components/auth";
import {Db} from "./components/db"

function App() {
  return (
    <div className="App">
     <Auth/>
      <Db/>
    </div>
  );
}

export default App;

import React, { Component } from "react";
import Editor from "./components/Editor";
import "./App.css";

class App extends Component {
  componentDidMount = () => {
    document.title = "PPS 2018 Project 4 Map Editor";
  };

  render() {
    return (
      <div className="App">
        <Editor />
      </div>
    );
  }
}

export default App;

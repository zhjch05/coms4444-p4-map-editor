import React, { Component } from "react";
import { Row, Col } from "antd";
import Tile from "./components/Tile";
import "./index.css";
class Editor extends Component {
  render() {
    let gridsID = [];
    for (let i = 0; i < 100; i++) {
      let row = [];
      for (let j = 0; j < 100; j++) {
        row.push(i + "," + j);
      }
      gridsID = [...gridsID, row];
    }
    console.log(gridsID);

    const tiles = gridsID.map(row => {
      return (
        <Col span={24}>
          {row.map(cell => (
            <Tile className="tile" key={cell} />
          ))}
        </Col>
      );
    });
    return (
      <div className="Editor__container">
        <Row gutter={24}>{tiles}</Row>
      </div>
    );
  }
}

export default Editor;

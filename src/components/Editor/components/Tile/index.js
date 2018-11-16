import React, { Component } from "react";
import { Button } from "antd";
import "./index.css";
class Tile extends Component {
  render() {
    return (
      <div className="Tile__container">
        <Button className="tile-btn" />
      </div>
    );
  }
}

export default Tile;

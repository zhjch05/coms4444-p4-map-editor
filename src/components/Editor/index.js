import React, { Component } from "react";
import { Button, Radio } from "antd";
import "./index.css";
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brush: "normal",
      isDrawing: false,
      canvas: null,
      ctx: null,
      brushColor: {
        normal: "white",
        muddy: "brown",
        water: "blue"
      }
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = this.refs.canvas.getContext("2d");
    this.setState({
      canvas,
      ctx
    });
    this.updateCanvas(ctx);
    canvas.addEventListener(
      "mousemove",
      event => {
        const mousePos = this.getMousePos(canvas, event);
        const message =
          "Corresponding Grid Coordinate: " + mousePos.x + ", " + mousePos.y;
        if (this.state.isDrawing && mousePos.x <= 99 && mousePos.y <= 99) {
          if (this.state.brush === "package") {
            this.drawPackage(this.state.ctx, mousePos);
          } else if (this.state.brush === "target") {
            this.drawTarget(this.state.ctx, mousePos);
          } else {
            this.drawContour(this.state.ctx, mousePos);
            this.drawRect(
              this.state.ctx,
              mousePos,
              this.state.brushColor[this.state.brush]
            );
          }
        }
        this.writeMessage(canvas, message);
      },
      false
    );
  }

  updateCanvas(ctx) {
    this.drawGrid(ctx);
  }

  writeMessage(canvas, message) {
    var context = canvas.getContext("2d");
    context.clearRect(1100, 0, canvas.width, canvas.height);
    context.font = "18pt Calibri";
    context.fillStyle = "black";
    context.fillText(message, 1100, 25);
  }

  getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: parseInt((event.clientX - rect.left) / 10),
      y: parseInt((event.clientY - rect.top) / 10)
    };
  }

  drawGrid(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "0.5";
    ctx.strokeStyle = "black";
    for (var i = 0; i < 101; i++) {
      this.drawLine(ctx, 0, i * 10, 1000, i * 10);
      this.drawLine(ctx, i * 10, 0, i * 10, 1000);
    }
  }

  drawLine(ctx, x_start, y_start, x_end, y_end) {
    ctx.beginPath();
    ctx.moveTo(x_start, y_start);
    ctx.lineTo(x_end, y_end);
    ctx.stroke();
  }

  drawRect(ctx, coord, color) {
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.rect(coord.x * 10, coord.y * 10, 10, 10);
    ctx.fill();
  }

  drawContour(ctx, coord) {
    ctx.beginPath();
    ctx.lineWidth = "0.5";
    ctx.strokeStyle = "black";
    ctx.moveTo(coord.x * 10, coord.y * 10);
    ctx.lineTo(coord.x * 10, coord.y * 10 + 10);
    ctx.lineTo(coord.x * 10 + 10, coord.y * 10);
    ctx.moveTo(coord.x * 10, coord.y * 10 + 10);
    ctx.lineTo(coord.x * 10 + 10, coord.y * 10 + 10);
    ctx.moveTo(coord.x * 10 + 10, coord.y * 10 + 10);
    ctx.lineTo(coord.x * 10 + 10, coord.y * 10);
    ctx.stroke();
  }

  drawRects(ctx, coords, color) {
    for (var i = 0; i < coords.length; i++) {
      var c = coords[i];
      ctx.fillStyle = color;

      ctx.beginPath();
      ctx.rect(c.x * 10, c.y * 10, 10, 10);
      ctx.fill();
    }
  }

  drawPackage(ctx, point) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(point.x * 10 + 2.5, point.y * 10 + 2.5, 5, 5);
    ctx.fill();
  }

  drawTarget(ctx, point) {
    ctx.strokeStyle = "black";
    this.drawLine(
      ctx,
      point.x * 10,
      point.y * 10,
      point.x * 10 + 10,
      point.y * 10 + 10
    );
    this.drawLine(
      ctx,
      point.x * 10,
      point.y * 10 + 10,
      point.x * 10 + 10,
      point.y * 10
    );
  }

  drawPath(ctx, path, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var i = 1; i < path.length; i++) {
      ctx.moveTo(path[i - 1].x * 10 + 5, path[i - 1].y * 10 + 5);
      ctx.lineTo(path[i].x * 10 + 5, path[i].y * 10 + 5);
    }
    ctx.stroke();
  }

  handleBrushChange(value) {
    this.setState({
      brush: value
    });
  }

  handleMouseDown(event) {
    if (event.button !== 0) return;
    this.setState({
      isDrawing: true
    });
    const mousePos = this.getMousePos(this.state.canvas, event);
    if (mousePos.x > 99 || mousePos.y > 99) return;
    if (this.state.brush === "package") {
      this.drawPackage(this.state.ctx, mousePos);
    } else if (this.state.brush === "target") {
      this.drawTarget(this.state.ctx, mousePos);
    } else {
      this.drawContour(this.state.ctx, mousePos);
      this.drawRect(
        this.state.ctx,
        mousePos,
        this.state.brushColor[this.state.brush]
      );
    }
  }

  handleMouseUp() {
    if (this.state.isDrawing) {
      this.setState({
        isDrawing: false
      });
    }
  }

  render() {
    return (
      <div className="Editor__container">
        <h2 className="headline">PPS 2018 - Project 4 Map Editor</h2>
        <div className="canvas__container">
          <canvas
            id="canvas"
            ref="canvas"
            width="1500px"
            height="1000px"
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
          />
        </div>
        <div className="my-layout">
          <div className="Brush__container">
            <h2>Brush Type:</h2>
            <Radio.Group
              value={this.state.brush}
              onChange={e => this.handleBrushChange(e.target.value)}
            >
              <Radio.Button value="normal">Normal</Radio.Button>
              <Radio.Button value="muddy">Muddy</Radio.Button>
              <Radio.Button value="water">Water</Radio.Button>
              <Radio.Button value="package">Package</Radio.Button>
              <Radio.Button value="target">Target</Radio.Button>
            </Radio.Group>
          </div>
          <div className="buttons__container">
            <Button id="btn-download" type="primary">
              Download Map File
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;

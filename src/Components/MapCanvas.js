import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./MapCanvas.scss";

const MapCanvas = ({ src, base64Image, setBase64Image }) => {
  // state variable used to signify if the user is drawing or not
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  function handleMouseDown(event) {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function handleMouseUp() {
    setIsDrawing(false);
  }

  function handleMouseMove(event) {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function handleSave() {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    //set the base64Image state variable within the parent component
    setBase64Image(dataURL);
  }

  return (
    <div className="map-canvas-container">
      <div className="map-canvas">
        <h5>Sketch Emergency Routes</h5>
        <img
          ref={imageRef}
          src={src}
          alt="Map"
          onLoad={() => {
            const canvas = canvasRef.current;
            const image = imageRef.current;
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
          }}
          style={{ display: "none" }}
        />
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
        <div className="save-button">
          <Button onClick={handleSave}>Save Image</Button>
        </div>
      </div>
      <div className="map-output">
        <h5>Image for EAP</h5>
        {base64Image ? (
          <img
            src={base64Image}
            style={{ borderStyle: "dashed" }}
            alt="Output Map"
          />
        ) : null}
      </div>
    </div>
  );
};

export default MapCanvas;

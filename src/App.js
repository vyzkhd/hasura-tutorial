import React, { useState } from "react";
import Pixel from "./Pixel";
import ColorPicker from "./ColorPicker";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_PIXELS = gql`
  query GetPixels {
    pixels(order_by: { id: asc }) {
      color
      id
    }
  }
`;

function App() {
  const [color, changeColor] = useState("white");
  const { loading, error, data } = useQuery(GET_PIXELS);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="content">
      <div className="logo">Draw</div>
      <p>Pick a Color</p>
      <ColorPicker changeColor={changeColor} />
      <p>Click a Pixel</p>
      <div className="container">
        {data.pixels.map((pixel) => (
          <Pixel {...pixel} key={pixel.idx} newColor={color} />
        ))}
      </div>
    </div>
  );
}

export default App;

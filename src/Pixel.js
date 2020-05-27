import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const UPDATE_COLOR = gql`
  mutation ChangePixelColor($id: Int!, $color: String!) {
    update_pixels(where: { id: { _eq: $id } }, _set: { color: $color }) {
      returning {
        color
        id
      }
    }
  }
`;

const Pixel = ({ id, color, newColor }) => {
  const [updatePixelColor] = useMutation(UPDATE_COLOR);
  const [pixelColor, changeColor] = useState(color);

  return (
    <span
      className="pixel"
      onClick={() => {
        changeColor(newColor);
        updatePixelColor({ variables: { id, color: newColor } });
      }}
      style={{ backgroundColor: pixelColor }}
    ></span>
  );
};

export default Pixel;

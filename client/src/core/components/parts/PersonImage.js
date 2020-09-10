import React from "react";
import defaultImage from "../../resources/img/default_user_profile.png";

export default function PersonImage({ imagePath, width }) {
  return (
    <div
      style={{
        width,
        height: width,
        borderRadius: width / 2,
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      <img
        src={imagePath ? imagePath : defaultImage}
        style={{ width: "105%" }}
      />
    </div>
  );
}

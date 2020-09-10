import React from "react";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

export default function SortHeading({
  field,
  sort,
  onClick,
  type,
  children,
  ...props
}) {
  return (
    <th
      onClick={() => onClick(field, type)}
      style={{
        cursor: "pointer",
      }}
      {...props}
    >
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {children}

        {field === sort.field ? (
          sort.direction === "desc" ? (
            <CaretDownFill />
          ) : (
            <CaretUpFill />
          )
        ) : (
          ""
        )}
      </div>
    </th>
  );
}

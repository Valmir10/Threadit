// src/utils/highlightText.js
import React from "react";

export const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;
  const escapedSearch = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`([${escapedSearch}])`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ backgroundColor: "gray", color: "white" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

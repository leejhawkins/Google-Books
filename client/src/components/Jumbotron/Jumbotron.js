import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 120, clear: "both", marginTop:20, padding:40, textAlign: "center" }}
      className="jumbotron bg-info text-white"
    >
      {children}
    </div>
  );
}

export default Jumbotron;

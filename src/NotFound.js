import React from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  return <h2 style={{ textAlign: "center" }}>Page not found</h2>;
};

export default NotFound;

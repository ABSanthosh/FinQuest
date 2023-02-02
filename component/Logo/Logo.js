import React from "react";
import "./Logo.scss";

function Logo({ src = "" }) {
  if (src !== "") {
    return <img className="Logo" src={src} />;
  }
  return <img className="Logo" src="/Img/Logo.svg" />;
}

export default Logo;

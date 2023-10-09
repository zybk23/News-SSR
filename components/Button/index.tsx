"use client";

import React from "react";
import "./styles.scss";

interface buttonType {
  handleGoBack: () => void;
  text: string;
}

const Button = ({ handleGoBack, text }: buttonType) => {
  return (
    <div onClick={handleGoBack} className="header-button-container">
      <img src={require("/images/left-chevron.png")} alt="" />
      <span>{text}</span>
    </div>
  );
};

export default Button;

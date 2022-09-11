import React from "react";
import "./textinput.scss";

const TextInput = ({ label, imgSrc, error, name, ...rest }) => {
  return (
    <div className="text-input">
      <label>{label}</label>
      <div className="input">
        <img src={imgSrc} alt="" />
        <input type="text" name={name} {...rest} />
      </div>
      {error[name] && <p className="error">{error[name]}</p>}
    </div>
  );
};

export default TextInput;

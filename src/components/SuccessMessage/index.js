import React from "react";
import './success.scss'

import { ReactComponent as SuccessIcon } from "../../assets/svg/success.svg";
import Button from "../inputs/Button";

const Success = () => {

    const onSubmit = (event) =>{
        event.preventDefault();
    }

  return (
    <div className="success-wrapper">
      <div className="main-header">
      <SuccessIcon/>
        <h4>Yay!!! 🎉 </h4>
        <p>
          Your application to become a vetted tailor has been sent, a
          Fitted Agent will get in touch with you regard the next steps.
          Goodluck!
        </p>
        <Button onSubmit={onSubmit} >Return to Dashboard</Button>
      </div>
    </div>
  );
};

export default Success;

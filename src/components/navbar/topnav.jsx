import React from "react";
import { ReactComponent as ArrowIcon } from "../../assets/svg/arrow.svg";
import { ReactComponent as BellIcon } from "../../assets/svg/bell.svg";
import "./topnav.scss";

const TopNav = () => {
  return (
    <div className="top-nav">
      <div className="left">
        <ArrowIcon />
        <p>Vetted Tailor Application</p>
      </div>
      <div className="right">
        <div className="bell">
          <div>3</div>
          <BellIcon />
        </div>
        <div className="username">SO</div>
      </div>
    </div>
  );
};

export default TopNav;

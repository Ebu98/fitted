import React from "react";
import { ReactComponent as EditIcon } from "../../assets/svg/edit.svg";
import { ReactComponent as LinkIcon } from "../../assets/svg/link.svg";
import { ReactComponent as MeasureIcon } from "../../assets/svg/measurements.svg";
import { ReactComponent as OrderIcon } from "../../assets/svg/order.svg";
import { ReactComponent as CustomerIcon } from "../../assets/svg/customer.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svg/profile.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/logout.svg";
import { ReactComponent as ProductIcon } from "../../assets/svg/product.svg";
// import Hand from "../../assets/img/hand_first.png";
import logo from "../../assets/img/logo.png";
import "./sidebar.scss";

const Sidebar = () => {
  const links = [
    {
      icon: MeasureIcon,
      text: "measurements",
    },
    {
      icon: OrderIcon,
      text: "Order",
    },
    {
      icon: ProductIcon,
      text: "Products",
    },
    {
      icon: CustomerIcon,
      text: "Customer",
    },
    {
      icon: ProfileIcon,
      text: "My profile",
    },
    {
      icon: LogoutIcon,
      text: "Logout",
    },
  ];
  return (
    <div className="sidebar">
      <img src={logo} className="logo" alt="" />
      <div className="top-info">
        <div className="name-accronym-wrapper">
          <div className="username">SA</div>
          <div className="edit-wrapper">
            <EditIcon />
          </div>
        </div>
        <h3 className="fullname">Sikiru Agbaje</h3>
        <div className="link">
          <p>www.tailors.fitted.ng/sikiru</p>
          <div>
            <LinkIcon />
          </div>
        </div>
        <p className="detail">
          Get measurements from any customer via this link
        </p>
        <div className="select-wrapper">
          <select>
            <option>Non -Vetted Tailor</option>
          </select>
        </div>
      </div>
      <div className="links">
        {links.map(({ text, icon: Icon }) => {
          return (
            <div
              className={`link-items ${text === "My profile" ? "active" : ""}`}
            >
              <Icon />
              <p>{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

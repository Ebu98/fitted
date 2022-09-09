import React, { useState, useEffect } from "react";
import TextInput from "../inputs/TextInput";
import Select from "../inputs/Select";
import shop from "../../assets/img/shop.png";
import dots from "../../assets/img/dots.png";
import user from "../../assets/img/User.png";
import Button from "../inputs/Button";
import "./main.scss";

const Main = () => {
  const [values, setValues] = useState("");
  const [inputs, setInputs] = useState({
    bankCode: "",
    accountNo: "",
    bankName: ""
  });
  const [error, setError] = useState({
    bankCode: "",
    accountNo: "",
    bankName: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const { bankCode, accountNo } = inputs;

  function debounce_leading(func, timeout = 300) {
    let timer;
    return (...args) => {
      if (!timer) {
        func.apply(this, args);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    };
  }

  const onChange = ({ target: { name, value } }) => {
    debounce_leading(() =>
      setInputs({
        ...inputs,
        [name]: value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError({
      ...error,
      bankCode: "",
      accountNo: "",
    });
    if (!bankCode) {
      return setError({
        ...error,
        bankCode: "Opps, Account details not found",
      });
    }
    if (!accountNo) {
      return setError({
        ...error,
        accountNo: "Opps, Account Number not found",
      });
    }
    fetch(
      "https://fitted-staging-api.herokuapp.com/api/v1/bank/resolveAccount",
      {
        method: "POST",
        body: JSON.stringify(inputs),
      }
    )
      .then(() => {
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setIsFailure(true);
      });
  };

  const fetchData = () => {
    fetch("https://fitted-staging-api.herokuapp.com/api/v1/bank/banks")
      .then((response) => response.json())
      .then((data) => setValues(data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const profile = [
    {
      field: "Name:",
      value: "Samuel Oladokun",
    },
    {
      field: "Gender:",
      value: "Male",
    },
    {
      field: "Sew Gender:",
      value: "Both",
    },
    {
      field: "Phone Number:",
      value: "08137901372",
    },
    {
      field: "Email Address:",
      value: "biola@fitted.ng",
    },
    {
      field: "Store Name:",
      value: "Skibi Fashion House",
    },
    {
      field: "Location:",
      value: "Lagos, Nigeria",
    },
  ];
  const options = [
    { value: "0", label: "Red" },
    { value: "1", label: "Blue" },
    { value: "2", label: "Green" },
    { value: "3", label: "Yellow" },
  ];
  return (
    <div className="main">
      <div className="main-header">
        <h4>Vetted Tailor Application</h4>
        <p>
          One step closer to the goal! please provide us with your Bank details
          with which you will be recieving payment.
        </p>
      </div>
      <div className="info">
        <div className="left">
          <div className="img-wrapper">
            <img src={require("../../assets/img/person.png")} alt="" />
          </div>
          <div className="profile">
            {profile.map((item, i) => (
              <div key={i} className="field">
                <h6>{item.field}</h6>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="right">
          <div className="select-wrapper">
            <div>
              <Select
                label="Gender you Sew for?"
                placeholder="Please select"
                options={options}
              />
            </div>
            <div>
              <Select
                label="Styles you Sew?"
                placeholder="Please select"
                options={options}
              />
            </div>
          </div>

          <div>
            <TextInput
              label="Bank Name"
              name="bankName"
              imgSrc={shop}
              placeholder="Please select your bank"
              onChange={onChange}
            />
          </div>
          <div>
            <TextInput
              label="Account Number"
              imgSrc={dots}
              placeholder="1234567890"
              onChange={onChange}
              name="accountNo"
              value={inputs.accountNo}
            />
          </div>
          <div>
            <TextInput
              label="Account Name"
              imgSrc={user}
              placeholder="Abiola Ogunjobi"
              onChange={onChange}
            />
          </div>
          <div>
            <Button onClick={onSubmit}>Submit Application</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import TextInput from "../inputs/TextInput";
import Select from "../inputs/Select";
import shop from "../../assets/img/shop.png";
import dots from "../../assets/img/dots.png";
import user from "../../assets/img/User.png";

import Button from "../inputs/Button";
import "./main.scss";

const Main = () => {
  const [banks, setBanks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [inputs, setInputs] = useState({
    bankCode: "",
    accountNo: "",
    bankName: "",
    accountName: "",
    gender: "",
    style: "",
  });
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState({
    bankCode: "",
    accountNo: "",
    bankName: "",
    accountName: "",
    gender: "",
    style: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const { bankCode, accountNo, bankName, accountName } = inputs;

  const onChange = ({ target: { name, value } }) => {
    if (name === "accountNo") {
      if (Number.isNaN(Number(value))) {
        return
      }
    }
    if (value) {
      setError({
        ...error,
        [name]: "",
      });
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const sortBanks = () => {
    setTyping(false);
    const filter = banks.filter((item) =>
      item.name.toLowerCase().includes(bankName.toLowerCase())
    );
    setSuggestions(bankName ? filter : []);
  };

  const onKeyUp = _.debounce(sortBanks, 500);

  const onKeyDown = () => {
    setTyping(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError({
      ...error,
      bankCode: "",
      accountNo: "",
    });
    if (!bankName) {
      return setError({
        ...error,
        bankName: "Opps, Bank name not found",
      });
    }
    if (!accountName) {
      return setError({
        ...error,
        accountName: "Opps, Account name not found",
      });
    }
    if (!bankCode) {
      return setError({
        ...error,
        bankCode: "Opps, Account details not found. Select bank from dropdown",
      });
    }
    if (!accountNo) {
      return setError({
        ...error,
        accountNo: "Opps, Account number not found",
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

  const closeSuggestions = () => setSuggestions([]);

  const selectBank = (bank) => {
    setInputs({
      ...inputs,
      bankName: bank.name,
      bankCode: bank.code,
    });
    closeSuggestions();
  };

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
    { value: "0", label: "Male" },
    { value: "1", label: "Female" },
  ];
  const option = [
    { value: "0", label: "Red" },
    { value: "1", label: "Blue" },
    { value: "2", label: "Green" },
    { value: "3", label: "Yellow" },
  ];

  useEffect(() => {
    fetch("https://fitted-staging-api.herokuapp.com/api/v1/bank/banks")
      .then((res) => res.json())
      .then((json) => setBanks(json.data));
  }, []);

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
                placeholder="Male"
                options={options}
              />
            </div>
            <div>
              <Select
                label="Styles you Sew?"
                placeholder="Please select"
                options={option}
              />
            </div>
          </div>

          <div className="has-autocomplete">
            <TextInput
              label="Bank Name"
              name="bankName"
              imgSrc={shop}
              placeholder="Please select your bank"
              onChange={onChange}
              onKeyUp={onKeyUp}
              onKeyDown={onKeyDown}
              value={inputs.bankName}
              error={error}
            />

            {suggestions.length > 0 && (
              <div className="autocomplete">
                {!typing ? (
                  suggestions.map((bank, id) => (
                    <div
                      key={id}
                      className="autocomplete-items"
                      onClick={() => selectBank(bank)}
                    >
                      <span>{bank.name}</span>
                    </div>
                  ))
                ) : (
                  <p>Typing...</p>
                )}
              </div>
            )}
          </div>
          <div>
            <TextInput
              label="Account Number"
              imgSrc={dots}
              placeholder="1234567890"
              onChange={onChange}
              name="accountNo"
              value={inputs.accountNo}
              error={error}
            />
          </div>
          <div>
            <TextInput
              name="accountName"
              label="Account Name"
              imgSrc={user}
              value={inputs.accountName}
              placeholder="Abiola Ogunjobi"
              onChange={onChange}
              error={error}
            />
          </div>
          <Button onClick={onSubmit}>Submit Application</Button>
        </div>
      </div>
    </div>
  );
};

export default Main;

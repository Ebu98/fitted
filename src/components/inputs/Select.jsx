import React from 'react'
import './textinput.scss'

const Select = ({ label, options, placeholder,  ...rest }) => {
  return (
    <div className="text-input">
        <label>{label}</label>
        <div className="select">
            <select {...rest}>
                <option disabled selected>{placeholder}</option>
                {options.map((x) => (
                    <option key={x.value} value={x.value}>{x.label}</option>
                ))}
            </select>
        </div>
    </div>
  )
}

export default Select
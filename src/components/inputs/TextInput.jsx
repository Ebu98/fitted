import React from 'react'
import './textinput.scss'

const TextInput = ({ label, imgSrc, ...rest }) => {
  return (
    <div className="text-input">
        <label>{label}</label>
        <div className="input">
            <img src={imgSrc} alt="" />
            <input type="text" {...rest} />
        </div>
    </div>
  )
}

export default TextInput
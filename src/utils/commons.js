import React from "react";

import { Link } from "react-router-dom";

const InputField = ({ label, type, name, placeholder, value, onChange }) => {
  return (
    <div>
      <label>{label}:</label>
      <br/>
      {type === 'number'?
            <input
            type={type}
            name={name}
            placeholder={placeholder}
            min={0}
            value={value}
            onChange={onChange}
            required
          /> :
          <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />}
    </div>
  );
};

const LinkElement= (tos, text,className)=>{
    return (
        <Link to={tos}>
            <button type="button" className={className}>{text}</button>
        </Link>
    );
}
export { InputField, LinkElement };

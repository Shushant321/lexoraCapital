import React from 'react';

const FormInput = ({ 
  label, 
  type, 
  value, 
  onChange, 
  placeholder, 
  name 
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded"
        required
      />
    </div>
  );
};

export default FormInput;

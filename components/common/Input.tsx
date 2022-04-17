import React from "react"

interface InputProps {
  id: string
  label: string
  type: string
  placeholder: string
}

const Input = ({ id, label, type, placeholder }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-md mb-1 font-medium text-gray-500">
        {label}
      </label>
      <input
        required
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="form-input rounded-full border-0 bg-gray-100 px-4 py-3 text-gray-800 caret-primary-500 outline-none placeholder:text-gray-400 focus:border-0 focus:ring-0"
      />
    </div>
  )
}

export default Input

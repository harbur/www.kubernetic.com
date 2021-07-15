import React from "react";

export interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  value?: string;
  required?: boolean;
  readOnly?: boolean;
  onChange?(name: string): void;
}

export default function InputField({
  label,
  name,
  placeholder,
  description,
  value,
  required = false,
  readOnly = false,
  onChange = () => {},
}: InputFieldProps) {
  return (
    <>
      <label htmlFor={name} className="pt-2 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input

        disabled={readOnly}
        required={required}
        name={name}
        value={value}
        placeholder={placeholder}
        className="w-full mt-1 border h-10 rounded-md px-2 py-1 text-sm"
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="mb-1 text-xs text-gray-500">{description}</p>
    </>
  );
}

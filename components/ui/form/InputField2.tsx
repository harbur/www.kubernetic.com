import React from "react";
import { UseFormRegister } from "react-hook-form";

export interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  description: string;
  required?: boolean;
  readOnly?: boolean;
  state?: "create" | "view" | "edit";
  register: UseFormRegister<any>;
}

export default function InputField2({
  label,
  name,
  placeholder,
  description,
  required = false,
  readOnly = false,
  register,
}: InputFieldProps) {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(name)}
        disabled={readOnly}
        required={required}
        name={name}
        placeholder={placeholder}
        className="w-80 mt-1 bg-gray-100 rounded-md px-2 py-1 text-sm"
      />
      <p className="mb-1 text-xs text-gray-500">{description}</p>
    </>
  );
}

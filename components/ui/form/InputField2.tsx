import React from "react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";

export interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  info?: string;
  required?: boolean;
  readOnly?: boolean;
  state?: "create" | "view" | "edit";
  register: UseFormRegister<any>;
  errors: DeepMap<any, FieldError>;
}

export default function InputField2({
  label,
  name,
  placeholder,
  description,
  info,
  required = false,
  readOnly = false,
  register,
  errors,
}: InputFieldProps) {
  return (
    <>
      <label htmlFor={name} className="pt-2 block text-sm font-medium text-gray-700">
        {label}
        &nbsp;
        {required && <span className="text-red-500">*</span>}
        &nbsp;
        {info && <span data-balloon-length="large" aria-label={info} data-balloon-pos="up" className="bg-gray-200 rounded text-gray-700"> ?&nbsp;</span>}
      </label>
      <input
        {...register(name)}
        disabled={readOnly}
        required={required}
        name={name}
        placeholder={placeholder}
        className={`w-full mt-1 border h-10 rounded-md px-2 py-1 text-sm ${errors[name]? "border-red-500":""}`}
      />
      {errors[name] && <p className="pt-1 text-sm text-gray-600 italic">{errors[name].message}</p>}
      <p className="mb-1 text-xs text-gray-500">{description}</p>
    </>
  );
}

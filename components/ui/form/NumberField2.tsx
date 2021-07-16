import React from "react";
import { UseFormRegister } from "react-hook-form";

export interface NumberField2Props {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  readOnly?: boolean;
  min?: number;
  register: UseFormRegister<any>;
}

export default function NumberField2({
  label,
  name,
  placeholder,
  description,
  readOnly = false,
  min,
  register
}: NumberField2Props) {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(name, { valueAsNumber: true, min })}
        disabled={readOnly}
        name={name}
        type="number"
        onKeyPress={(e) => {
          if (e.key === "e" || e.key === "-") {
            e.preventDefault();
          }
        }}
        min={min}
        required
        placeholder={placeholder}
        className="w-80 mt-1 bg-gray-100 rounded-md px-2 py-1 text-sm"
      />
      <p className="mb-1 text-xs text-gray-500">{description}</p>
    </>
  );
}

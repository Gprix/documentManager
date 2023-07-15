"use client";

import Button from "@/components/shared/Button/Button";
import { InputProps } from "./Input.types";
import RightArrowSVG from "images/icons/right-arrow.svg";
import { useState } from "react";

const Input = (props: InputProps) => {
  const { className = "" } = props;
  const { id, label, required } = props;
  const { withSubmit = false, onSubmit } = props;
  const [inputValue, setInputValue] = useState("");
  const [errorMessage] = useState("");

  const labelStyle = inputValue
    ? "text-label text-sm bottom-10"
    : "text-placeholder bottom-2";

  return (
    <div className={`Input ${className}`}>
      <div className="relative">
        <label
          htmlFor={id}
          className={`${labelStyle} cursor-none absolute transition-all duration-300`}
        >
          {label}
        </label>
        <div className="flex border-b border-primary pt-2">
          <input
            type="text"
            id={id}
            className="bg-transparent no-focus-outline pb-2"
            required={required}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {withSubmit ? (
            <Button
              type="transparent"
              rightIcon={RightArrowSVG}
              onClick={onSubmit}
            />
          ) : null}
        </div>
        {!errorMessage ? (
          <p className="text-error text-sm absolute">{"errorMessage"}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Input;

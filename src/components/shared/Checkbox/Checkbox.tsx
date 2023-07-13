import React, { ChangeEvent, forwardRef } from "react";
import { CheckboxProps } from "./Checkbox.types";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { className = "" } = props;
  const { label, identifier, customOnChange } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    customOnChange?.(identifier, checked);
  };

  return (
    <div className={`Checkbox ${className}`}>
      <input
        type="checkbox"
        name={identifier}
        id={identifier}
        ref={ref}
        onChange={handleChange}
      />
      {label ? (
        <label htmlFor={identifier} className="pl-3">
          {label}
        </label>
      ) : null}
    </div>
  );
});

export default Checkbox;

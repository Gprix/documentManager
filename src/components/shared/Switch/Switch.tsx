"use client";

import { useEffect, useState } from "react";
import { forwardRef, ChangeEvent, useImperativeHandle, useRef } from "react";

import { SwitchProps as Props } from "./Switch.types";

const Switch = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className = "" } = props;
  const { label, identifier } = props;
  const { checked, onChange, disabled, title } = props;
  const [internalChecked, setInternalChecked] = useState(checked ?? false);
  const isChecked = internalChecked;

  const internalRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => internalRef.current!);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    setInternalChecked(e.target.checked);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof internalRef.current?.checked === "undefined") return;
      const checked = internalRef.current.checked;
      setInternalChecked(checked);
      clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      title={title}
      className={[
        label ? "flex gap-x-8 py-1 justify-between items-center" : "",
      ].join(" ")}
    >
      {label ? (
        <label
          className={["Switch__label", disabled ? "text-dimmed" : ""].join(" ")}
          htmlFor={identifier}
        >
          {label}
        </label>
      ) : null}
      <div
        className={[
          "Switch",
          "w-12 h-6 max-w-[48px] max-h-[24px]",
          className,
        ].join(" ")}
      >
        <div
          className={[
            "Switch__wrapper",
            "relative overflow-hidden rounded-full w-full",
            "!border-none hover:!border-none hover:opacity-80",
            disabled ? "opacity-50 hover:opacity-50" : "opacity-100",
          ].join(" ")}
        >
          <input
            className={[
              "Switch__input",
              "[&:checked+.Switch__slider]:bg-primary",
              "[&:checked+.Switch__slider:before]:-translate-y-1/2",
              "[&:checked+.Switch__slider:before]:translate-x-6",
              "[&:checked+.Switch__slider:before]:bg-white",
              "h-full w-full rounded-full",
              disabled ? "cursor-default" : "cursor-pointer",
            ].join(" ")}
            id={identifier}
            name={identifier}
            checked={isChecked}
            type="checkbox"
            ref={internalRef}
            disabled={disabled}
            onChange={changeHandler}
          />
          <div
            className={[
              "Switch__slider",
              "pointer-events-none absolute inset-0 cursor-pointer transition-all",
              "before:pointer-events-none before:absolute",
              "before:top-1/2 before:-translate-y-1/2 before:rounded-full",
              "before:bg-white before:transition-all before:[content:'']",
              "before:h-4 before:w-4",
              isChecked
                ? "bg-primary before:left-[calc(100%-4px)] before:-translate-x-full"
                : "bg-neutral-400 before:left-1 before:translate-x-0",
              className,
            ].join(" ")}
          ></div>
        </div>
      </div>
    </div>
  );
});

export default Switch;

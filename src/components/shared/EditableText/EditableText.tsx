"use client";

import { ForwardRefRenderFunction, useImperativeHandle } from "react";
import { forwardRef, useEffect, useRef } from "react";
import { useState } from "react";

import { EditableTextProps, EditableTextRef } from "./EditableText.types";

const EditableText: ForwardRefRenderFunction<
  EditableTextRef,
  EditableTextProps
> = (props: EditableTextProps, ref) => {
  const { className = "", inputClassName = "" } = props;
  const { text, additionalAction } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getTitle: () => newTitle,
  }));

  useEffect(() => {
    if (!isEditing) return;
    if (!inputRef.current) return;

    inputRef.current.select();
    inputRef.current.scrollLeft = 0;

    additionalAction?.();
  }, [isEditing]);

  return (
    <div className={`EditableText ${className}`}>
      {isEditing ? (
        <input
          type="text"
          className={[className, inputClassName].join(" ")}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          ref={inputRef}
        />
      ) : (
        <p className={className} onDoubleClick={() => setIsEditing(true)}>
          {newTitle}
        </p>
      )}
    </div>
  );
};

export default forwardRef(EditableText);

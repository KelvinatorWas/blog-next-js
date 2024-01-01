'use client'
import { classComb } from "@/utils/ClassComb";
import css from './CButton.module.css'
import { MouseEventHandler } from "react";

type btnType = "red" | "yellow" | "green" | "white" | "blue" | "";
type outlineType = "ored" | "oyellow" | "ogreen" | "owhite" | "";


type CButtonProp = {
  innerText?: string;
  className?: string;
  specialClass?: btnType;
  onClick?: (e:MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const DefaultCButton:CButtonProp = {
  innerText: "",
  className: css.btn,
  specialClass: "",
  onClick: undefined,
}

export const CButton = ({innerText, className, specialClass, onClick}:CButtonProp) => {
  const btn = {
    ...DefaultCButton,
    innerText,
    specialClass,
    onClick
  };

  return (
    <button
      className={classComb(css.btn, className ? className : btn.className!, css[btn.specialClass!])}
      onClick={(e) => btn.onClick ? btn.onClick(e) : () => {}}
    >
      {btn.innerText}
    </button>
  )
}

import React from "react";

export const ButtonDefaultAsType = "button" as const;
export type ButtonDefaultAsType = typeof ButtonDefaultAsType;

export type ButtonOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  as?: E;
};

export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>>;

export const Button = <E extends React.ElementType = ButtonDefaultAsType>({
  children,
  as,
  ...otherProps
}: ButtonProps<E>) => {
  const Tag = as || ButtonDefaultAsType;

  return <Tag {...otherProps}>{children}</Tag>;
};

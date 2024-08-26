import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

export default function NormalTitle({ children }: TitleProps) {
  return <div className="text-lg font-medium">{children}</div>;
}

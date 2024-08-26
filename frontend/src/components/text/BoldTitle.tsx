import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

export default function BoldTitle({ children }: TitleProps) {
  return <div className="text-lg font-bold">{children}</div>;
}

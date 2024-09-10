import React from "react";

interface TitleProps {
  children: React.ReactNode;
  marginBottom?: string;
}

export default function NormalTitle({ children, marginBottom }: TitleProps) {
  return (
    <div className="text-lg font-medium" style={{ marginBottom: marginBottom }}>
      {children}
    </div>
  );
}

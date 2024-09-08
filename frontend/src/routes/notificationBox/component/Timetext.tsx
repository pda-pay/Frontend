import React from "react";

interface TimeProps {
  children: React.ReactNode;
}

export default function TimeText({ children }: TimeProps) {
  return (
    <div className="text-lg font-medium text-gray-400 text-right">
      {children}
    </div>
  );
}

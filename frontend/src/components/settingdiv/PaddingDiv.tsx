interface DivProps {
  children: React.ReactNode;
}

export default function PaddingDiv({ children }: DivProps) {
  return (
    <div className="w-screen h-screen p-5 py-7 flex flex-col justify-between">
      {children}
    </div>
  );
}

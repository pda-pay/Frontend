interface DivProps {
  children: React.ReactNode;
}

export default function PaddingDiv({ children }: DivProps) {
  return (
    <div className="w-screen min-h-screen p-5 py-7 flex flex-col gap-10">
      {children}
    </div>
  );
}

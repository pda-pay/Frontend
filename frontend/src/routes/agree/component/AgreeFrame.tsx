import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";

interface AgreeProps {
  children: React.ReactNode;
}

export default function AgreeFrame({ children }: AgreeProps) {
  return <BackgroundFrame color="blue">{children}</BackgroundFrame>;
}

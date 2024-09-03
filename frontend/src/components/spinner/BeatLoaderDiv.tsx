import { BeatLoader } from "react-spinners";

export default function BeatLoaderDiv() {
  return (
    <div className="absolute top-0 h-[100vh] w-[100vw] z-[999] bg-gray-600 opacity-30 flex items-center justify-center">
      <BeatLoader size={30} />
    </div>
  );
}

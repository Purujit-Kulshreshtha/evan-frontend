import { VscLoading } from "react-icons/vsc";

const Loader = () => {
  return (
    <div className="text-[250px] text-teal-400 animate-spin">
      <VscLoading />
    </div>
  );
};

export default Loader;

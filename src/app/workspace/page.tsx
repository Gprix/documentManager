import Image from "next/image";
import WavesSVG from "images/waves.svg";
import WorkspaceSetup from "@/components/workspace/WorkspaceSetup/WorkspaceSetup";

const WorkspacePage = () => {
  return (
    <section className="bg-gradient-to-bl from-[#7F96FF] to-[#000000] relative flex w-full">
      <Image
        src={WavesSVG}
        alt=""
        className="absolute left-0 right-0 bottom-0 w-full pointer-events-none"
      />
      <WorkspaceSetup />
    </section>
  );
};

export default WorkspacePage;
